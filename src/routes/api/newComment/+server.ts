import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, locals }) => {
	const take = url.searchParams.get('take')
	const whereType = url.searchParams.get('whereType')
	const whereId = url.searchParams.get('whereId')
	const cursor = url.searchParams.get('cursor')

	function getWhere() {
		if (whereType && whereId) {
			const where = {}
			where[whereType] = whereId
			return where
		}
		return {}
	}

	async function getComments() {
		try {
			return await prisma.comment.findMany({
				where: getWhere(),
				skip: 0,
				take: Number(take),
				orderBy: { createdAt: 'desc' },
				cursor: {
					id: cursor ?? ''
				},
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
		} catch (error) {}
	}

	return json(await getComments())
}
