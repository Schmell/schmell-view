import { prisma } from '$lib/server/prisma'
import Blw from './Blw'

export async function CheckForDuplicates({ data, file }) {
	const blw = new Blw({ data, file })

	const event = blw.getEvent()

	const usid =
		event.name.split(' ').join('_') +
		'-' +
		event.eventeid +
		'-' +
		event.venueName.split(' ').join('_')

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

	function racesCreate() {
		const compList = blw.getComps().map((comp) => {
			// This is where we can join comps over multiple events
			return { compId: comp.compId }
			// return { uniqueCompId: comp.uniqueCompId }
		})

		return blw.getRaces(uniqueIdString).map((race) => {
			return {
				where: { uniqueRaceString: race.uniqueRaceString },
				update: { ...race },
				create: {
					...race,
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

	function compsCreate() {
		return blw.getComps().map((comp) => {
			// Comps need to get a uniqueId so we can re-use comps which allow for
			// Users to attach there profile to and also will let people follow
			return {
				// where: { uniqueCompId: comp.uniqueCompId },
				where: { compId: comp.compId },
				update: {
					club: comp.club,
					boat: comp.boat,
					skipper: comp.helmname,
					// uniqueCompId: comp.uniqueCompId,
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
					compId: comp.compId,
					club: comp.club,
					boat: comp.boat,
					sailno: comp.sailno,
					skipper: comp.helmname,
					// uniqueCompId: comp.uniqueCompId,
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

	function resultsCreate() {
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
		const comps = await compsCreate()
		const races = await racesCreate()
		const resultsArray = await resultsCreate()

		console.log('Start import')
		console.time('time')

		const newEvent = await prisma.event.upsert(eventCreate())

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
			await resultsArray.map(async (results) => {
				await results.map(async (result) => {
					const { raceCompId, ...rest } = result

					const uniqueRaceId = `${raceCompId}-${newEvent.id}`

					rest.resultId = uniqueRaceId
					try {
						return await prisma.result.upsert({
							where: { resultId: uniqueRaceId },
							update: { ...rest },
							create: { ...rest }
						})
					} catch (e) {
						return null
					}
				})
			})
		)

		console.timeLog('time', 'results comlpete ')
		console.timeEnd('time')

		return {
			sucess: true
		}
	}
} // populate
