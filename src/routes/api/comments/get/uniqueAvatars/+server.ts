import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
	const { type, id } = Object.fromEntries(url.searchParams)

	function getWhere() {
		const where = {}
		if (type && id) where[type + 'Id'] = id
		return where
	}

	async function commentUsersAvatars() {
		return await prisma.comment.findMany({
			where: getWhere(),
			distinct: ['userId'],
			select: {
				User: { select: { id: true, avatar: true } }
			}
		})
	}

	return json(await commentUsersAvatars())
}
