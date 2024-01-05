import { redirect } from '@sveltejs/kit'

export async function load(event) {
	const { locals, url } = event
	const session = await locals.auth.validate()
	if (session) throw redirect(302, `/dashboard`)
}
