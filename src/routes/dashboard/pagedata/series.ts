import { fail } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'

export async function getUserSeriesCount({ userId }) {
	return prisma.series.count({
		where: { publisherId: userId }
	})
}

export async function getUserSeries({ userId, seriesSkip, seriesTake }) {
	try {
		return await prisma.series.findMany({
			where: { publisherId: userId },
			include: {
				Events: true,
				Likes: true,
				Follows: true,
				Organization: true,
				Publisher: true,
				_count: { select: { Likes: true, Follows: true, Comments: true } }
			},
			skip: Number(seriesSkip ?? 0),
			take: Number(seriesTake ?? 5)
		})
	} catch (error) {
		console.log('error: ', error)
		throw fail(400, { message: 'Fail query on User Likes' })
	}
}
