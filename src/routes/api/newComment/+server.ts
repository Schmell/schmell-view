import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { redirect } from 'sveltekit-flash-message/server'

export const GET: RequestHandler = async (event) => {
	const { url, locals } = event
	// auth check
	const session = await locals.auth.validate()
	if (!session) redirect(302, '/auth/login', { type: 'success', message: 'Not Autorized' }, event)

	// console.log(url)
	const { whereType, whereId, take, cursor } = Object.fromEntries(url.searchParams)

	function getWhere() {
		const where = {}
		if (whereType && whereId) where[whereType] = whereId
		return where
	}

	async function getComments() {
		return await prisma.comment.findMany({
			where: getWhere(),
			skip: 0,
			take: Number(take) ?? 4,
			orderBy: { createdAt: 'desc' },
			// cursor: {
			// 	id: cursor ?? null
			// },
			select: {
				comment: true,
				id: true,
				type: true,
				User: { select: { id: true, username: true, avatar: true } },
				Likes: true,
				Follow: true,
				_count: true
			}
		})
	}
	const comments = await getComments()
	return json(comments)
}

export const POST = () => {}
