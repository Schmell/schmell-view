import type { PageServerLoad } from './$types'
import { prisma } from '$lib/server/prisma'

export const load = (async () => {
	//
	function getSeries() {
		try {
			return prisma.series.findMany({
				select: {
					publisherId: true,
					Publisher: true,
					Organization: { select: { name: true, id: true } },
					Venues: { select: { name: true, id: true } },
					Likes: true,
					Follows: true,
					_count: { select: { Likes: true, Follows: true } }
				}
			})
		} catch (error: any) {
			console.log('error: ', error)
			throw error(404, { messgage: 'not found' })
		}
	}
	return {
		series: await getSeries()
	}
}) satisfies PageServerLoad
