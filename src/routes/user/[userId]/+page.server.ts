import { redirect } from 'sveltekit-flash-message/server'
import { prisma } from '$lib/server/prisma'
import type { PageServerLoad } from './$types'

export const load = (async (event) => {
	async function getUser() {
		try {
			return await prisma.user.findUnique({
				where: { id: event.params.userId },
				include: {
					Events: { select: { id: true, name: true } },
					Organizations: { select: { id: true, name: true } },
					Venues: { select: { id: true, name: true } },
					Follows: true,
					Likes: true,
					_count: { select: { Liked: true, Followed: true } }
				}
			})
		} catch (error) {
			console.log('getUser() Error: ', error)
			throw redirect('./', { type: 'error', message: 'Get User Error' }, event)
		}
	}
	return {
		selectedUser: await getUser()
	}
}) satisfies PageServerLoad
