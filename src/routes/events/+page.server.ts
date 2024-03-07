import { prisma } from '$lib/server/prisma'
import { fail, type Actions } from '@sveltejs/kit'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, url, cookies }) => {
	const session = await locals.auth.validate()
	const { skip, take, whereType, whereId, title } = Object.fromEntries(url.searchParams)

	async function getEventsCount() {
		return await prisma.event.count({ where: { [whereType]: whereId } })
	}

	async function getEvents() {
		try {
			return await prisma.event.findMany({
				where: {
					OR: [
						{ [whereType]: whereId, public: true },
						{ [whereType]: whereId, publisherId: session?.user.userId }
					]
				},
				orderBy: sort(),
				select: {
					id: true,
					publisherId: true,
					name: true,
					venueName: true,
					description: true,
					createdAt: true,
					Publisher: { select: { id: true, username: true, avatar: true } },
					Organization: { select: { name: true, id: true } },
					Venue: { select: { name: true, id: true } },
					Follows: true,
					Likes: { select: { id: true, eventId: true, userId: true } },
					_count: { select: { Likes: true, Follows: true } }
				},
				skip: Number(skip ?? 0),
				take: Number(take ?? 10)
			})
		} catch (error: any) {
			setFlash({ type: 'error', message: 'Get event Fail' }, cookies)
			throw fail(500, { message: 'Get event Fail', error: error.message })
		}
	}

	function sort() {
		let sort = {}
		const sortBy = url.searchParams.get('sortBy') ?? 'createdAt'
		const sortOrder = url.searchParams.get('sortOrder') ?? 'desc'
		if (sortBy === 'org') {
			return { Organization: { name: 'asc' } }
		} else if (sortBy === 'venue') {
			return { Venue: { name: 'asc' } }
		} else {
			sort[sortBy] = sortOrder
			return sort
		}
	}

	return {
		title,
		events: await getEvents(),
		count: await getEventsCount(),
		awaited: { events: await getEvents() }
	}
}

export const actions = {
	sortByOrg: async ({ cookies }) => {
		try {
			return await prisma.organization.findMany({
				orderBy: { name: 'asc' }
			})
		} catch (error) {
			setFlash({ type: 'error', message: 'sortByOrg action error' }, cookies)
			return fail(500, { message: 'Sort By Org Fail' })
		}
	},

	deleteEvent: async ({ locals, url, cookies }) => {
		const session = locals.auth.validate()
		if (!session)
			throw redirect(
				`/auth/login?from=${url.pathname}${url.search}`,
				{ type: 'error', message: 'Not authorized to delete' },
				cookies
			)

		const itemId = url.searchParams.get('itemId') ?? ''

		try {
			// Need this because of many-to-many relations
			await prisma.comp.deleteMany({
				where: { Events: { every: { id: itemId } } }
			})

			await prisma.event.delete({
				where: { id: itemId }
			})
		} catch (error) {
			setFlash({ type: 'error', message: 'Error in deleting event' }, cookies)
			console.log('error: ', error)
		}

		setFlash({ type: 'success', message: 'Event was deleted' }, cookies)
	}
} satisfies Actions
