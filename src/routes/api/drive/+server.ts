import service from './service'

export async function GET({ url, locals }) {
	const session = await locals.auth.validate()
	const drive = service()
	const fileId = url.searchParams.get('fileId')
	const list = url.searchParams.get('list')
	// console.log(drive.context.google?.auth)

	/**
	 * Lists the names and IDs of up to 10 files.
	 * @param {OAuth2Client} [authClient] An authorized OAuth2 client.
	 */
	async function listFiles(authClient?) {
		const res = await drive.files.list({
			q: `'${session?.user.email}' in owners and mimeType != 'application/vnd.google-apps.folder'`
		})
		const files = res.data.files
		if (files?.length === 0) {
			console.log('No files found.')
			return
		}

		return files?.map((file) => {
			return { name: file.name, id: file.id }
		})
	}

	/**
	 * Download a file
	 * @param {OAuth2Client} authClient An authorized OAuth2 client.
	 */
	async function download() {
		if (fileId) {
			const file = await drive.files.get({ fileId: fileId, fields: '*' })
			return file
		}
	}

	if (list) {
		const res = await listFiles()
		return new Response(JSON.stringify(res))
	}

	if (fileId) {
		const res = await download()
		if (res) new Response(JSON.stringify(res))
	}

	return new Response()
}
