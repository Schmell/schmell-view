import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async (event) => {
	const { request, url, params, locals } = event
	const { type, id, take, cursor } = Object.fromEntries(url.searchParams)

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
