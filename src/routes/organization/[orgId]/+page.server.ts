import { luciaErrors, prismaError } from '$lib/error-handling'
import { prisma } from '$lib/server/prisma'
import { fail } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { superValidate } from 'sveltekit-superforms/server'
import { z } from 'zod'

const commentSchema = z.object({
	comment: z.string().max(256).nullish(),
	type: z.string(),
	eventComentId: z.string(),
	id: z.string().optional()
})

export const load = (async ({ params, url }) => {
	const getOrg = async () => {
		try {
			return await prisma.organization.findUniqueOrThrow({
				where: { id: params.orgId },
				include: {
					Events: {
						include: {
							Races: true,
							Organization: true,
							Comments: { include: { User: true } },
							Likes: true,
							Follows: true
						}
					},
					_count: { select: { Comments: true, Likes: true } },
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
					Owner: true,
					Addresses: true
				}
			})
		} catch (error) {
			console.error('error: ', error)
		}
	}

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

	return {
		commentForm,
		org: await getOrg()
	}
}) satisfies PageServerLoad
