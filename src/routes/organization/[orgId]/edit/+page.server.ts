import { prisma } from '$lib/server/prisma.js'
import { capitalizeFirstLetter } from '$lib/utils'
import { Prisma } from '@prisma/client'
import { fail } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { OrganizationSchema } from './orgSchema'

export const load = async ({ params, url }) => {
	if (params.orgId === 'new') {
		const org = { name: 'New Organization' }

		const form = await superValidate(org, OrganizationSchema)

		return { form }
	}
	const org: any = await prisma.organization.findFirst({
		where: { id: params.orgId },
		include: { Owner: true }
	})

	const form = await superValidate(org, OrganizationSchema)

	return { form }
}

export const actions = {
	default: async ({ request, locals, url }) => {
		const session = await locals.auth.validate()
		if (!session) throw fail(400, { message: 'Not authorised to edit organization' })

		const form = await superValidate(request, OrganizationSchema)

		if (!form.valid) fail(400, { form })

		try {
			const { id, name, description, website, email, titleImage, logo } = form.data
			// name is not good for duplicates
			await prisma.organization.upsert({
				where: { id: id },
				update: { name, description, website, email, titleImage, logo },
				create: {
					name,
					description,
					website,
					email,
					titleImage,
					logo,
					Owner: {
						connect: { id: session.user.userId }
					}
				}
			})
			// console.log( q );
			// console.log('q: ', q)
			//
		} catch (error: any) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.log('prisma known error: ', form)
				// Unique constraint violation
				if (error.code === 'P2002') {
					//@ts-ignore
					const propName = e.meta?.target[0]

					form.valid = false
					console.log('form.data[propName]: ', form.data[propName])

					form.errors[propName] = `${capitalizeFirstLetter(propName)} is already registered`

					return fail(400, {
						form
					})
				}

				// Can't reach database server
				if (error.code === 'P1001') {
					console.log(' Cant reach database server: ', error.message)
					return fail(503, {
						message: error.message
					})
				}
			}

			console.log('error: ', error)

			return { form }
		}

		// Everything is good return the form
		return { form }
	}
}
