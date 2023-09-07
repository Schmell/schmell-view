import type { PageServerLoad } from './$types';
import { prismaError } from '$lib/error-handling';

export const load = (async ({ url, locals }) => {
	const session = await locals.auth.validate();
	const eventId = url.searchParams.get('eventId');
	const duplicate = url.searchParams.get('duplicate');
	if (!eventId) return { error: 'No event id provided' };
	// console.log('eventId: ', eventId);

	async function getOrgs() {
		try {
			return await prisma.organization.findMany({
				where: { ownerId: session?.userId },
				select: { name: true, id: true }
			});
		} catch (error) {
			prismaError(error);
			console.log('error: ', error);
		}
	}

	async function getEvent() {
		try {
			return await prisma.event.findUnique({
				where: { id: eventId! },
				select: { name: true }
			});
		} catch (error) {
			prismaError(error);
			console.log('duplicate page error: ', error);
		}
	}

	return {
		event: getEvent(),
		orgs: getOrgs(),
		duplicate
	};
}) satisfies PageServerLoad;
