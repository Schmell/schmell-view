import type { PageServerLoad } from './$types'

import { google } from 'googleapis'
import { Readable } from 'stream'
import { authorize } from './authorize'
import { GOOGLE_API_KEY } from '$env/static/private'

export const load = (async ({ locals, url }) => {
	const { id } = Object.fromEntries(url.searchParams)

	let nextPageToken

	const auth = await authorize()
	// @ts-ignore
	const drive = google.drive({ version: 'v3', auth })
	// @ts-ignore
	const calendar = google.calendar({ version: 'v3', auth })

	async function getCal() {
		// console.log(id)
		console.log(new Date('2024-02-04').toISOString())
		if (id) {
			try {
				const events = await calendar.events.list({
					calendarId: id,
					timeMin: new Date('2024-02-04').toISOString(),
					timeMax: new Date('2024-04-04').toISOString()
				})
				console.log(events.data.items)
				return events.data.items
			} catch (error: any) {
				console.log(error.message)
			}
		}
		return null
	}

	async function getCalendars() {
		// @ts-ignore
		const list = await calendar.calendarList.list({ auth })
		// @ts-ignore
		const r = await list.data

		return r
	}

	/**
	 * Lists the names and IDs of up to 10 files.
	 * @param {OAuth2Client} authClient An authorized OAuth2 client.
	 */
	async function listFiles() {
		const res = await drive.files.list({
			pageSize: 20,
			fields: 'nextPageToken,   files'
		})

		nextPageToken = res.data.nextPageToken

		if (!res.data) return null
		// check for no data here
		return res.data.files
	}

	return {
		files: await listFiles(),
		nextPageToken,
		cal: await getCal(),
		calendars: await getCalendars()
	}
	//
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
			// @ts-ignore
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
