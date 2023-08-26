import { prisma } from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import Blw from './Blw';
import { setFlash } from 'sveltekit-flash-message/server';
import { Prisma } from '@prisma/client';
import { importState } from '$lib/stores';
// import { messages } from '$lib/stores/messages'
// import { Prisma } from '@prisma/client'

interface CreateEventProps {
	data: any;
	userId: string;
	file: any;
	orgId: string;
}

export async function CheckForDuplicates({ data, userId, file, orgId }) {
	const blw = new Blw({ data, file });
	const event = blw.getEvent();
	const usid =
		event.name.split(' ').join('_') +
		'-' +
		event.eventeid +
		'-' +
		event.venueName.split(' ').join('_');

	return await prisma.event.findUnique({
		where: { uniqueIdString: usid }
	});
}

export function CreateEvent({ data, userId, file, orgId }: CreateEventProps) {
	// use prisma create here..
	// but can we still connect??
	// figure out a way to unique -ish comps
}

export async function Populate({ data, userId, file, orgId }) {
	if (!data) throw error(400, { message: 'Populate function requires data' });

	// Make new Blw class
	const blw = new Blw({ data, file });
	const event = blw.getEvent();
	const { eventeid, uniqueIdString } = event;
	const blwComps = blw.getComps();

	function eventCreate() {
		// console.log('userId: ', userId);
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

	async function racesCreate() {
		const compList = await blwComps.map((comp) => {
			return { compId: comp.compId };
		});

		return await blw.getRaces(uniqueIdString).map((race) => {
			return {
				where: { uniqueRaceString: race.uniqueRaceString },
				update: {},
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
				// console.log('result.compId: ', result.compId)
				// console.log('race.uniqueRaceString: ', race.uniqueRaceString)
				//  Note convert to numbers
				return {
					resultId: result.resultId,
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
			console.time('time: ');

			await prisma.event.upsert(eventCreate());

			console.timeLog('time: ', 'event comlpete: ');

			await Promise.allSettled(
				comps.map(async (comp) => {
					return await prisma.comp.upsert(comp);
				})
			);

			console.timeLog('time: ', 'comps complete');

			await Promise.allSettled(
				races.map(async (race) => {
					return await prisma.race.upsert(race);
				})
			);

			console.timeLog('time: ', 'races comlpete: ');

			await Promise.all(
				await resultsArray.map(async (results) => {
					await results.map(async (result) => {
						await prisma.result.create({ data: result });
					});
				})
			);

			console.timeLog('time: ', 'results comlpete ');
			console.timeEnd('time: ');
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
					throw fail(500, { message: error.meta?.cause });
				}

				console.log('Prisma Known Request Error: ', error);
				throw fail(500, { message: error.meta?.cause });
			}

			console.log('Import Error: ', error);
			throw error(500, `Populate error: ${error}`);
		}
	}
} // populate
