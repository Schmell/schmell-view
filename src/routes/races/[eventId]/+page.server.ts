import { prisma } from '$lib/server/prisma'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	// const { eventId } = params

	const getEvent = async () => {
		try {
			return prisma.event.findUniqueOrThrow({
				where: { id: params.eventId },
				include: { Races: true }
			})
		} catch (err) {
			console.error('error: ', err)
			throw error(418, 'error')
		}
	}

	const getRace = async () => {
		try {
			return prisma.race.findUniqueOrThrow({
				where: { id: params.eventId }
			})
		} catch (err) {
			console.error('error: ', err)
			throw error(418, 'error')
		}
	}

	return {
		event: await getEvent()
		// race: getRace()
	}
}) satisfies PageServerLoad
