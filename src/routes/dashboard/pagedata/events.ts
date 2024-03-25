import { prisma } from '$lib/server/prisma'

export async function getUserEventsCount({ userId }) {
	return prisma.event.count({ where: { publisherId: userId } })
}

export async function getUserEvents({ userId, eventSkip, eventTake }) {
	return await prisma.event.findMany({
		where: { publisherId: userId },
		select: {
			id: true,
			name: true,
			complete: true,
			Organization: {
				select: {
					id: true,
					name: true,
					_count: { select: { Likes: true, Follows: true } }
				}
			},
			Races: { select: { _count: { select: { Results: true } } } },
			Venue: { select: { id: true, name: true } },
			_count: {
				select: { Likes: true, Follows: true, Comps: true, Races: { where: { sailed: '1' } } }
			}
		},
		skip: Number(eventSkip ?? 0),
		take: Number(eventTake ?? 5)
	})
}
