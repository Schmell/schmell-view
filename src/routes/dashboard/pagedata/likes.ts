import { fail } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'

export async function getUserLikesCount({ userId }) {
	return await prisma.like.count({
		where: { userId: userId }
	})
}

function generateLikeQuery(filterLikes) {
	console.log(filterLikes)
	if (filterLikes === 'events') {
		return { Event: { include: { Likes: true } } }
	}
	if (filterLikes === 'orgs') {
		return { Organization: { include: { Likes: true } } }
	}
	if (filterLikes === 'comments') {
		return {
			Comment: {
				include: {
					User: true,
					Venue: true,
					Organization: true,
					Event: true,
					Comp: true,
					Likes: true
				}
			}
		}
	}
	if (filterLikes === 'venues') {
		return { Venue: { include: { Likes: true } } }
	}
	if (filterLikes === 'comps') {
		return { Comp: { include: { Likes: true } } }
	}

	return {
		Event: { include: { Likes: true } },
		Organization: { include: { Likes: true } },
		Comment: {
			include: {
				User: true,
				Venue: true,
				Organization: true,
				Event: true,
				Comp: true,
				Likes: true
			}
		},
		Venue: { include: { Likes: true } },
		Comp: { include: { Likes: true } },
		User: true
	}
}

export async function getUserLikes({ userId, getLikes, likeCursor, filterLikes }) {
	try {
		if (getLikes) {
			if (!likeCursor) {
				return prisma.like.findMany({
					where: { userId: userId },
					skip: 0,
					take: 5,
					orderBy: { createdAt: 'desc' },
					include: generateLikeQuery(filterLikes)
				})
			} else {
				return prisma.like.findMany({
					where: { userId: userId },
					skip: 1,
					take: 10,
					cursor: {
						id: likeCursor ?? ''
					},
					orderBy: { createdAt: 'desc' },
					include: generateLikeQuery(filterLikes)
				})
			}
		}
		return []
	} catch (error) {
		console.log('error: ', error)
		throw fail(400, { message: 'Fail query on User Likes' })
	}
}
