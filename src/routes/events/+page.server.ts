import { prisma } from '$lib/server/prisma'
import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.auth.validate()
	// If not logged in redirect
	if (!session) {
		throw redirect(302, '/')
	}

	const skip = url.searchParams.get('skip')
	const take = url.searchParams.get('take')

	async function getEvents() {
		try {
			return await prisma.event.findMany({
				include: {
					Publisher: true,
					Likes: { select: { id: true, eventId: true, userId: true } },
					_count: { select: { Likes: true } }
				},
				skip: Number(skip ?? 0),
				take: Number(take ?? 10),

				orderBy: sort()
			})
		} catch (error) {
			throw fail(500, { message: 'Get event Fail' })
		}
	}

	// const events = await prisma.event.findMany({
	// 	include: {
	// 		Publisher: true,
	// 		Likes: { select: { id: true, eventId: true, userId: true } },
	// 		_count: { select: { Likes: true } }
	// 	},
	// 	skip: Number(skip ?? 0),
	// 	take: Number(take ?? 10),

	// 	orderBy: sort()
	// })

	function sort() {
		let sort = {}
		const sortBy: any = url.searchParams.get('sortBy')
			? url.searchParams.get('sortBy')
			: 'createdAt'
		const sortOrder: any = url.searchParams.get('sortOrder')
			? url.searchParams.get('sortOrder')
			: 'asc'
		Object.defineProperty(sort, sortBy, { value: sortOrder })
		return sort
	}

	return {
		events: getEvents()
	}
}
