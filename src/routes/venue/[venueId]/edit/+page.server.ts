import { fail, type Actions, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad } from './$types'
import { venueSchema, addressSchema } from './venueSchema'

export const load = (async ({ params }) => {
	async function getVenue() {
		try {
			return await prisma.venue.findUniqueOrThrow({
				where: { id: params.venueId },
				include: { Addresses: true }
			})
		} catch (error) {
			throw fail(404, { message: `edit event error: ${error}` })
		}
	}

	function getAddresses() {
		try {
			return prisma.address.findMany({
				where: { venueId: params.venueId }
			})
		} catch (error) {
			console.log('error: ', error)
		}
	}

	// if (params.venueId === 'new') {
	// 	return { form: await superValidate({ name: 'new' }, venueSchema) }
	// }

	const venueForm = await superValidate(await getVenue(), venueSchema)

	const addressForm = await superValidate(addressSchema)

	return { venueForm, addressForm, addresses: await getAddresses() }
}) satisfies PageServerLoad

////////////////////////////////////////////////////////////////
export const actions = {
	details: async ({ locals, request, params, url }) => {
		const session = await locals.auth.validate()
		if (!session) throw redirect(307, url.searchParams.get('from') ?? '/')

		const form = await superValidate(request, venueSchema)

		try {
			await prisma.venue.update({
				where: { id: params.venueId },
				data: {
					...form.data
				}
			})
		} catch (error) {
			console.log('error: ', error)
			return { form }
		}
		console.log('url', url.searchParams.get('from'))
		throw redirect(307, url.searchParams.get('from') ?? '/')
	},

	address: async ({ locals, request, params, url }) => {
		const session = await locals.auth.validate()
		if (!session) throw redirect(307, url.searchParams.get('from') ?? '/')

		const form = await superValidate(request, addressSchema)
		// console.log('form: ', form)
		try {
			await prisma.address.upsert({
				where: { id: params.venueId },
				update: { ...form.data },
				create: { ...form.data, Venue: { connect: { id: params.venueId } } }
			})
		} catch (error) {
			console.log('error: ', error)
			return { form }
		}

		// throw redirect(307, url.searchParams.get('from') ?? '/')
	},

	deleteAddress: async ({ locals, request }) => {
		const formObj = Object.fromEntries(await request.formData()) as Record<string, string>
		try {
			await prisma.address.delete({
				where: { id: formObj.addressId }
			})
		} catch (error) {
			console.log('error: ', error)
			return fail(500, { messgae: 'Failed to delete address' })
		}
	}
}
