import type { PageServerLoad } from './$types'

export const load = (async () => {
	//
	async function getVenues() {
		try {
			return prisma.venue.findMany({
				orderBy: { createdAt: 'desc' },
				include: {
					Publisher: { select: { id: true, name: true, avatar: true } },
					_count: true
				}
			})
		} catch (error) {
			console.log('error: ', error)
		}
	}

	return {
		venues: await getVenues()
	}
	//
}) satisfies PageServerLoad
