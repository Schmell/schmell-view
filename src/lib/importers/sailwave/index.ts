import { prisma } from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import Blw from './Blw';
import { Prisma } from '@prisma/client';

export async function CheckForDuplicates({ data, file }) {
	const blw = new Blw({ data, file });

	const event = blw.getEvent();

	const usid =
		event.name.split(' ').join('_') +
		'-' +
		event.eventeid +
		'-' +
		event.venueName.split(' ').join('_');

	return await prisma.event.findUnique({
		where: { uniqueIdString: usid.toLowerCase() }
	});
}

export async function Populate({ blw, userId, orgId }) {
	// if (!data) throw error(400, { message: 'Populate function requires data' });
	// const blw = new Blw({ data, file });
	const event = blw.getEvent();
	const { uniqueIdString } = event;

	function eventCreate() {
		//
		const { venueemail, venuewebsite, venueburgee, ...rest } = event;
		const eventObj = {
			...rest,

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
		};
		return {
			// data: upObj
			where: { uniqueIdString: uniqueIdString },
			update: {},
			create: eventObj
		};
	}

	function scoringSystem() {
		return blw.getScoring();
	}

	async function racesCreate() {
		const compList = await blw.getComps().map((comp) => {
			return { compId: comp.compId };
		});

		return await blw.getRaces(uniqueIdString).map((race) => {
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
			};
		});
	}

	async function compsCreate() {
		return await blw.getComps().map((comp) => {
			// need to connect event somehow, because a comp can have multiple events
			return {
				where: { compId: comp.compId },
				update: {
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
					compId: comp.compId,
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
					},
					Publisher: {
						connect: { id: userId }
					}
				}
			};
		});
	}

	async function resultsCreate() {
		// const races = blw.getComps()
		return blw.getRaces(uniqueIdString).map((race) => {
			return blw.getResults(race.raceId).map((result) => {
				//  Note convert to numbers
				// console.log('result: ', result);
				return {
					resultId: result.resultId,
					raceCompId: result.raceCompId,
					fleet: result.fleet,
					points: result.points,
					finish: result.finish,
					start: result.start,
					position: result.position,
					discard: result.discard,
					elasped: result.elasped,
					corrected: result.corrected,
					resultType: result.resultType,
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
				};
			});
		});
	}

	return addTables();

	async function addTables() {
		try {
			const comps = await compsCreate();
			const races = await racesCreate();
			const resultsArray = await resultsCreate();

			console.log('Start import');
			console.time('time');

			const newEvent = await prisma.event.upsert(eventCreate());

			console.timeLog('time', 'event comlpete: ');
			// console.log('scoringSystem(): ', scoringSystem());

			await Promise.allSettled(
				comps.map(async (comp) => {
					return await prisma.comp.upsert(comp);
				})
			);

			console.timeLog('time', 'comps complete');

			await Promise.allSettled(
				races.map(async (race) => {
					return await prisma.race.upsert(race);
				})
			);

			console.timeLog('time', 'races comlpete: ');
			// console.log('resultsArray: ', resultsArray);

			await Promise.allSettled(
				await resultsArray.map(async (results) => {
					await results.map(async (result) => {
						const { raceCompId, ...rest } = result;
						const uniqueRaceId = `${raceCompId}-${newEvent.id}`;
						rest.resultId = uniqueRaceId;
						// await prisma.result.create({ data: rest });
						await prisma.result.upsert({
							where: { resultId: uniqueRaceId },
							update: { ...rest },
							create: { ...rest }
						});
					});
				})
			);

			console.timeLog('time', 'results comlpete ');
			console.timeEnd('time');

			return {
				sucess: true
			};
			//
		} catch (error: any) {
			//
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				// Timeout error
				if (error.code === 'P2024') {
					console.log(error.meta?.cause);
					throw fail(500, { message: error.meta?.cause });
				}

				if (error.code === 'P2025') {
					console.log(error.meta?.cause);
					// throw fail(500, { message: error.meta?.cause });
					throw redirect(307, '/import');
				}

				console.log('Prisma Known Request Error: ', error);
				// throw redirect(307, '/import');
				throw fail(500, { message: error.meta?.cause });
			}

			console.log('Import Error: ', error);
			throw error(500, `Populate error: ${error}`);
		}
	}
} // populate
