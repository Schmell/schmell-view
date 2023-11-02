import { error, fail } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
import type { PageServerLoad } from './$types'

export const load = (async ({ url }) => {
	const skip = url.searchParams.get('skip')
	const take = url.searchParams.get('take')
	const whereType = url.searchParams.get('whereType')
	const whereId = url.searchParams.get('whereId')
	const title = url.searchParams.get('title')

	function getWhere() {
		if (whereType && whereId) {
			const where = {}
			where[whereType] = whereId
			return where
		}
		return {}
	}

	function sort() {
		let sort = {}
		const sortBy: any = url.searchParams.get('sortBy') ?? 'createdAt'
		const sortOrder = url.searchParams.get('sortOrder') ?? 'asc'
		if (sortBy === 'org') {
			return { Organization: { name: 'asc' } }
		} else if (sortBy === 'venue') {
			return { Venue: { name: 'asc' } }
		} else if (sortBy === 'event') {
			return { Event: { name: 'asc' } }
		} else {
			sort[sortBy] = sortOrder
			return sort
		}
	}

	async function getRaces() {
		try {
			return await prisma.$transaction([
				prisma.race.findMany({
					where: getWhere(),
					orderBy: sort(),
					include: {
						Event: {
							select: {
								id: true,
								name: true,
								Venue: { select: { id: true, name: true } },
								Organization: { select: { id: true, name: true } }
							}
						}
					},
					skip: Number(skip ?? 0),
					take: Number(take ?? 10)
				}),
				prisma.race.count({ where: getWhere() })
			])
		} catch (error: any) {
			console.log('error: ', error)
			throw fail(500, { message: 'Get event Fail', error: error.message })

			// return null
			// throw error(400, { message: 'Something went wrong', error })
		}
	}
	const [races, count] = await getRaces()
	return {
		count,
		title,
		races
	}
}) satisfies PageServerLoad
