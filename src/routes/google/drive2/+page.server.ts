import type { PageServerLoad } from './$types'

import { google } from 'googleapis'
import { Readable } from 'stream'
import { authorize } from './authorize'

export const load = (async ({ locals, url }) => {
	const { id } = Object.fromEntries(url.searchParams)

	/**
	 * Lists the names and IDs of up to 10 files.
	 * @param {OAuth2Client} authClient An authorized OAuth2 client.
	 */
	async function listFiles() {
		const authClient = await authorize()
		const drive = google.drive({ version: 'v3', auth: authClient })
		const calendar = google.calendar({ version: 'v3', auth: authClient })

		const res = await drive.files.list({
			pageSize: 10
			// fields: 'nextPageToken, files(id, name)'
		})

		if (id) {
			const files = drive.files.get({
				alt: 'media'
			})
		}

		const files = res.data.files
		if (files?.length === 0) {
			console.log('No files found.')
			return
		}

		return files
	}

	// authorize().then(listFiles).catch(console.error)

	return {
		files: await listFiles()
	}
}) satisfies PageServerLoad

export const actions = {
	download: async ({ request }) => {},
	upload: async ({ request }) => {
		const formObj = Object.fromEntries(await request.formData())
		const file = formObj.file as File
		console.log(formObj.file)

		return await uploadBasic()
		/**
		 * Insert new file.
		 * @return{obj} file Id
		 * */
		async function uploadBasic() {
			// Get credentials and build service
			// TODO (developer) - Use appropriate auth mechanism for your app
			const auth = await authorize()
			const service = google.drive({ version: 'v3', auth })
			const requestBody = {
				name: file.name,
				fields: 'id'
			}
			const media = {
				mimeType: 'text/csv',
				body: Readable.from(file.stream() as any)
			}
			try {
				const file = await service.files.create({
					requestBody,
					media: media
				})
				console.log('File Id:', file.data.id)
				return file.data.id
			} catch (err) {
				// TODO(developer) - Handle error
				throw err
			}
		}
	}
}
