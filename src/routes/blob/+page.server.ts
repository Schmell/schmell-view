import { error } from '@sveltejs/kit'
import { put, list } from '@vercel/blob'
import { redirect } from 'sveltekit-flash-message/server'

export const actions = {
	upload: async ({ request, locals }) => {
		const session = await locals.auth.validate()
		if (!session) throw redirect(300, '/auth/login')

		const form = await request.formData()
		const file = form.get('file') as File

		// const blobs = await list()

		// blobs.blobs.forEach((blob) => {
		// 	console.log(blob.pathname)
		// })

		if (!file) {
			throw error(400, { message: 'No file to upload.' })
		}

		function getPath() {
			return `user-data/${session?.user.userId}/${file.name}`
		}

		const uploaded = await put(getPath(), file, { access: 'public' })

		return { uploaded }
	}
}
