import { prisma } from '$lib/server/prisma'
import { fail } from '@sveltejs/kit'
import Blw, { type BLW, type IBlw } from './Blw'
import type { Result } from '$lib/schemas/generated/zod'
import { Prisma } from '@prisma/client'

export async function CheckForDuplicates({ data, file }) {
	const blw = new Blw({ data, file })

	const event = blw.getEvent()

	function getUsid() {
		const name = event.name.split(' ').join('_').toLowerCase()
		const venue = event.venueName.split(' ').join('_').toLowerCase()
		return `${name}-${event.eventeid}-${venue}`
	}

	const usid =
		event.name.split(' ').join('_') +
		'-' +
		event.eventeid +
		'-' +
		event.venueName.split(' ').join('_')

	return await prisma.event.findUnique({
		where: { uniqueIdString: getUsid() }
	})
}

type PopulateProps = {
	blw: IBlw
	userId: string
	orgId: string
}

export async function Populate({ blw, userId, orgId }) {
	////////////////////////////////////////////////////
	// Need file info
	const event = blw.getEvent()
	console.log(event.fileInfo)
	const { uniqueIdString } = event

	function eventCreate() {
		const resultColumns = {
			rank: true,
			points: true,
			position: false,
			skipper: false,
			boat: true,
			sailno: false,
			finish: false,
			corrected: true,
			elapsed: false,
			nett: true,
			total: false
		}

		const { venueemail, venuewebsite, venueburgee } = event.rest as any

		const eventObj = {
			...event,
			resultColumns,

			Publisher: {
				connect: { id: userId }
			},
			Organization: {
				connect: { id: orgId }
			},
			Venue: {
				connectOrCreate: {
					where: { name: event.venueName },
					create: {
						name: event.venueName,
						email: venueemail,
						website: venuewebsite,
						burgee: venueburgee,
						Publisher: { connect: { id: userId } }
					}
				}
			}
		}

		return {
			where: { uniqueIdString: uniqueIdString },
			update: {},
			create: eventObj
		}
	}

	// Use the compsCreate call to getComps to make an array of Id's
	// Need this array for createRaces // This seems to speed things up?
	let compsIdArray: { compId: string }[] = []

	function compsCreate() {
		return blw.getComps().map((comp) => {
			compsIdArray.push({ compId: comp.compId })
			// Comps need to get a uniqueId so we can re-use comps which allow for
			// Users to attach there profile to and also will let people follow
			return {
				where: { compId: comp.compId },
				update: {
					club: comp.club,
					boat: comp.boat,
					skipper: comp.skipper,
					fleet: comp.fleet,
					division: comp.division,
					rank: comp.rank,
					nett: comp.nett,
					total: comp.total,
					rating: comp.rating,
					rest: comp,
					Events: {
						connect: [{ uniqueIdString: uniqueIdString }]
					}
				},

				create: {
					// uniqueCompId: comp.uniqueCompId,
					compId: comp.compId,
					club: comp.club,
					boat: comp.boat,
					sailno: comp.sailno,
					skipper: comp.skipper,
					fleet: comp.fleet,
					division: comp.division,
					rank: comp.rank,
					nett: comp.nett,
					total: comp.total,
					rating: comp.rating,
					rest: comp,
					Events: {
						connect: [{ uniqueIdString: uniqueIdString }]
					},
					Publisher: {
						connect: { id: userId }
					}
				}
			}
		})
	}

	let racesArray: { raceId: string; uniqueRaceString: string }[] = []

	function racesCreate() {
		//
		return blw.getRaces(uniqueIdString).map((race) => {
			const { rank, ...rest } = race
			if (!race.raceId) return
			// Need this array for results
			racesArray.push({ raceId: race.raceId, uniqueRaceString: race.uniqueRaceString })
			return {
				where: { uniqueRaceString: race.uniqueRaceString },
				update: { rank: Number(rank), ...rest },
				create: {
					rank: Number(rank),
					...rest,
					Comps: {
						connect: compsIdArray
					},
					Event: {
						connect: { uniqueIdString: uniqueIdString }
					},
					Publisher: {
						connect: { id: userId }
					}
				}
			}
		})
	}

	function resultsCreate() {
		return racesArray.map((race) => {
			return blw.getResults(race.raceId).map((result) => {
				return {
					resultId: result.resultId,
					raceCompId: result.raceCompId,
					fleet: result.fleet,
					points: result.points,
					position: result.position,
					start: result.start,
					finish: result.finish,
					elapsed: result.elapsed,
					corrected: result.corrected,
					elapsedWin: result.elapsedWin,
					ratingWin: result.ratingWin,
					resultType: result.resultType,
					code: result.code,
					discard: result.discard,
					Publisher: {
						connect: { id: userId }
					},
					Event: {
						connect: { uniqueIdString: event.uniqueIdString }
					},
					Comp: {
						connect: { compId: result.compId }
					},
					Race: {
						connect: { uniqueRaceString: race.uniqueRaceString }
					}
				}
			})
		})
	}

	function scoringSystem() {
		return blw.getScoring()
	}

	return addTables()

	async function addTables() {
		const comps = compsCreate()
		const races = racesCreate()
		const resultsArray = resultsCreate()

		console.log('Start import')
		console.time('time')

		// Need to change this to a transaction

		// return prisma.$transaction(async (tx) => {

		const { id: newEventId } = await prisma.event.upsert(eventCreate())

		console.timeLog('time', 'event comlpete: ')

		await Promise.all(
			comps.map(async (comp) => {
				return await prisma.comp.upsert(comp)
			})
		)

		console.timeLog('time', 'comps complete')

		await Promise.all(
			races.map(async (race) => {
				return await prisma.race.upsert(race)
			})
		)

		console.timeLog('time', 'races comlpete: ')

		await Promise.all(
			resultsArray.map(async (results: Result[]) => {
				results.map(async (result: Result) => {
					const uniqueRaceId = `${result.raceCompId}-${newEventId}`
					result.resultId = uniqueRaceId
					// console.log(result)
					try {
						return await prisma.result.upsert({
							where: { resultId: uniqueRaceId },
							update: { ...result },
							create: { ...result }
						})
					} catch (e: any) {
						if (e instanceof Prisma.PrismaClientKnownRequestError) {
							// console.log(result)
							console.log(e.message)
						}
						return fail(400, { message: ' Damn' })
					}
				})
			})
		)

		console.timeLog('time', 'results comlpete ')
		console.timeEnd('time')

		return {
			success: true
		}
	}
} // populate
