import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prismaError } from '$lib/error-handling';

export const load = (async ({ url }) => {
	const eventId = url.searchParams.get('eventId');

	if (!eventId) return { error: 'No event id provided' };
	console.log('eventId: ', eventId);
	async function getEvent() {
		try {
			return await prisma.event.findUnique({
				where: { id: eventId! }
			});
		} catch (error) {
			prismaError(error);
			console.log('duplicate page error: ', error);
		}
	}

	return {
		event: getEvent()
	};
}) satisfies PageServerLoad;
