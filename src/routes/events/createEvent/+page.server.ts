import { Populate } from '$lib/importers/sailwave'
import Blw from '$lib/importers/sailwave/Blw'
import { prisma } from '$lib/server/prisma'
import { redirect } from '@sveltejs/kit'
import csv from 'csvtojson'
import type { Actions, PageServerLoad } from './$types'
import { prismaError } from '$lib/error-handling'

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate()

	// If not logged in redirect
	if (!session) {
		throw redirect(302, '/')
	}

	async function getOrgs() {
		try {
			return await prisma.organization.findMany({
				where: { ownerId: session?.user.userId },
				select: { name: true, id: true }
			})
			//
		} catch (error) {
			prismaError(error)
			console.log('error: ', error)
		}
	}
	return {
		orgs: await getOrgs()
	}
}) satisfies PageServerLoad

export const actions: Actions = {
	setOrg: async ({ locals, request }) => {
		const session = await locals.auth.validate()
		const formObj: any = Object.fromEntries(await request.formData())
		console.log('formObj: ', formObj)
	},

	newImport: async ({ request, locals, url }) => {
		const session = await locals.auth.validate()

		const formData = await request.formData()
		const { orgId, file }: any = Object.fromEntries(formData)

		const csvArray = await csv({ noheader: true, output: 'csv' }).fromString(await file.text())

		const blw = new Blw({ data: csvArray })
		const { uniqueIdString } = blw.getEvent()

		const duplicate = await prisma.event.findFirst({
			where: { uniqueIdString: uniqueIdString },
			select: { id: true }
		})

		if (duplicate) {
			throw redirect(301, `/import/update?${url.search}&duplicate=1&eventId=${duplicate.id}`)
		}

		await Populate({
			blw,
			userId: session?.user.userId,
			orgId
		})

		throw redirect(300, `/events`)
	},

	update: async ({ request, locals }) => {
		const session = await locals.auth.validate()

		const formData: any = Object.fromEntries(await request.formData())
		const { org, file }: any = formData
		const csvArray = await csv({ noheader: true, output: 'csv' }).fromString(await file.text())

		const blw = new Blw({ data: csvArray })

		await Populate({
			blw,
			userId: session?.user.userId,
			orgId: org
		})

		throw redirect(300, `/events`)
	}
}
