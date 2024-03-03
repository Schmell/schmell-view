import { json, type RequestHandler } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'

export const GET: RequestHandler = async (event) => {
	const { type, id } = Object.fromEntries(event.url.searchParams)

	function getWhere() {
		const where = {}
		if (type && id) where[type + 'Id'] = id
		return where
	}

	async function getCount() {
		return await prisma.comment.count({
			where: getWhere()
		})
	}

	return json(await getCount())
}
