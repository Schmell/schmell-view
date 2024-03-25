import { fail } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'

export async function getUserFollowingCount({ userId }) {
	return prisma.follow.count({
		where: { userId: userId }
	})
}

export async function getUserFollowing({ userId, followSkip, followTake }) {
	try {
		return await prisma.follow.findMany({
			where: { userId: userId },
			orderBy: { createdAt: 'desc' },
			include: {
				Series: { include: { Follows: true } },
				Event: { include: { Follows: true } },
				Organization: { include: { Follows: true } },
				Venue: { include: { Follows: true } },
				Comp: { include: { Follows: true } }
			},
			skip: Number(followSkip ?? 0),
			take: Number(followTake ?? 5)
		})
	} catch (error) {
		console.log('error: ', error)
		throw fail(400, { message: 'Fail query on User Following' })
	}
}
