import { superValidate } from 'sveltekit-superforms/server'
import { error, fail, redirect } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma.js'
import { eventSchema } from './eventSchema.js'

export const load = async ({ params }) => {
	async function getEvent() {
		try {
			return await prisma.event.findUnique({
				where: { id: params.eventId }
			})
		} catch (error) {
			throw fail(404, { message: `edit event error: ${error}` })
		}
	}

	if (params.eventId === 'new') {
		return { form: await superValidate({ name: 'new' }, eventSchema) }
	}

	const form = await superValidate(await getEvent(), eventSchema)
	return { form }
}

export const actions = {
	default: async ({ request, params, url }) => {
		const form = await superValidate(request, eventSchema)

		console.log('form: ', form.data)

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
					}
				}
			})
		} catch (err) {
			console.log('err: ', err)
			throw error(400, 'Error updating the event')
		}

		throw redirect(302, `${url.searchParams.get('from')}`)
	}
}
