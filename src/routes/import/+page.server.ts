import type { Actions, PageServerLoad } from '../$types'
import { z } from 'zod'
import csv from 'csvtojson'
// import { redirect } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
import { Populate } from '$lib/importers/sailwave'
import Blw from '$lib/importers/sailwave/Blw'
import { prismaError } from '$lib/error-handling'
import { redirect } from 'sveltekit-flash-message/server'

const importSchema = z.object({
	file: z.any(),
	org: z.string()
})

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth.validate()
	// If not logged in redirect
	if (!session) {
		throw redirect(302, '/', { type: 'error', message: 'Not Authorised' }, event)
	}

	async function getOrgs() {
		try {
			return await prisma.organization.findMany({
				where: { ownerId: session?.userId },
				select: { name: true, id: true }
			})
		} catch (error) {
			prismaError(error)
			console.log('error: ', error)
		}
	}

	// const form = await superValidate(importSchema);

	return { orgs: getOrgs() }
}

export const actions: Actions = {
	setOrgId: async ({ locals, request }) => {
		const session = await locals.auth.validate()
		const formObj: any = Object.fromEntries(await request.formData())
		console.log('formObj: ', formObj)
	},

	newImport: async (event) => {
		const { request, locals, url } = event
		const session = await locals.auth.validate()
		const formData = await request.formData()
		const { org, file }: any = Object.fromEntries(formData)
		// console.log('file: ', file)
		const csvArray = await csv({ noheader: true, output: 'csv', ignoreEmpty: true }).fromString(
			await file.text()
		)

		const blw = new Blw({ data: csvArray, file })
		const { uniqueIdString } = blw.getEvent()

		const duplicate = await prisma.event.findFirst({
			where: { uniqueIdString: uniqueIdString },
			select: { id: true }
		})

		if (duplicate) {
			throw redirect(
				`/import/update?${url.search}&duplicate=1&eventId=${duplicate.id}`,
				{ type: 'error', message: 'Duplicate Event' },
				event
			)
		}

		await Populate({
			blw,
			userId: session?.user.userId,
			orgId: org
		})

		throw redirect(300, `/events`, { type: 'success', message: 'Event added' }, event)
	},

	update: async (event) => {
		const session = await event.locals.auth.validate()

		const formData: any = Object.fromEntries(await event.request.formData())
		const { org, file }: any = formData
		const csvArray = await csv({ noheader: true, output: 'csv' }).fromString(await file.text())

		const blw = new Blw({ data: csvArray })

		await Populate({
			blw,
			userId: session?.user.userId,
			orgId: org
		})

		throw redirect(300, `/events`, { type: 'success', message: 'Event Updated' }, event)
	}
}
