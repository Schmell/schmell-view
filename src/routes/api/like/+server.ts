import { error, fail, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { prismaError } from '$lib/error-handling'
import { prisma } from '$lib/server/prisma'

export const GET: RequestHandler = async ({ url, locals }) => {
	const session = await locals.auth.validate()
	if (!session) throw redirect(307, `/auth/login?from=/results/${url.pathname}`)

	const likeType = url.searchParams.get('likeType')
	const unlike = url.searchParams.get('unlike')
	const itemId = url.searchParams.get('itemId')

	if (!likeType || !itemId) throw fail(500, { message: 'API error' })

	async function like() {
		switch (likeType) {
			case 'event':
				try {
					await prisma.like.create({
						data: {
							type: 'event',
							itemId: itemId!,
							Event: { connect: { id: itemId! } },
							User: { connect: { id: session!.user!.userId } }
						}
					})
				} catch (error) {
					prismaError(error)
					console.log('error: ', error)
				}

			case 'comment':
				try {
					return await prisma.like.create({
						data: {
							type: 'comment',
							itemId: itemId!,
							Comment: { connect: { id: itemId! } },
							User: { connect: { id: session!.user!.userId } }
						}
					})
				} catch (error) {
					prismaError(error)
					console.log('error: ', error)
				}

			case 'venue':
				console.log('venue: ')
				try {
					return await prisma.like.create({
						data: {
							type: 'venue',
							itemId: itemId!,
							Venue: { connect: { id: itemId! } },
							User: { connect: { id: session!.user!.userId } }
						}
					})
				} catch (error) {
					prismaError(error)
					console.log('error: ', error)
				}
			case 'organization':
				try {
					return await prisma.like.create({
						data: {
							type: 'organization',
							itemId: itemId!,
							Organization: { connect: { id: itemId! } },
							User: { connect: { id: session!.user!.userId } }
						}
					})
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
			console.log('unlike: ', unlike)
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
