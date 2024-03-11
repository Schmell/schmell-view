import { auth } from '$lib/server/lucia'
import { redirect } from 'sveltekit-flash-message/server'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()
	if (session) throw redirect(302, `/dashboard`)
}

export const actions: Actions = {
	logout: async ({ locals, cookies }) => {
		const session = await locals.auth.validate()
		if (!session)
			return redirect('/auth/login', { type: 'error', message: 'Not Authorized' }, cookies)
		await auth.invalidateSession(session.sessionId) // invalidate session
		locals.auth.setSession(null) // remove cookie
		throw redirect(302, '/auth/login', { type: 'success', message: 'Logout succesfull' }, cookies) // redirect to login page
	}
}
