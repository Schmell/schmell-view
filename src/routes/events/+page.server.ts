import { prisma } from '$lib/server/prisma'
import { fail, type Actions } from '@sveltejs/kit'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const { locals, url } = event
	const session = await locals.auth.validate()

	if (!session) {
		throw redirect(
			302,
			`/auth/login?from=${url.pathname}`,
			{ type: 'error', message: 'Not Authorised' },
			event
		)
	}

	const skip = url.searchParams.get('skip')
	const take = url.searchParams.get('take')
	const whereType = url.searchParams.get('whereType')
	const whereId = url.searchParams.get('whereId')
	const title = url.searchParams.get('title')

	function getWhere() {
		if (whereType && whereId) {
			const where = {}
			where[whereType] = whereId
			return where
		}
		return {}
	}
	// console.log('getWhere(): ', getWhere())
	async function getEventsCount() {
		try {
			return await prisma.event.count({ where: getWhere() })
		} catch (error) {
			console.log('error: ', error)
		}
	}

	async function getEvents() {
		try {
			return await prisma.event.findMany({
				where: getWhere(),
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
			throw fail(500, { message: 'Get event Fail', error: error.message })
		}
	}

	function sort() {
		let sort = {}
		const sortBy: any = url.searchParams.get('sortBy') ?? 'createdAt'
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

	// const [events, count] = await getEvents()
	// console.log('count: ', count)
	return {
		title,
		events: getEvents(),
		count: getEventsCount()
	}
}

export const actions = {
	sortByOrg: async () => {
		try {
			return await prisma.organization.findMany({
				orderBy: { name: 'asc' }
			})
		} catch (error) {
			console.log('error: ', error)
			return fail(500, { message: 'Sort By Org Fail' })
		}
	},

	deleteEvent: async (event) => {
		const { locals, url } = event
		const session = locals.auth.validate()
		if (!session) throw redirect(307, `/auth/login?from=${url.pathname}${url.search}`)

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
			console.log('error: ', error)
		}

		const message = { type: 'success', message: 'Event was deleted' } as const
		setFlash(message, event)
	}
} satisfies Actions
