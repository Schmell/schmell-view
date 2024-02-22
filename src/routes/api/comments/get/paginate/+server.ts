import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { redirect } from 'sveltekit-flash-message/server'

export const GET: RequestHandler = async (event) => {
	const { url, locals } = event
	// auth check
	const session = await locals.auth.validate()
	if (!session)
		throw redirect(302, '/auth/login', { type: 'success', message: 'Not Autorized' }, event)

	const { type, id, take, cursor } = Object.fromEntries(url.searchParams)

	function getWhere() {
		const where = {}
		if (type && id) where[type + 'Id'] = id
		return where
	}

	async function getUniqueAvatars() {
		const users = await prisma.comment.findMany({
			where: getWhere(),
			select: {
				User: { select: { avatar: true } }
			}
		})
		const avatars = users.map((user) => {
			return user.User.avatar
		})
		return new Set(avatars)
	}

	// console.log(await getUniqueAvatars())
	async function getCommentCount() {
		return await prisma.comment.count({
			where: getWhere()
		})
	}
	// const queryParams =
	async function getComments() {
		if (cursor === '') {
			return await prisma.comment.findMany({
				where: getWhere(),
				skip: 0,
				take: Number(take) ?? 4,
				orderBy: { createdAt: 'desc' },
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

		return await prisma.comment.findMany({
			where: getWhere(),
			skip: 1,
			take: Number(take) ?? 4,
			orderBy: { createdAt: 'desc' },
			cursor: {
				id: cursor
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
	}
	const comments = await getComments()
	const count = await getCommentCount()
	const uniqueAvatars = await getUniqueAvatars()
	// console.log(uniqueAvatars)
	return json({ comments, count, uniqueAvatars })
}

export const POST = () => {}
