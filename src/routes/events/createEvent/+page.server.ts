import { Populate } from '$lib/importers/sailwave'
import Blw from '$lib/importers/sailwave/Blw'
import { prisma } from '$lib/server/prisma'
import csv from 'csvtojson'
import type { Actions, PageServerLoad } from './$types'
import { prismaError } from '$lib/error-handling'
import { redirect } from 'sveltekit-flash-message/server'
import { dev } from '$app/environment'
import { goto } from '$app/navigation'

export const load = (async ({ locals, url, cookies }) => {
	const session = await locals.auth.validate()
	if (!session) {
		throw redirect(
			302,
			'/auth/login',
			{
				// @ts-ignore
				type: 'warning',
				message: 'Not Authorized',
				description: 'You need to be logged in to Create event',
				action: {
					label: 'Back',
					onClick: () => goto(url.searchParams.get('from') ?? '')
				}
			},
			cookies
		)
	}

	async function getOrgs() {
		try {
			return await prisma.organization.findMany({
				where: { ownerId: session?.user.userId },
				select: { name: true, id: true }
			})
		} catch (error) {
			prismaError(error)
			if (dev) console.log('error: ', error)
		}
	}

	return {
		title: 'Create Event',
		orgs: await getOrgs()
	}
}) satisfies PageServerLoad

export const actions: Actions = {
	setOrg: async ({ locals, request }) => {
		const session = await locals.auth.validate()
		const formObj: any = Object.fromEntries(await request.formData())
	},

	newImport: async (event) => {
		const { request, locals, url } = event
		const session = await locals.auth.validate()
		// const message =  as const;
		if (!session)
			throw redirect(
				`/auth/login?from=${url.pathname}`,
				{ type: 'error', message: 'Not Authorised' },
				event
			)

		const formData = await request.formData()
		const file = formData.get('file') as File
		const orgId = formData.get('orgId') as string

		const csvArray = await csv({ noheader: true, output: 'csv' }).fromString(await file.text())

		const blw = new Blw({ data: csvArray, file })
		const { uniqueIdString } = blw.getEvent()

		const duplicate = await prisma.event.findUnique({
			where: { uniqueIdString: uniqueIdString },
			select: { id: true }
		})

		if (duplicate) {
			throw redirect(
				`/import/update${url.search}&duplicate=1&eventId=${duplicate.id}`,
				{ type: 'error', message: 'Duplicate entry' },
				event
			)
		}

		await Populate({
			blw,
			userId: session.user.userId,
			orgId
		})

		throw redirect(300, `/events`)
	},

	update: async ({ request, locals }) => {
		const session = await locals.auth.validate()

		const formData: any = Object.fromEntries(await request.formData())
		const { org, file }: any = formData
		const csvArray = await csv({ noheader: true, output: 'csv' }).fromString(await file.text())

		const blw = new Blw({ data: csvArray, file })

		await Populate({
			blw,
			userId: session?.user.userId,
			orgId: org
		})

		throw redirect(300, `/events`)
	}
}
