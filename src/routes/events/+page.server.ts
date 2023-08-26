import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.auth.validate();
	// If not logged in redirect
	if (!session) {
		throw redirect(302, '/');
	}
	// const mySort = sort();
	const events = await prisma.event.findMany({
		// where: { publisherId: session.userId },
		include: { Publisher: true },
		orderBy: sort()
	});

	function sort() {
		let sort = {};
		const sortBy: any = url.searchParams.get('sortBy')
			? url.searchParams.get('sortBy')
			: 'createdAt';
		const sortOrder: any = url.searchParams.get('sortOrder')
			? url.searchParams.get('sortOrder')
			: 'asc';
		Object.defineProperty(sort, sortBy, { value: sortOrder });
		console.log('sort: ', sort);
		return sort;
	}
	console.log('sort(): ', sort());
	// const orgs = await prisma.organization.findMany({
	// 	where: { ownerId: session.userId }
	// })
	return {
		events
		// orgs
	};
};
