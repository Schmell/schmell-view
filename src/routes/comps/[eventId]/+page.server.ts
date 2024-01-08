import { prisma } from '$lib/server/prisma'
import { redirect } from 'sveltekit-flash-message/server'
import type { PageServerLoad } from './$types'

export const load = (async (event) => {
	const getComps = async () => {
		try {
			return await prisma.comp.findMany({
				where: { Events: { some: { id: event.params.eventId } } },
				orderBy: [{ boat: 'asc' }]
			})
		} catch (error) {
			console.error('error: ', error)
			throw redirect('../', { type: 'error', message: 'Comp fetch error' }, event)
		}
	}

	return {
		comps: getComps()
	}
}) satisfies PageServerLoad
