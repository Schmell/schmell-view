import { SeriesSchema } from '$lib/schemas/generated/zod'
import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import type { Actions, PageServerLoad } from './$types'
import { seriesSchema } from './seriesSchema'
import { goto } from '$app/navigation'
// import { seriesSchema } from './seriesSchema'

export const load = (async ({ locals, params, url }) => {
	const session = await locals.auth.validate()
	if (!session) throw redirect(307, `/auth/login?from=${url.pathname}`)

	async function getSeries() {
		try {
			return await prisma.series.findUnique({
				where: { id: params.seriesId },
				include: {
					Events: { select: { id: true, name: true } }
				}
			})
		} catch (error: any) {
			console.log('error: ', error)
			throw error(404, { message: 'not found' })
		}
	}
	// console.log('getSeries(): ', await getSeries())

	async function getOrgs() {
		try {
			return await prisma.organization.findMany({
				where: { ownerId: session?.user.userId },
				select: {
					id: true,
					name: true
				}
			})
		} catch (error: any) {
			throw error(404, { message: 'not found' })
		}
	}

	async function getEvents() {
		try {
			return await prisma.event.findMany({
				where: {
					OR: [{ publisherId: session?.user.userId }],
					NOT: { Series: { id: params.seriesId } }
				},
				select: {
					id: true,
					name: true
				}
			})
		} catch (error: any) {
			throw error(404, { message: 'not found' })
		}
	}

	if (params.seriesId === 'new') {
		return {
			orgs: getOrgs(),
			events: getEvents(),
			form: await superValidate({ name: 'new' }, seriesSchema)
		}
	}

	return {
		orgs: getOrgs(),
		events: getEvents(),
		form: superValidate(await getSeries(), seriesSchema)
	}
}) satisfies PageServerLoad

export const actions = {
	series: async ({ locals, params, request, url }) => {
		const session = await locals.auth.validate()
		if (!session) throw redirect(307, `/auth/login?from=${url.pathname}`)

		const form = await superValidate(request, seriesSchema)
		// console.log('form: ', form)
		if (!form.valid) {
			return fail(400, { form })
		}

		const { Events, organizationId, ...rest } = form.data
		// console.log(Events)

		try {
			await prisma.series.upsert({
				where: { id: params.seriesId },
				update: {
					...rest,
					Organization: { connect: { id: organizationId ?? '' } }
				},
				create: {
					...rest,
					Publisher: { connect: { id: session.user.userId } },
					Organization: { connect: { id: organizationId ?? '' } }
				}
			})
		} catch (error) {
			console.log('error: ', error)
			return { form }
		}

		function getRedirect() {
			const from = url.searchParams.get('from')
			if (from) {
				url.searchParams.delete('from')
				url.searchParams.delete('/series')
				return from + url.search
			}
			return ''
		}
		//  the redirect is happening on the client now
		// throw redirect(301, getRedirect())
	},

	addEvent: async ({ params, url }) => {
		const eventId = url.searchParams.get('eventId')
		if (!eventId) return null

		try {
			await prisma.series.update({
				where: { id: params.seriesId },
				data: {
					Events: { connect: { id: eventId } }
				}
			})
		} catch (error) {
			console.log('error: ', error)
		}
	},

	deleteEvent: async ({ params, url }) => {
		const eventId = url.searchParams.get('eventId')
		if (!eventId) return null

		try {
			await prisma.series.update({
				where: { id: params.seriesId },
				data: {
					Events: { disconnect: { id: eventId } }
				}
			})
		} catch (error) {
			console.log('error: ', error)
		}
	}
} satisfies Actions
