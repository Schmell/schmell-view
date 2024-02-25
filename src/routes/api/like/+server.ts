import { prisma } from '$lib/server/prisma'
import { json, redirect } from '@sveltejs/kit'
import { setFlash } from 'sveltekit-flash-message/server'

// export const GET: RequestHandler = async ({ url, locals, cookies }) => {
// 	const session = await locals.auth.validate()
// 	if (!session) throw redirect(307, `/auth/login?from=/results/${url.pathname}`)

// 	const { itemId, type, unlikeId } = Object.fromEntries(url.searchParams)

// 	if (!type || !itemId) {
// 		setFlash({ type: 'error', message: 'Please enter text.' }, cookies)
// 		throw fail(500, { message: 'like/server.ts: API error' })
// 	}

// 	function getLikeData(): any {
// 		switch (type) {
// 			case 'series':
// 				return {
// 					type: 'series',
// 					itemId: itemId,
// 					Series: { connect: { id: itemId } },
// 					User: { connect: { id: session?.user.userId } }
// 				}

// 			case 'event':
// 				return {
// 					type: 'event',
// 					itemId: itemId,
// 					Event: { connect: { id: itemId } },
// 					User: { connect: { id: session?.user.userId } }
// 				}

// 			case 'comment':
// 				return {
// 					type: 'comment',
// 					itemId: itemId,
// 					Comment: { connect: { id: itemId! } },
// 					User: { connect: { id: session?.user.userId } }
// 				}

// 			case 'venue':
// 				return {
// 					type: 'venue',
// 					itemId: itemId!,
// 					Venue: { connect: { id: itemId! } },
// 					User: { connect: { id: session!.user!.userId } }
// 				}

// 			case 'organization':
// 				return {
// 					type: 'organization',
// 					itemId: itemId!,
// 					Organization: { connect: { id: itemId! } },
// 					User: { connect: { id: session!.user!.userId } }
// 				}

// 			// default:
// 			// 	console.log(`No likeType matched`, likeType)
// 		}
// 	}

// 	async function like() {
// 		try {
// 			if (getLikeData()) {
// 				return await prisma.like.create({
// 					data: { ...getLikeData() }
// 				})
// 			}
// 		} catch (error) {
// 			return { error: 'like/server.ts' }
// 		}
// 	}

// 	async function unLike() {
// 		try {
// 			// console.log(unlikeId)
// 			return await prisma.like.delete({
// 				where: { id: unlikeId }
// 			})
// 		} catch (error: any) {
// 			// prismaError(error)
// 			console.log('error: ', error.meta)
// 			return { error: 'something went wraong' }
// 		}
// 	}

// 	if (unlikeId !== 'false') {
// 		return json(await unLike())
// 	} else {
// 		return json(await like())
// 	}
// }

export const POST = async (event) => {
	const { request, url, locals, cookies } = event
	const session = await locals.auth.validate()
	if (!session) throw redirect(307, `/auth/login?from=/results/${url.pathname}`)

	const { itemId, type, unlikeId } = await request.json()

	if (!type || !itemId) {
		setFlash({ type: 'error', message: 'Input error - like/server.ts' }, cookies)
		return json({ error: 'like/server.ts - No itemId or type' })
	}

	function getLikeData(): any {
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
			if (getLikeData()) {
				return await prisma.like.create({
					data: { ...getLikeData() }
				})
			}
		} catch (error: any) {
			return { error: 'like/-like()' }
		}
	}

	async function unLike(unlikeId) {
		try {
			return await prisma.like.delete({
				where: { id: unlikeId }
			})
		} catch (error: any) {
			// prismaError(error)
			console.log('error like/-unLike(): ', error)
			return { error: 'like/-unLike()' }
		}
	}

	if (unlikeId) {
		return json(await unLike(unlikeId))
	} else {
		return json(await like())
	}
}
