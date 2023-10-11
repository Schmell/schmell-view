import { prisma } from '$lib/server/prisma'
import { fail } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { redirect } from 'sveltekit-flash-message/server'

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate()

	const getOrgs = async () => {
		try {
			return await prisma.organization.findMany({
				// where: { ownerId: session?.user.userId },
				include: { Owner: true }
			})
		} catch (error) {
			console.log('error: ', error)
			throw fail(500, { message: 'oh crap' })
		}
	}

	const orgs = await getOrgs()

	return {
		orgs
	}
}) satisfies PageServerLoad
