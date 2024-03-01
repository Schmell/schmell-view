import { prisma } from '$lib/server/prisma'
import { json } from '@sveltejs/kit'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import type { RequestHandler } from './$types'
import { delay } from '$lib/utils'

/////////////////////////////////////////////////////////////////////////////////////
export const POST: RequestHandler = async ({ request, url, locals, cookies }) => {
	const session = await locals.auth.validate()
	if (!session)
		throw redirect(
			`/auth/login?from=/results/${url.pathname}`,
			{ type: 'error', message: 'Not authorized - follow/server.ts' },
			cookies
		)

	const { itemId, type, unfollowId } = await request.json()
	console.log(itemId, type, unfollowId)

	if (!type || !itemId) {
		setFlash({ type: 'error', message: 'Input error - follow/server.ts' }, cookies)
		return json({ error: 'follow/server.ts - No itemId or type' })
	}

	function getFollowData() {
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

			default:
				return {
					type: '',
					itemId: null,
					User: { connect: { id: session?.user.userId } }
				} // default:
			// 	console.log(`No likeType matched`, likeType)
		}
	}

	async function follow() {
		try {
			await delay(1000)
			return await prisma.follow.create({ data: getFollowData() })
		} catch (error) {
			return { error: 'follow/-follow()' }
		}
	}

	async function unFollow() {
		try {
			await delay(1000)
			return await prisma.follow.delete({
				where: { id: unfollowId }
			})
		} catch (error) {
			return { error: 'follow/-unFollow()' }
		}
	}

	if (unfollowId) {
		return json(await unFollow())
	} else {
		return json(await follow())
	}
}
