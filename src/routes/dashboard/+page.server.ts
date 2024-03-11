import { redirect, type Actions, fail } from '@sveltejs/kit'
import { loadFlash } from 'sveltekit-flash-message/server'
import type { PageServerLoad } from './$types'
import { prismaError } from '$lib/error-handling'
import { prisma } from '$lib/server/prisma'

export const load: PageServerLoad = loadFlash(async ({ locals, url }) => {
	const session = await locals.auth.validate()
	if (!session) throw redirect(302, `/auth/login?from=${url.pathname}`)

	const { eventSkip, eventTake, followSkip, followTake, likeCursor } = Object.fromEntries(
		url.searchParams
	)
	// console.log(eventSkip, eventTake)

	async function getUserStats() {
		try {
			return await prisma.user.findUnique({
				where: { id: session?.user.userId },
				include: {
					_count: { select: { Followed: true, Liked: true } }
				}
			})
		} catch (error) {}
	}

	async function getUserEventsCount() {
		return prisma.event.count({ where: { publisherId: session?.user.userId } })
	}

	async function getUserEvents() {
		try {
			return await prisma.event.findMany({
				where: { publisherId: session?.user.userId },
				include: {
					Organization: {
						select: {
							id: true,
							name: true,
							Likes: true,
							Follows: true,
							_count: { select: { Likes: true, Follows: true } }
						}
					},
					Races: { select: { _count: true } },
					Venue: true,

					Likes: true,
					Follows: { select: { id: true, userId: true } },
					_count: {
						select: { Likes: true, Follows: true, Comps: true, Races: { where: { sailed: '1' } } }
					}
				},
				skip: Number(eventSkip ?? 0),
				take: Number(eventTake ?? 5)
			})
		} catch (error) {
			prismaError(error)
			console.log('error: ', error)
			throw fail(400, { message: 'Fail query on User Events' })
		}
	}

	async function getUserOrganizationsCount() {
		return prisma.organization.count({
			where: { ownerId: session?.user.userId }
		})
	}

	async function getUserOrganizations() {
		if (url.searchParams.get('orgs')) {
			try {
				return prisma.organization.findMany({
					where: { ownerId: session?.user.userId },
					include: {
						_count: { select: { Likes: true, Follows: true, Events: true, Series: true } },
						Likes: true,
						Follows: true
					}
				})
			} catch (error) {
				prismaError(error)
				console.log('error: ', error)
				throw fail(400, { message: 'Fail query on User Likes' })
			}
		}
		return []
	}

	async function getUserSeries() {
		try {
			return await prisma.series.findMany({
				where: { publisherId: session?.user.userId },
				include: {
					Events: true,
					Likes: true,
					Follows: true,
					Organization: true,
					Publisher: true,
					_count: { select: { Likes: true, Follows: true, Comments: true } }
				}
			})
		} catch (error) {
			prismaError(error)
			console.log('error: ', error)
			throw fail(400, { message: 'Fail query on User Likes' })
		}
	}

	async function getUserFollowingCount() {
		return prisma.follow.count({
			where: { userId: session?.user.userId }
		})
	}

	async function getUserFollowing() {
		try {
			return await prisma.follow.findMany({
				where: { userId: session?.user.userId },
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
			prismaError(error)
			console.log('error: ', error)
			throw fail(400, { message: 'Fail query on User Following' })
		}
	}

	async function getUserLikesCount() {
		return await prisma.like.count({
			where: { userId: session?.user.userId }
		})
	}

	async function getUserLikes() {
		try {
			if (url.searchParams.get('likes')) {
				console.log(likeCursor)
				if (!likeCursor) {
					return prisma.like.findMany({
						where: { userId: session?.user.userId },
						skip: 0,
						take: 5,
						orderBy: { createdAt: 'desc' },
						include: {
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
					})
				} else {
					return prisma.like.findMany({
						where: { userId: session?.user.userId },
						skip: 1,
						take: 10,
						cursor: {
							id: likeCursor ?? ''
						},
						orderBy: { createdAt: 'desc' },
						include: {
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
					})
				}
			}
			return []
		} catch (error) {
			prismaError(error)
			console.log('error: ', error)
			throw fail(400, { message: 'Fail query on User Likes' })
		}
	}

	return {
		series: await getUserSeries(),
		events: await getUserEvents(),
		following: await getUserFollowing(),
		followCount: await getUserFollowingCount(),
		eventsCount: await getUserEventsCount(),
		likesCount: await getUserLikesCount(),
		organizationsCount: await getUserOrganizationsCount(),
		awaited: {
			organizations: getUserOrganizations(),
			likes: getUserLikes()
		},
		userStats: await getUserStats()
	}
})

// export const actions: Actions = {

// 	// getLikes: async (event) => {
// 	// 	const session = await event.locals.auth.validate()
// 	// 	// return {
// 	// 	// 	likes: await getUserLikes(session?.user.userId)
// 	// 	// }
// 	// }
// }
