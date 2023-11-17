import { prisma } from '$lib/server/prisma'
import { fail } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate()

	const getOrgs = async () => {
		try {
			return await prisma.organization.findMany({
				include: { Owner: { select: { id: true, username: true } } }
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
