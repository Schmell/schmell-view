import { z } from 'zod'
import { t } from '../t'

function getWhere(input: commentType) {
	const where = {}
	where[input.type + 'Id'] = input.id
	return where
}

const commentInput = z.object({
	id: z.string(),
	type: z.string(),
	take: z.number(),
	cursor: z.string().cuid()
})

type commentType = z.infer<typeof commentInput>

export const comments = t.router({
	get: t.procedure.input(commentInput).query(async ({ input }) => {
		if (input.cursor === '') {
			return await prisma.comment.findMany({
				where: getWhere(input),
				skip: 0,
				take: input.take,
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
			where: getWhere(input),
			skip: 1,
			take: input.take,
			orderBy: { createdAt: 'desc' },
			cursor: {
				id: input.cursor
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
	}),

	count: t.procedure.input(commentInput).query(async ({ input }) => {
		return await prisma.comment.count({
			where: getWhere(input)
		})
	})
})

export type Router = typeof comments
