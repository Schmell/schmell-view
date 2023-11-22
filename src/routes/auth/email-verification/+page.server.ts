import { fail } from '@sveltejs/kit'
import { generateEmailVerificationToken } from '$lib/server/token'
import { sendEmailVerificationLink } from '$lib/server/email'

import type { PageServerLoad, Actions } from './$types'
import { redirect } from 'sveltekit-flash-message/server'

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth.validate()
	if (!session)
		throw redirect(302, '/auth/login', { type: 'error', message: 'Not Authorised' }, event)
	if (session.user.emailVerified) {
		throw redirect(302, '/')
	}
	return {}
}

export const actions: Actions = {
	default: async (event) => {
		const session = await event.locals.auth.validate()
		if (!session)
			throw redirect(302, '/auth/login', { type: 'error', message: 'Not Authorised' }, event)
		if (session.user.emailVerified) {
			throw redirect(302, '/')
		}
		try {
			const token = await generateEmailVerificationToken(session.user.userId)
			await sendEmailVerificationLink(session.user.email!, token)
			return {
				success: true
			}
		} catch {
			return fail(500, {
				message: 'An unknown error occurred'
			})
		}
	}
}
