import { prisma } from '$lib/server/prisma'
import type { Actions, PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	const getComp = async () => {
		try {
			return await prisma.comp.findUniqueOrThrow({
				where: { id: params.compId },
				include: { Publisher: true }
			})
		} catch (error) {
			console.log('error: ', error)
		}
	}
	
	return {
		comp: await getComp()
	}
}) satisfies PageServerLoad

export const actions = {
	getEvents: async ({ locals, params, url }) => {
		async function getEvents() {
			try {
				return await prisma.comp.findUnique({
					where: { id: params.compId },
					select: {
						Events: {
							select: {
								id: true,
								name: true,
								eventwebsite: true,
								Races: {
									orderBy: { name: 'asc' },
									include: {
										Results: { where: { compId: params.compId } }
									}
								}
							}
						}
					}
				})
			} catch (error) {
				console.log('error: ', error)
				return {
					Events: [null]
				}
			}
		}
		// console.log(await getEvents())
		return {
			compEvents: await getEvents()
		}
	}
} satisfies Actions
