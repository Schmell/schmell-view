import { prisma } from '$lib/server/prisma'
import { error, fail } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { superValidate } from 'sveltekit-superforms/server'
import { luciaErrors, prismaError } from '$lib/error-handling'
import { z } from 'zod'

export const load = (async ({ params, url }) => {
	async function getVenue() {
		try {
			return await prisma.venue.findUniqueOrThrow({
				where: { id: params.venueId },
				include: {
					Publisher: { select: { id: true, username: true, avatar: true } },
					_count: { select: { Comments: true, Likes: true, Follows: true } },
					Events: {
						include: {
							Races: true,
							Organization: true,
							Comments: { include: { User: true } },
							Likes: true,
							Follows: true
						}
					},
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
					Likes: true,
					Follows: true,
					Addresses: true,
					Contacts: true
				}
			})
		} catch (error) {
			console.log('error: ', error)

			throw fail(404, {})
		}
	}
	// edit comment

	const commentSchema = z.object({
		comment: z.string().max(256).nullish(),
		type: z.string(),
		eventComentId: z.string(),
		id: z.string().optional()
	})

	let itemComment = {}
	const editCommentId = url.searchParams.get('editComment')

	if (editCommentId) {
		// Pass the comment to be edited back to the page
		// Make the comment component use the populated comment to pre-fill the form
		// then just post to ?/comment formAction
		try {
			itemComment = await prisma.comment.findFirstOrThrow({
				where: { id: editCommentId }
			})
		} catch (error) {
			luciaErrors(error)
			prismaError(error)
			console.log('error: ', error)
			throw fail(500, { messgage: 'Unknown Error occured' })
		}
	}

	return {
		commentForm: await superValidate(itemComment, commentSchema, { id: 'commentForm' }),
		venue: await getVenue()
	}
}) satisfies PageServerLoad
