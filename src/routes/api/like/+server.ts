import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prismaError } from '$lib/error-handling';

export const GET: RequestHandler = async ({ url, locals }) => {
	const session = await locals.auth.validate();

	const likeType = url.searchParams.get('likeType');
	console.log('likeType: ', likeType);
	const unlike = url.searchParams.get('unlike');
	console.log('unlike: ', unlike);
	const itemId = url.searchParams.get('itemId');
	console.log('itemId: ', itemId);
	if (!likeType || !itemId) throw error(500, { message: 'API error' });

	async function like() {
		switch (likeType) {
			case 'event':
				return await prisma.like.create({
					data: {
						type: 'event',
						Event: { connect: { id: itemId! } },
						User: { connect: { id: session!.user!.userId } }
					}
				});
			default:
				console.log(`Bad Error: ...`);
		}
	}

	async function unLike() {
		try {
			if (!unlike) throw error(500, { message: `unlike error` });
			console.log('unlike: ', unlike);
			return await prisma.like.delete({
				where: { id: unlike }
			});
		} catch (error) {
			prismaError(error);
			console.log('error: ', error);
		}
	}

	if (unlike) {
		unLike();
	} else {
		like();
	}

	return new Response();
};
