import { fail, type Actions, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad } from './$types'
import { venueSchema } from './venueSchema'

export const load = (async ({ params }) => {
	async function getVenue() {
		try {
			return await prisma.venue.findUniqueOrThrow({
				where: { id: params.venueId }
				// include: { Addresses: true }
			})
		} catch (error) {
			throw fail(404, { message: `edit event error: ${error}` })
		}
	}

	if (params.venueId === 'new') {
		return { form: await superValidate({ name: 'new' }, venueSchema) }
	}
	const venue = await getVenue()

	const form = await superValidate(venue, venueSchema)

	return { form }
}) satisfies PageServerLoad

export const actions = {
	default: async ({ locals, request, params, url }) => {
		const session = await locals.auth.validate()
		if (!session) throw redirect(307, url.searchParams.get('from') ?? '/')

		const form = await superValidate(request, venueSchema)
		console.log('form: ', form.data)

		// To get multiple address's
		// I think i need to have multiple forms on the page and submit them indepedantly
		const { addressName, street, city, state, country, code, ...rest } = form.data

		try {
			await prisma.venue.update({
				// this where should match the address not the venue

				where: { id: params.venueId },
				data: {
					...rest
				}
			})
			await prisma.address.upsert({
				where: { id: params.venueId },
				create: {
					name: addressName ?? 'Mailing Address',
					street,
					city,
					state,
					country,
					code,
					Publisher: { connect: { id: session.user.userId } },
					Venue: { connect: { id: params.venueId } }
				},
				update: {
					// name: addressName,
					street,
					city,
					state,
					country,
					code
				}
			})
		} catch (error) {
			console.log('error: ', error)
		}

		throw redirect(307, url.searchParams.get('from') ?? '/')
	}
}
