import { fail, json, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { prismaError } from '$lib/error-handling'
import { prisma } from '$lib/server/prisma'

export const GET: RequestHandler = async ({ url, locals }) => {
	const { id, type, userId } = Object.fromEntries(url.searchParams)
	// console.log(id, type, userId)
	function getWhere() {
		const where = {}
		if (type && id) where[type + 'Id'] = id
		return where
	}
	// console.log(getWhere())
	async function getLike() {
		try {
			return await prisma.like.findFirst({
				// where: getWhere()
				where: { AND: [{ ...getWhere() }, { userId: userId }] }
			})
		} catch (error) {
			return false
		}
	}
	// if (!type || !itemId) throw fail(500, { message: 'API error' })
	const likeData = await getLike()
	// console.log(likeData)
	return json({ ...likeData })
}

export const POST: RequestHandler = async ({ request, url, locals }) => {
	const session = await locals.auth.validate()
	if (!session) throw redirect(307, `/auth/login?from=/results/${url.pathname}`)

	const { itemId, type, unlikeId } = await request.json()
	// console.log(itemId, type, unlikeId)

	// if (!type || !itemId) throw fail(500, { message: 'API error' })

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
	//

	async function like() {
		try {
			return await prisma.like.create({
				// need to figure out how to type this
				// @ts-ignore
				data: getLikeData()
			})
		} catch (error) {
			console.log(error)
		}
	}

	async function unLike() {
		// console.log(unlikeId)
		try {
			return await prisma.like.delete({
				where: { id: unlikeId }
			})
		} catch (error) {
			prismaError(error)
			console.log('error: ', error)
		}
	}

	let res = {}

	if (unlikeId) {
		return json(await unLike())
	} else {
		return json(await like())
	}

	return json({ res })
}
