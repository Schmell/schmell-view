import { luciaErrors, prismaError } from '$lib/error-handling'
import { prisma } from '$lib/server/prisma'
import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { z } from 'zod'
import type { PageServerLoad } from './$types'
import type { Prisma } from '@prisma/client'

const commentSchema = z.object({
	comment: z.string().max(256).nullish(),
	type: z.string(),
	eventComentId: z.string(),
	id: z.string().optional()
})

const deletCommentSchema = z.object({
	id: z.string()
})

export const load = (async ({ params, url }) => {
	async function getEvent() {
		try {
			return await prisma.event.findUniqueOrThrow({
				where: { id: params.eventId },
				select: {
					id: true,
					name: true,
					description: true,
					titleImage: true,
					venueId: true,
					venueName: true,
					publisherId: true,
					public: true,
					complete: true,
					eventwebsite: true,
					Organization: { select: { titleImage: true, name: true, id: true } },
					Venue: { select: { name: true, website: true, burgee: true } },
					Likes: { select: { id: true, type: true, userId: true, itemId: true } },
					Follows: { select: { id: true, type: true, userId: true, itemId: true } },
					_count: true
				}
			})
		} catch (error) {
			luciaErrors(error)
			prismaError(error)
			console.log('error: ', error)
			throw fail(500, { messgage: 'Unknown Error occured in getEvent()' })
			// return fail(501, { message: 'Unkown error occured' });
		}
	} // getEvent()

	function getRaces() {
		try {
			return prisma.race.findMany({
				where: { eventId: params.eventId },
				orderBy: { rank: 'asc' }
			})
		} catch (error) {
			console.log('error: ', error)
			return []
		}
	}

	function getCommentsAndCount() {
		try {
			return prisma.$transaction([
				prisma.comment.findMany({
					where: { eventId: params.eventId },
					orderBy: { createdAt: 'desc' },
					select: {
						comment: true,
						id: true,
						type: true,
						User: { select: { id: true, username: true, avatar: true } },
						Likes: true,
						Follow: true,
						_count: true
					},
					skip: 0,
					take: 4
				}),

				prisma.comment.count({
					where: { eventId: params.eventId }
				})
			])
			//
		} catch (error) {
			console.log('error: ', error)
			return []
		}
	}

	async function getComments() {
		try {
			return await prisma.comment.findMany({
				where: { eventId: params.eventId },
				orderBy: { createdAt: 'desc' },
				select: {
					comment: true,
					id: true,
					type: true,
					User: { select: { id: true, username: true, avatar: true } },
					Likes: true,
					Follow: true,
					_count: true
				},
				skip: 0,
				take: 4
			})
			//
		} catch (error) {
			console.log('error: ', error)
			return fail(500, { message: 'Mooked' })
		}
	}

	// edit comment
	let eventComment = {}
	const editCommentId = url.searchParams.get('editComment')

	if (editCommentId) {
		try {
			eventComment = await prisma.comment.findFirstOrThrow({
				where: { id: editCommentId }
			})
		} catch (error) {
			luciaErrors(error)
			prismaError(error)
			console.log('error: ', error)
			throw fail(500, { messgage: 'Unknown Error occured' })
		}
	}

	const commentForm = await superValidate(eventComment, commentSchema, { id: 'commentForm' })

	const deleteCommentForm = await superValidate(eventComment, deletCommentSchema, {
		id: 'deleteComment'
	})

	return {
		deleteCommentForm,
		commentForm,
		event: getEvent(),
		comments: await getComments(),
		await: {
			// commentsAndCount: getCommentsAndCount(),
			races: getRaces()
		}
	}
}) satisfies PageServerLoad

export const actions = {
	deleteEvent: async ({ locals, url }) => {
		const session = locals.auth.validate()
		if (!session) throw redirect(307, `/auth/login?from=${url.pathname}${url.search}`)

		const itemId = url.searchParams.get('itemId') ?? ''

		try {
			await prisma.event.delete({ where: { id: itemId } })
		} catch (error) {
			console.log('error: ', error)
		}
	}
}
