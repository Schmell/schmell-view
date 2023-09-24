import { redirect, type Actions, fail } from '@sveltejs/kit'
import { loadFlash } from 'sveltekit-flash-message/server'

import type { PageServerLoad } from './$types'
import { auth } from '$lib/server/lucia'

export const load: PageServerLoad = loadFlash(async (event) => {
	const { locals } = event
	const session = await locals.auth.validate()

	if (!session) throw redirect(302, '/auth/login')

	async function getUserEvents() {
		try {
			return await prisma.event.findMany({
				where: { publisherId: session?.user.userId },
				include: { Organization: { select: { id: true, name: true } } }
			})
		} catch (error) {
			console.log('error: ', error)
			throw fail(400, { message: 'Fail query on User Events' })
		}
	}

	async function getUserFollowing() {
		try {
			return await prisma.follow.findMany({
				where: { userId: session?.user.userId }
			})
		} catch (error) {
			console.log('error: ', error)
			throw fail(400, { message: 'Fail query on User Following' })
		}
	}

	async function getUserLikes() {
		try {
			return await prisma.like.findMany({
				where: { userId: session?.user.userId }
			})
		} catch (error) {
			console.log('error: ', error)
			throw fail(400, { message: 'Fail query on User Likes' })
		}
	}

	return {
		// user: session.user
		events: getUserEvents(),
		following: getUserFollowing(),
		likes: getUserLikes()
	}
})

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate()
		if (!session) return redirect(307, '/auth/login')
		await auth.invalidateSession(session.sessionId) // invalidate session
		locals.auth.setSession(null) // remove cookie
		throw redirect(302, '/auth/login') // redirect to login page
	}
}
