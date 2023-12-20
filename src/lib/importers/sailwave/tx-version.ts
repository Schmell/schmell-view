import { prisma } from '$lib/server/prisma'
import { Prisma } from '@prisma/client'
import Blw, { type BLW } from './Blw'
import { fail, redirect } from '@sveltejs/kit'
import type { Result } from '$lib/schemas/generated/zod'

export async function CheckForDuplicates({ data, file }) {
	const blw = new Blw({ data, file })

	const event = blw.getEvent()

	const usid =
		event.name.split(' ').join('_') +
		'-' +
		event.eventeid +
		'-' +
		event.venueName!.split(' ').join('_')

	return await prisma.event.findUnique({
		where: { uniqueIdString: usid.toLowerCase() }
	})
}

export async function Populate({ blw, userId, orgId }) {
	////////////////////////////////////////////////////
	const event = blw.getEvent()
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
		//
		const { venueemail, venuewebsite, venueburgee, ...rest } = event

		const eventObj = {
			...rest,
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

	function racesUpsert() {
		const compList = blw.getComps().map((comp) => {
			// This is where we can join comps over multiple events
			return { compId: comp.compId }
			// return { uniqueCompId: comp.uniqueCompId }
		})

		return blw.getRaces(uniqueIdString).map((race) => {
			const { rank, ...rest } = race
			return {
				where: { uniqueRaceString: race.uniqueRaceString },
				update: { rank: Number(rank), ...rest },
				create: {
					rank: Number(rank),
					...rest,
					Comps: {
						connect: compList
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

	function compsUpset() {
		return blw.getComps().map((comp) => {
			// Comps need to get a uniqueId so we can re-use comps which allow for
			// Users to attach there profile to and also will let people follow
			return {
				// where: { uniqueCompId: comp.uniqueCompId },
				where: { compId: comp.compId },
				update: {
					// uniqueCompId: comp.uniqueCompId,
					club: comp.club,
					boat: comp.boat,
					skipper: comp.helmname,
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
					skipper: comp.helmname,
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

	function resultsUpsert() {
		return blw.getRaces(uniqueIdString).map((race) => {
			return blw.getResults(race.raceId).map((result) => {
				return {
					resultId: result.resultId,
					raceCompId: result.raceCompId,
					fleet: result.fleet,
					start: result.start,
					finish: result.finish,
					points: result.points,
					position: result.position,
					resultType: result.resultType,
					code: result.code,
					discard: result.discard,
					elasped: result.elasped,
					corrected: result.corrected,
					elapsedWin: result.elapsedWin,
					ratingWin: result.ratingWin,
					Comp: {
						connect: { compId: result.compId }
					},
					Race: {
						connect: { uniqueRaceString: race.uniqueRaceString }
					},
					Event: {
						connect: { uniqueIdString: event.uniqueIdString }
					},
					Publisher: {
						connect: { id: userId }
					}
				}
			})
		})
	}

	function compsCreate() {
		return blw.getComps().map((comp) => {
			// Comps need to get a uniqueId so we can re-use comps which allow for
			// Users to attach there profile to and also will let people follow
			return {
				data: {
					// uniqueCompId: comp.uniqueCompId,
					compId: comp.compId,
					club: comp.club,
					boat: comp.boat,
					sailno: comp.sailno,
					skipper: comp.helmname,
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

	function racesCreate() {
		const compList = blw.getComps().map((comp) => {
			// This is where we can join comps over multiple events
			return { compId: comp.compId }
			// return { uniqueCompId: comp.uniqueCompId }
		})

		return blw.getRaces(uniqueIdString).map((race) => {
			const { rank, ...rest } = race
			return {
				data: {
					rank: Number(rank),
					...rest,
					Comps: {
						connect: compList
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
		return blw.getRaces(uniqueIdString).map((race) => {
			return blw.getResults(race.raceId).map((result: Result) => {
				return {
					resultId: result.resultId,
					raceCompId: result.raceCompId,
					fleet: result.fleet,
					start: result.start,
					finish: result.finish,
					points: result.points,
					position: result.position,
					resultType: result.resultType,
					code: result.code,
					discard: result.discard,
					elasped: result.elasped,
					corrected: result.corrected,
					elapsedWin: result.elapsedWin,
					ratingWin: result.ratingWin,

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

	addTables()

	async function addTables() {
		// const event = eventCreate()
		const comps = compsCreate()
		const races = racesCreate()
		const resultsArray = resultsCreate()

		// console.log(resultsArray)

		try {
			await prisma.$transaction(
				async (tx) => {
					//
					console.log('Start import')
					console.time('time')

					const newEvent = await tx.event.upsert(eventCreate())
					console.timeLog('time', 'event comlpete')

					await Promise.all(
						await comps.map(async (comp) => {
							await tx.comp.create(comp)
						})
					)
					console.timeLog('time', 'comps complete')

					await Promise.all(
						await races.map(async (race) => {
							await tx.race.create(race)
						})
					)
					console.timeLog('time', 'races comlpete: ')

					// console.log('Waiting')
					// await new Promise((r) => setTimeout(r, 5000))
					// console.timeLog('time', 'Done timeout')
					//////////////////////////////////////
					await Promise.all(
						await resultsArray.map(async (results) => {
							await Promise.all(
								await results.map(async (result) => {
									const { raceCompId, ...rest } = result
									const uniqueRaceId = `${raceCompId}-${newEvent.id}`
									rest.resultId = uniqueRaceId
									try {
										await tx.result.upsert({
											where: { resultId: uniqueRaceId },
											update: { ...rest },
											create: { ...rest }
										})
									} catch (error: any) {
										if (error instanceof Prisma.PrismaClientKnownRequestError) {
											console.log(error.message)
											throw fail(500, { error: 'Big problem' })
										} else {
											console.log(error)
										}

										// console.log(rest.Comp)
									}
								})
							)
						})
					)
					console.timeLog('time', 'results complete ')
					console.timeEnd('time')
				},
				{
					isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
					maxWait: 10000 * 10, // default: 2000
					timeout: 20000 * 10 * 10 // default: 5000
				}
			)
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.log('Import Error: ', error.message)
			} else {
				console.log(error)
			}
			console.timeEnd('time')
			return {
				success: false
			}
		}

		return {
			success: true
		}
	}
} // populate
