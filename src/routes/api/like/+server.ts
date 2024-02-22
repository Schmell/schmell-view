import { error, fail, json, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { prismaError } from '$lib/error-handling'
import { prisma } from '$lib/server/prisma'
import type { Comment } from '@prisma/client'

export const GET: RequestHandler = async ({ url, locals }) => {
	const session = await locals.auth.validate()
	if (!session) throw redirect(307, `/auth/login?from=/results/${url.pathname}`)

	const { itemId, likeType, unlike } = Object.fromEntries(url.searchParams)

	if (!likeType || !itemId) throw fail(500, { message: 'API error' })

	async function like() {
		switch (likeType) {
			case 'series':
				try {
					await prisma.like.create({
						data: {
							type: 'series',
							itemId: itemId,
							Series: { connect: { id: itemId } },
							User: { connect: { id: session?.user.userId } }
						}
					})
					break
				} catch (error) {
					prismaError(error)
					console.log('error: ', error)
				}

			case 'event':
				try {
					await prisma.like.create({
						data: {
							type: 'event',
							itemId: itemId,
							Event: { connect: { id: itemId } },
							User: { connect: { id: session?.user.userId } }
						}
					})
					break
				} catch (error) {
					prismaError(error)
					console.log('error: ', error)
				}

			case 'comment':
				try {
					await prisma.like.create({
						data: {
							type: 'comment',
							itemId: itemId,
							Comment: { connect: { id: itemId! } },
							User: { connect: { id: session?.user.userId } }
						}
					})
					break
				} catch (error) {
					prismaError(error)
					console.log('error: ', error)
				}

			case 'venue':
				try {
					await prisma.like.create({
						data: {
							type: 'venue',
							itemId: itemId!,
							Venue: { connect: { id: itemId! } },
							User: { connect: { id: session!.user!.userId } }
						}
					})
					break
				} catch (error) {
					prismaError(error)
					console.log('error: ', error)
				}

			case 'organization':
				try {
					await prisma.like.create({
						data: {
							type: 'organization',
							itemId: itemId!,
							Organization: { connect: { id: itemId! } },
							User: { connect: { id: session!.user!.userId } }
						}
					})
					break
				} catch (error) {
					prismaError(error)
					console.log('error: ', error)
				}
			default:
				console.log(`No likeType matched`, likeType)
		}
	}

	async function unLike() {
		try {
			if (!unlike) throw error(500, { message: `unlike error` })
			return await prisma.like.delete({
				where: { id: unlike }
			})
		} catch (error) {
			prismaError(error)
			console.log('error: ', error)
		}
	}

	if (unlike) {
		unLike()
	} else {
		like()
	}

	return new Response()
}

export const POST = async ({ request, url, locals }) => {
	const session = await locals.auth.validate()
	if (!session) throw redirect(307, `/auth/login?from=/results/${url.pathname}`)

	// const { itemId, likeType, unlike } = Object.fromEntries(url.searchParams)
	const { itemId, type, unlikeId } = await request.json()

	if (!type || !itemId) throw fail(500, { message: 'API error' })

	// const nullObjects = {
	// 	Series: null,
	// 	Event: null,
	// 	Comment: null,
	// 	Venue: null,
	// 	Organization: null
	// }

	function getLikeData() {
		switch (type) {
			case 'series':
				return {
					type: 'series',
					itemId: itemId,
					Series: { connect: { id: itemId } },
					User: { connect: { id: session?.user.userId } }
				}

			case 'event':
				return {
					type: 'event',
					itemId: itemId,
					Event: { connect: { id: itemId } },
					User: { connect: { id: session?.user.userId } }
				}

			case 'comment':
				return {
					type: 'comment',
					itemId: itemId,
					Comment: { connect: { id: itemId! } },
					User: { connect: { id: session?.user.userId } }
				}

			case 'venue':
				return {
					type: 'venue',
					itemId: itemId!,
					Venue: { connect: { id: itemId! } },
					User: { connect: { id: session!.user!.userId } }
				}

			case 'organization':
				return {
					type: 'organization',
					itemId: itemId!,
					Organization: { connect: { id: itemId! } },
					User: { connect: { id: session!.user!.userId } }
				}

			// default:
			// 	console.log(`No likeType matched`, likeType)
		}
	}

	async function like() {
		try {
			console.log(getLikeData())
			// return await prisma.comment.create({
			// 	// @ts-ignore
			// 	data: getLikeData()
			// })
		} catch (error) {}
	}

	async function unLike() {
		try {
			return await prisma.like.delete({
				where: { id: unlikeId }
			})
		} catch (error) {
			prismaError(error)
			console.log('error: ', error)
		}
	}

	let res

	if (unlikeId) {
		res = await unLike()
	} else {
		res = await like()
	}

	return json({ res })
}
