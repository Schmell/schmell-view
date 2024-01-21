import type { PageServerLoad } from './$types'

export const load = (async () => {
	//
	function getSeries() {
		try {
			return prisma.series.findMany({
				include: {
					Organization: { select: { name: true, id: true } },
					Venues: { select: { name: true, id: true } }
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
