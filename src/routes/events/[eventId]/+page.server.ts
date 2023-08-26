import { prisma } from '$lib/server/prisma';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { luciaErrors, prismaError } from '$lib/error-handling';

const commentSchema = z.object({
	comment: z.string().max(256).nullish(),
	type: z.string(),
	eventComentId: z.string(),
	id: z.string().optional()
});

const likeSchema = z.object({
	comment: z.string().max(256),
	type: z.string(),
	id: z.string()
});

export const load = (async ({ params, locals, url }) => {
	// console.log('params: ', params)
	// const session = await locals.auth.validate();

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
					_count: { select: { comments: true } },
					comments: { select: { User: { select: { avatar: true, username: true } } }, take: 10 },
					Venue: { select: { name: true, website: true } }
				}
			});
		} catch (error) {
			luciaErrors(error);
			prismaError(error);
			console.log('error: ', error);
			throw fail(500, { messgage: 'Unknown Error occured in getEvent()' });
			// return fail(501, { message: 'Unkown error occured' });
		}
	} // getEvent()

	async function getComments() {
		try {
			return await prisma.eventComment.findMany({
				where: { eventId: params.eventId },
				include: {
					User: {
						select: { avatar: true, username: true, id: true }
					},
					_count: {
						select: { likes: true }
					},
					likes: { select: { userId: true, id: true } }
				},
				orderBy: {
					createdAt: 'desc'
				}
			});
		} catch (error) {
			luciaErrors(error);
			prismaError(error);
			console.log('error: ', error);
			throw fail(500, { messgage: 'Unknown Error occured in getComments()' });
		}
	} // getComments

	// edit comment
	let eventComment = {};
	const editCommentId = url.searchParams.get('editComment');

	if (editCommentId) {
		// Pass the comment to be edited back to the page
		// Make the comment component use the populated comment to pre-fill the form
		// then just post to ?/comment formAction
		try {
			eventComment = await prisma.eventComment.findFirstOrThrow({
				where: { id: editCommentId }
			});
		} catch (error) {
			luciaErrors(error);
			prismaError(error);
			console.log('error: ', error);
			throw fail(500, { messgage: 'Unknown Error occured' });
			// return fail(500, { messgage: 'Unknown Error occured' });
		}
	}

	const commentForm = await superValidate(eventComment, commentSchema, { id: 'commentForm' });

	return {
		commentForm,
		event: getEvent(),
		comments: getComments()
	};
}) satisfies PageServerLoad;

export const actions = {
	like: async ({ request, params, locals, url }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;

		const session = await locals.auth.validate();
		if (!session) throw redirect(301, `/login?from=${url.pathname}`);

		try {
			return await prisma.like.create({
				data: {
					type: 'comment',
					eventComment: { connect: { id: formData.commentId } },
					User: { connect: { id: session?.user?.userId } },
					Event: { connect: { id: params.eventId } }
				}
			});
			//
		} catch (error) {
			luciaErrors(error);
			prismaError(error);
			console.log('error: ', error);
			return fail(500, {
				message: 'Unknown Error occured'
			});
		}
	},

	unlike: async ({ request, locals, url }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;

		const session = await locals.auth.validate();
		if (!session) throw redirect(301, `/login?from=${url.pathname}`);

		try {
			await prisma.like.delete({
				where: { id: formData.likeId }
			});
			//
		} catch (error) {
			luciaErrors(error);
			prismaError(error);
			console.log('error: ', error);
			return fail(500, {
				message: 'Unknown Error occured'
			});
		}
	},

	comment: async ({ request, locals, params, url }) => {
		const commentForm = await superValidate(request, commentSchema, { id: 'commentForm' });

		const { data } = commentForm;

		const session = await locals.auth.validate();
		if (!session) throw redirect(301, `/login?from=${url.pathname}`);

		try {
			await prisma.eventComment.upsert({
				where: { id: data.id },
				update: {
					comment: data.comment ?? '',
					type: data.type
				},
				create: {
					comment: data.comment ?? '',
					type: data.type,
					User: { connect: { id: session?.user?.userId } },
					Event: { connect: { id: params.eventId } }
				}
			});

			data.comment = '';
			//
		} catch (error) {
			luciaErrors(error);
			prismaError(error);
			console.log('error: ', error);
			return fail(500, {
				message: 'Unknown Error occured'
			});
		}

		throw redirect(307, `/events/${params.eventId}`);
	}
} satisfies Actions;
