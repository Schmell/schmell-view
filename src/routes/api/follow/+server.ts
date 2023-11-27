import { fail, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { prismaError } from '$lib/error-handling'
import { prisma } from '$lib/server/prisma'

export const GET: RequestHandler = async ({ url, locals }) => {
	const session = await locals.auth.validate()
	if (!session) throw redirect(307, '/auth/login')

	const followType = url.searchParams.get('followType')
	// console.log('followType: ', followType)
	const unfollow = url.searchParams.get('unfollow')
	// console.log('unfollow: ', unfollow)
	const itemId = url.searchParams.get('itemId')
	// console.log('itemId: ', itemId)

	if (!followType || !itemId) throw fail(500, { message: 'API error' })

	async function follow() {
		switch (followType) {
			case 'series':
				try {
					return await prisma.follow.create({
						data: {
							type: 'series',
							itemId: itemId!,
							Series: { connect: { id: itemId! } },
							User: { connect: { id: session!.user!.userId } }
						}
					})
				} catch (error) {
					prismaError(error)
					throw fail(500, { message: `Series follow error: ${error}` })
				}

			case 'event':
				try {
					return await prisma.follow.create({
						data: {
							type: 'event',
							itemId: itemId!,
							Event: { connect: { id: itemId! } },
							User: { connect: { id: session!.user!.userId } }
						}
					})
				} catch (error) {
					prismaError(error)
					throw fail(500, { message: `Event follow error: ${error}` })
				}

			case 'comment':
				try {
					return await prisma.follow.create({
						data: {
							type: 'comment',
							itemId: itemId!,
							Comment: { connect: { id: itemId! } },
							User: { connect: { id: session!.user!.userId } }
						}
					})
				} catch (error) {
					prismaError(error)
					throw fail(500, { message: `Comment follow error: ${error}` })
				}

			case 'venue':
				try {
					return await prisma.follow.create({
						data: {
							type: 'venue',
							itemId: itemId!,
							Venue: { connect: { id: itemId! } },
							User: { connect: { id: session!.user!.userId } }
						}
					})
				} catch (error) {
					prismaError(error)
					throw fail(500, { message: `Venue follow error: ${error}` })
				}

			case 'organization':
				try {
					return await prisma.follow.create({
						data: {
							type: 'organization',
							itemId: itemId!,
							Organization: { connect: { id: itemId! } },
							User: { connect: { id: session!.user!.userId } }
						}
					})
				} catch (error) {
					prismaError(error)
					throw fail(500, { message: `Organization follow error: ${error}` })
				}

			default:
				console.log(`No followType matched `, followType)
		}
	}

	async function unFollow() {
		try {
			if (!unfollow) throw fail(500, { message: `unlike error` })
			// console.log('unlike: ', follow)
			return await prisma.follow.delete({
				where: { id: unfollow }
			})
		} catch (error) {
			prismaError(error)
			throw fail(500, { message: 'Unlike fail' })
		}
	}

	if (unfollow) {
		unFollow()
	} else {
		follow()
	}

	return new Response()
}
