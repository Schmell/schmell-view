import { luciaErrors, prismaError } from '$lib/error-handling'
import { prisma } from '$lib/server/prisma'
import { fail } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { z } from 'zod'
import type { PageServerLoad } from './$types'

const commentSchema = z.object({
	comment: z.string().max(256).nullish(),
	type: z.string(),
	eventComentId: z.string(),
	id: z.string().optional()
})

const deletCommentSchema = z.object({
	id: z.string()
})

const likeSchema = z.object({
	comment: z.string().max(256),
	type: z.string(),
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
					eventwebsite: true,
					_count: { select: { Comments: true, Likes: true, Follows: true } },
					Comments: {
						orderBy: { createdAt: 'desc' },
						select: {
							comment: true,
							id: true,
							type: true,
							User: true,
							Likes: true,

							_count: { select: { Likes: true } }
						}
					},
					Organization: { select: { titleImage: true, name: true, id: true } },
					Venue: { select: { name: true, website: true, burgee: true } },
					// User: { select: { name: true, website: true } },
					Races: { orderBy: { name: 'asc' } },
					Likes: { select: { id: true, type: true, userId: true, itemId: true } },
					Follows: { select: { id: true, type: true, userId: true, itemId: true } }
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

	// edit comment
	let eventComment = {}
	const editCommentId = url.searchParams.get('editComment')

	if (editCommentId) {
		// Pass the comment to be edited back to the page
		// Make the comment component use the populated comment to pre-fill the form
		// then just post to ?/comment formAction
		try {
			eventComment = await prisma.comment.findFirstOrThrow({
				where: { id: editCommentId }
			})
		} catch (error) {
			luciaErrors(error)
			prismaError(error)
			console.log('error: ', error)
			throw fail(500, { messgage: 'Unknown Error occured' })
			// return fail(500, { messgage: 'Unknown Error occured' });
		}
	}

	const commentForm = await superValidate(eventComment, commentSchema, { id: 'commentForm' })

	const deleteCommentForm = await superValidate(eventComment, deletCommentSchema, {
		id: 'deleteComment'
	})

	return {
		deleteCommentForm,
		commentForm,
		event: getEvent()
	}
}) satisfies PageServerLoad

// export const actions = {
// 	like: async ({ request, params, locals, url }) => {
// 		const formData = Object.fromEntries(await request.formData()) as Record<string, string>

// 		const session = await locals.auth.validate()
// 		if (!session) throw redirect(301, `/login?from=${url.pathname}`)

// 		try {
// 			return await prisma.like.create({
// 				data: {
// 					type: 'comment',
// 					eventComment: { connect: { id: formData.commentId } },
// 					User: { connect: { id: session?.user?.userId } },
// 					Event: { connect: { id: params.eventId } }
// 				}
// 			})
// 			//
// 		} catch (error) {
// 			luciaErrors(error)
// 			prismaError(error)
// 			console.log('error: ', error)
// 			return fail(500, {
// 				message: 'Unknown Error occured'
// 			})
// 		}
// 	},

// 	unlike: async ({ request, locals, url }) => {
// 		const formData = Object.fromEntries(await request.formData()) as Record<string, string>

// 		const session = await locals.auth.validate()
// 		if (!session) throw redirect(301, `/login?from=${url.pathname}`)

// 		try {
// 			await prisma.like.delete({
// 				where: { id: formData.likeId }
// 			})
// 			//
// 		} catch (error) {
// 			luciaErrors(error)
// 			prismaError(error)
// 			console.log('error: ', error)
// 			return fail(500, {
// 				message: 'Unknown Error occured'
// 			})
// 		}
// 	},

// 	comment: async ({ request, locals, params, url }) => {
// 		const commentForm = await superValidate(request, commentSchema, { id: 'commentForm' })

// 		const { data } = commentForm

// 		const session = await locals.auth.validate()
// 		if (!session) throw redirect(301, `/login?from=${url.pathname}`)

// 		try {
// 			await prisma.comment.upsert({
// 				where: { id: data.id },
// 				update: {
// 					comment: data.comment ?? '',
// 					type: data.type
// 				},
// 				create: {
// 					comment: data.comment ?? '',
// 					type: data.type,
// 					User: { connect: { id: session?.user?.userId } },
// 					Event: { connect: { id: params.eventId } }
// 				}
// 			})

// 			data.comment = ''
// 			//
// 		} catch (error) {
// 			luciaErrors(error)
// 			prismaError(error)
// 			console.log('error: ', error)
// 			return fail(500, {
// 				message: 'Unknown Error occured'
// 			})
// 		}

// 		throw redirect(307, `/events/${params.eventId}`)
// 	}
// } satisfies Actions
