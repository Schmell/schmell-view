import { redirect } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import type { Actions } from './$types'

export async function load(event) {
	const { locals, url } = event
	const session = await locals.auth.validate()
	if (session) throw redirect(302, `/dashboard`)
}

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate()
		if (!session) return redirect(307, '/auth/login')
		await auth.invalidateSession(session.sessionId) // invalidate session
		locals.auth.setSession(null) // remove cookie
		throw redirect(302, '/auth/login') // redirect to login page
	}
}
