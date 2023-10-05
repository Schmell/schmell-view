import { superValidate } from 'sveltekit-superforms/server'
import { fail, redirect } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma.js'
import { eventSchema } from './eventSchema.js'

export const load = async ({ params, locals }) => {
	const session = await locals.auth.validate()
	async function getEvent() {
		try {
			return await prisma.event.findUnique({
				where: { id: params.eventId },
				include: { Venue: true }
			})
		} catch (error) {
			throw fail(404, { message: `edit event error: ${error}` })
		}
	}

	async function getVenues() {
		try {
			return await prisma.venue.findMany({
				where: { publisherId: session?.user.userId }
			})
		} catch (error) {
			throw fail(404, { message: `get venue in event edit page error: ${error}` })
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
		// console.log('form: ', form)

		if (!form.valid) {
			return fail(400, { form })
		}

		const {
			rank,
			points,
			position,
			skipper,
			boat,
			finish,
			corrected,
			elapsed,
			nett,
			total,
			venueId,
			Venue,
			...rest
		} = form.data

		try {
			await prisma.event.update({
				where: { id: params.eventId },
				data: {
					...rest,
					resultColumns: {
						rank: rank ?? false,
						points: points ?? false,
						position: position ?? false,
						skipper: skipper ?? false,
						boat: boat ?? false,
						finish: finish ?? false,
						corrected: corrected ?? false,
						elapsed: elapsed ?? false,
						nett: nett ?? false,
						total: total ?? false
					},
					venueId: venueId
				}
			})
		} catch (error) {
			console.log('error: ', error)
			throw fail(400, { message: 'Error updating the event' })
		}

		throw redirect(302, `${url.searchParams.get('from')}`)
	}
}
