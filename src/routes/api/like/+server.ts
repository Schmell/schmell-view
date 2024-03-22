import { prismaError } from '$lib/error-handling'
import { prisma } from '$lib/server/prisma'
import { delay } from '$lib/utils'
import { error, fail, json, type RequestHandler } from '@sveltejs/kit'
import { toast } from 'svelte-sonner'
import { redirect, setFlash } from 'sveltekit-flash-message/server'

export const GET: RequestHandler = async ({ url, locals, cookies }) => {
	const session = await locals.auth.validate()
	if (!session)
		throw redirect(
			`/auth/login?from=/results/${url.pathname}`,
			{ type: 'error', message: 'Not authorized' },
			cookies
		)

	const { itemId, type } = Object.fromEntries(url.searchParams)

	if (!type || !itemId) {
		// setFlash({ type: 'error', message: 'Input error - like/server.ts' }, cookies)
		toast.warning('Input error - like/server.ts')
		return json({ error: 'like/server.ts - No itemId or type' })
	}

	async function getLikes() {
		return await prisma.like.findMany({ where: { [type + 'Id']: itemId } })
	}

	return json(await getLikes())
}

/////////////////////////////////////////////////////////////////////////
export const POST: RequestHandler = async ({ request, url, locals, cookies }) => {
	const session = await locals.auth.validate()
	// if (!session) throw fail(404, { message: 'not Authorised' })
	// if (!session) throw fail(500, { message: 'not Authorised' })

	let userId = session?.user.userId

	type requestParams = {
		itemId: string
		type: string
		unlikeId?: string
	}

	const { itemId, type, unlikeId }: requestParams = await request.json()

	if (!type || !itemId) {
		setFlash({ type: 'error', message: 'Input error - like/server.ts' }, cookies)
		return json({ error: 'like/server.ts - No itemId or type' })
	}

	function getLikeData() {
		switch (type) {
			case 'series':
				return {
					type: 'series',
					itemId: itemId,
					Series: { connect: { id: itemId } },
					User: { connect: { id: userId } }
				}

			case 'event':
				return {
					type: 'event',
					itemId: itemId,
					Event: { connect: { id: itemId } },
					User: { connect: { id: userId } }
				}

			case 'comment':
				return {
					type: 'comment',
					itemId: itemId,
					Comment: { connect: { id: itemId! } },
					User: { connect: { id: userId } }
				}

			case 'venue':
				return {
					type: 'venue',
					itemId: itemId!,
					Venue: { connect: { id: itemId! } },
					User: { connect: { id: userId } }
				}

			case 'organization':
				return {
					type: 'organization',
					itemId: itemId!,
					Organization: { connect: { id: itemId! } },
					User: { connect: { id: userId } }
				}

			default:
				return {
					type: '',
					itemId: null,
					User: { connect: { id: userId } }
				}
		}
	}

	async function like() {
		// May have to check for liking more than once
		try {
			// await delay(1000)
			return await prisma.like.create({ data: getLikeData() })
		} catch (error: any) {
			// throw fail(500, { message: 'No userId' })
			return { error }
		}
	}

	async function unLike(unlikeId: string) {
		try {
			await delay(1000)
			return await prisma.like.delete({ where: { id: unlikeId }, select: { id: true } })
		} catch (error: any) {
			return new Response()
		}
	}

	if (unlikeId) {
		return json(await unLike(unlikeId))
	} else {
		const likeFn = await like()
		//@ts-ignore
		if (likeFn.error) {
			return new Response()
		}
		return json(await like())
	}
}
