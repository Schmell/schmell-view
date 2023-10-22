import { error } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
import type { PageServerLoad } from './$types'

export const load = (async () => {
	// async function getAllRaces() {
	// 	try {
	// 		return await prisma.race.findMany({
	// 			orderBy: { eventId: 'asc' },
	// 			include: { Event: { select: { name: true } } }
	// 		})
	// 	} catch (error) {
	// 		console.log('error: ', error)
	// 		return null
	// 		// return fail(400, { message: 'Something went wrong', error })
	// 	}
	// }

	async function getAllEvents() {
		try {
			return await prisma.event.findMany({
				orderBy: { createdAt: 'asc' },
				include: {
					Races: { orderBy: { name: 'asc' }, select: { name: true, id: true, sailed: true } }
				}
			})
		} catch (error) {
			console.log('error: ', error)
			// return null
			// throw error(400, { message: 'Something went wrong', error })
		}
	}
	return {
		// races: getAllRaces(),
		events: getAllEvents()
	}
}) satisfies PageServerLoad
