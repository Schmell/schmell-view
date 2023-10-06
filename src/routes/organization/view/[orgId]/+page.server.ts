import { prisma } from '$lib/server/prisma'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	const getOrg = async () => {
		try {
			return await prisma.organization.findUniqueOrThrow({
				where: { id: params.orgId },
				include: {
					Events: {
						include: {
							Races: true,
							Organization: true,
							Comments: { include: { User: true } },
							Likes: true,
							Follows: true
						}
					},
					_count: { select: { Comments: true, Likes: true } },
					Comments: {
						select: {
							comment: true,
							id: true,
							type: true,
							User: true,
							Likes: true,

							_count: { select: { Likes: true } }
						}
					},
					Likes: true,
					Follows: true,
					Owner: true,
					Addresses: true
				}
			})
		} catch (error) {
			console.error('error: ', error)
		}
	}
	return {
		org: getOrg()
	}
}) satisfies PageServerLoad
