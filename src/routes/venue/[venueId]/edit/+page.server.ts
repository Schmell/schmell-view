import { fail, redirect } from '@sveltejs/kit'
import { message, setError, superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad } from './$types'
import { venueSchema, addressSchema, contactSchema } from './schemas'
import { prismaError } from '$lib/error-handling'
import { Prisma } from '@prisma/client'

export const load = (async ({ locals, params, url }) => {
	//
	const session = locals.auth.validate()
	if (!session) throw redirect(301, `${url.searchParams.get('from')}`)

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

	async function getAddresses() {
		try {
			return await prisma.address.findMany({
				where: { venueId: params.venueId },
				orderBy: { label: 'asc' }
			})
		} catch (error) {
			console.log('error: ', error)
		}
	}

	async function getAddress(id: string | null) {
		if (!id) return null
		try {
			return await prisma.address.findUnique({
				where: { id }
			})
		} catch (error) {
			console.log('error: ', error)
		}
	}

	async function getContacts() {
		try {
			return await prisma.contact.findMany({
				where: { venueId: params.venueId },
				orderBy: { label: 'asc' }
			})
		} catch (error) {
			console.log('error: ', error)
		}
	}

	async function getContact(id: string | null) {
		if (!id) return null
		try {
			return await prisma.contact.findUnique({
				where: { id }
			})
		} catch (error) {
			console.log('error: ', error)
		}
	}

	async function getAddressForm() {
		if (url.searchParams.get('editAddress')) {
			return await superValidate(
				await getAddress(url.searchParams.get('editAddress')),
				addressSchema
			)
		} else {
			return await superValidate(addressSchema)
		}
	}

	async function getConactForm() {
		if (url.searchParams.get('editContact')) {
			return await superValidate(
				await getContact(url.searchParams.get('editContact')),
				contactSchema
			)
		} else {
			return await superValidate(contactSchema)
		}
	}

	async function getVenueForm() {
		if (params.venueId === 'new') {
			return superValidate({ name: 'new venue' }, venueSchema)
		} else {
			return superValidate(await getVenue(), venueSchema)
		}
	}

	return {
		venueForm: getVenueForm(),
		addressForm: getAddressForm(),
		contactForm: getConactForm(),
		addresses: await getAddresses(),
		contacts: await getContacts()
	}
}) satisfies PageServerLoad

///////////////////////////////////////////////////////////////////////////////////
export const actions = {
	details: async ({ locals, request, params, url }) => {
		const session = await locals.auth.validate()
		if (!session) throw redirect(307, url.searchParams.get('from') ?? '/')

		const form = await superValidate(request, venueSchema)

		if (!form.valid) return { form }
		// console.log('form: ', form)
		const { name, ...rest } = form.data
		try {
			await prisma.venue.upsert({
				where: { id: params.venueId },
				create: { ...form.data, Publisher: { connect: { id: session.user.userId } } },
				update: { ...form.data }
			})
		} catch (error: any) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				let duplicateId
				if (error.code === 'P2002') {
					// @ts-ignore
					if (error.meta?.target.includes('name')) {
						setError(form, 'name', 'Duplicate name')
						duplicateId = await prisma.venue.findFirst({
							where: { name: form.data.name },
							select: { id: true }
						})
					}
				}
				console.log('duplicateId: ', duplicateId)
				return {
					duplicateId,
					form
				}
			} else {
				console.log('error: ', error)
			}

			return { form }
		}
		console.log(url.searchParams.get('from'))

		throw redirect(307, url.searchParams.get('from') ?? '/')
	},

	address: async ({ locals, request, params, url }) => {
		const session = await locals.auth.validate()
		if (!session) throw redirect(307, url.searchParams.get('from') ?? '/')

		const form = await superValidate(request, addressSchema)
		// console.log('form: ', form)
		if (!form.valid) return { form }

		const { id, ...rest } = form.data

		try {
			await prisma.address.upsert({
				where: { id: form.data.id || '' },
				update: { ...rest },
				create: { ...rest, Venue: { connect: { id: params.venueId } } }
			})
		} catch (error) {
			console.log('error: ', error)
			return { form }
		}
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
	},

	contact: async ({ locals, request, params, url }) => {
		const session = await locals.auth.validate()
		if (!session) throw redirect(307, url.searchParams.get('from') ?? '/')

		const form = await superValidate(request, contactSchema)
		// console.log('form: ', form.data)
		if (!form.valid) return { form }

		const { id, ...rest } = form.data

		try {
			await prisma.contact.upsert({
				where: { id: form.data.id || '' },
				update: { ...rest },
				create: { ...rest, Venue: { connect: { id: params.venueId } } }
			})
		} catch (error) {
			return { form }
		}
	},

	deleteContact: async ({ locals, request }) => {
		const formObj = Object.fromEntries(await request.formData()) as Record<string, string>
		try {
			await prisma.contact.delete({
				where: { id: formObj.addressId }
			})
		} catch (error) {
			console.log('error: ', error)
			return fail(500, { messgae: 'Failed to delete address' })
		}
	}
}
