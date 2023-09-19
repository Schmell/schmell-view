import { prisma } from '$lib/server/prisma'
import { fail } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	if (!params.raceId) throw fail(307, { message: 'No Race Id Provided' })

	async function getVisibleColumns() {
		// This should get resultColumns from the event first then the race
		// return await prisma.event.findFirst({
		// 	where: {id:  }
		// })
	}

	async function getRace() {
		// how to pass to routes
		return await prisma.race.findFirst({
			where: { id: params.raceId },
			include: { Event: true }
		})
	}

	const getResults = async () => {
		try {
			return await prisma.result.findMany({
				where: { raceId: params.raceId },
				include: { Comp: true },
				orderBy: { points: 'asc' }
			})
		} catch (error) {
			console.error('error: ', error)
			// return [{ error: 'no results' }]
		}
	}
	return {
		results: await getResults(),
		race: await getRace()
	}
}) satisfies PageServerLoad
