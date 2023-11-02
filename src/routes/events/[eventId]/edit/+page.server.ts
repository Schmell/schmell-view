import { superValidate } from 'sveltekit-superforms/server'
import { fail, redirect, error } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma.js'
import { eventSchema } from './eventSchema.js'

export const load = async ({ params, locals, url }) => {
	const session = await locals.auth.validate()
	if (!session) throw redirect(307, `/auth/login?from=/results/${url.pathname}`)

	async function getEvent() {
		try {
			return await prisma.event.findUnique({
				where: { id: params.eventId },
				include: { Venue: { select: { name: true, id: true } } }
			})
		} catch (err) {
			throw error(500, { message: `edit event error: ${err}` })
		}
	}

	async function getVenues() {
		try {
			return await prisma.venue.findMany({
				where: { publisherId: session?.user.userId }
			})
		} catch (err) {
			throw error(404, { message: `get venue in event edit page error: ${err}` })
		}
	}

	if (params.eventId === 'new') {
		return {
			venues: await getVenues(),
			form: await superValidate({ name: 'new' }, eventSchema)
		}
	}
	return {
		venues: await getVenues(),
		form: await superValidate(await getEvent(), eventSchema)
	}
}

export const actions = {
	default: async ({ request, params, url }) => {
		const form = await superValidate(request, eventSchema)

		if (!form.valid) {
			return fail(400, { form })
		}

		const { Venue, ...rest } = form.data

		console.log('form: ', form)

		try {
			await prisma.event.upsert({
				where: { id: params.eventId },
				update: { ...rest },
				create: { ...rest }
			})
		} catch (error) {
			console.log('error: ', error)
			return { form }
		}

		throw redirect(302, `${url.searchParams.get('from')}?${url.searchParams.toString()}`)
	}
}
