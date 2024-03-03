import type { PageServerLoad } from './$types'
import { prisma } from '$lib/server/prisma'

export const load = (async () => {
	return {}
}) satisfies PageServerLoad
