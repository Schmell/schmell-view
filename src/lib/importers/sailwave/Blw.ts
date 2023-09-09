import { createId } from '@paralleldrive/cuid2'
import { formatTime } from '../../utils/formatters'

export default class Blw {
	data: any

	constructor(props) {
		this.data = props.data
		this.data.cuid = createId()
	}

	getComps() {
		const compData: any = []
		const compBoats = this.data.filter((item: any) => {
			return item[0] === 'comphigh'
		})
		compBoats.sort().forEach((compBoat: any) => {
			let competitor: any = {
				compId: '',
				uniqueCompId: ''
			}

			competitor.compId = `${compBoat[2]}-${this.data.cuid}`
			// also need a uniqueCompId for connecting comps to users
			competitor.uniqueCompId = `${competitor.boat}_${competitor.skipper}_${competitor.club}`
			let compRows = this.data.filter((item: any) => {
				if (!item[0]) {
					console.log('item: ', item)
				}
				var regex = new RegExp(`^comp`, 'g')
				return item[0].match(regex) && item[2] === compBoat[2]
			})
			compRows.forEach((item: any) => {
				const newName = item[0].replace('comp', '')
				competitor[newName] = item[1] ?? ''
			})
			compData.push(competitor)
		}) //each compBoats
		// const sorted = compData!.sort((a: any, b: any) => {
		// 	return a.boat - b.boat;
		// });

		// return sorted;
		return compData
	} // getComps

	getResults(raceId) {
		// const data = await this.getFileData()
		const resultsArr: any = []
		// use rdisc to get an individuals result
		const results = this.data.filter((item: any) => {
			return item[0] === 'rdisc' && item[3] === raceId
		})

		results.forEach((result: any) => {
			// Results in blw file have no prefix to speak of (just an r)
			// So we need to find each row individually
			const resultRow = {
				// resultId: `${result[3]}-${result[2]}-${this.data.cuid}`,
				raceCompId: `${result[3]}-${result[2]}`,
				compId: `${result[2]}-${this.data.cuid}`,

				finish: this.resultHelp('rft', this.data, result),
				start: this.resultHelp('rst', this.data, result),
				points: this.resultHelp('rpts', this.data, result),
				position: this.resultHelp('rpos', this.data, result),
				discard: this.resultHelp('rdisc', this.data, result),
				corrected: this.resultHelp('rcor', this.data, result),
				resultType: this.resultHelp('rrestyp', this.data, result),
				code: this.resultHelp('rcod', this.data, result),
				elapsed: this.resultHelp('rele', this.data, result),
				supposedRating: this.resultHelp('srat', this.data, result),
				elapsedWin: this.resultHelp('rewin', this.data, result),
				ratingWin: this.resultHelp('rrwin', this.data, result),
				rrset: this.resultHelp('rrset', this.data, result),
				recordedPosition: this.resultHelp('rrecpos', this.data, result),
				raceRating: this.resultHelp('rrat', this.data, result)
			}

			resultsArr.push(resultRow)
		}) // forEach

		return resultsArr
	} // getResults

	resultHelp(resultTag: string, data: any[], result: any[] | number) {
		let res = data.filter((item) => {
			return item[0] === resultTag && item[2] === result[2] && item[3] === result[3]
		})

		if (res[0]) {
			return res[0][1]
		} else {
			return ''
		}
	}

	// I don't think i use this // each race has fleets
	getFleets() {
		// Maybe need this to check against the race fleets?
		var fleetsRaw: any[] = this.data.filter((item: any) => {
			return item[0] === 'serpubgroupvalues'
		})
		var fleets = fleetsRaw[0][1].match(/[^|]+/g)

		return fleets
	}

	getRaces(uniqueIdString: string) {
		// new object to be returned
		let raceData: any = []

		// Find all raceids by getting known csv row
		const races = this.data.filter((item: any) => {
			return item[0] === 'racerank'
		})

		// For each race push data to new object
		races.forEach((race: any) => {
			let raceObj = {
				raceId: '',
				uniqueRaceString: '',
				starts: '',
				name: '',
				rank: ''
			}

			raceObj.raceId = race[3]

			// need to get eventeid
			raceObj.uniqueRaceString = uniqueIdString + '_' + race[3]

			let resultRows = this.data.filter((item: any) => {
				var regex = new RegExp(`^race`, 'g')
				return item[0].match(regex) && item[3] === race[3]
			})

			let raceStarts: any = []

			resultRows.forEach((item) => {
				// Format the starts to object
				if (item[0] === 'racestart') {
					const racestartString = item[1].split('|')

					let fleet = racestartString[0].split('^')

					let start = racestartString[1]

					let finishType = racestartString[2] ?? ''
					let startName = racestartString[3] ?? ''
					let raceDistance = racestartString[4] ?? ''
					let course = racestartString[9] ?? ''
					let avgWind = racestartString[10] ?? ''
					let windDir = racestartString[4] ?? ''
					// remove the undefined
					if (!fleet) fleet = 'none'

					// This will stop undefined or null
					try {
						start = formatTime(start)
					} catch {
						start = ''
					}

					raceStarts.push({
						fleet,
						start,
						finishType,
						startName,
						raceDistance,
						course,
						avgWind,
						windDir
					})
				} else {
					// not racestart so just add to raceObj
					const property = item[0].replace('race', '')

					raceObj[property] = item[1]
				}
			}) // resultRows.forEach

			// now add the starts to raceObj
			raceStarts.forEach((start: any) => {
				raceObj.starts = raceStarts
			})

			if (!raceObj.name) {
				raceObj.name = `Race ${raceObj.rank}`
			}

			raceData.push(raceObj)
		})

		return raceData
	} // getRaces

	getEvent() {
		const eventRows = this.data.filter((item: any) => {
			if (item[0]) {
				const regex = new RegExp(`^ser`, 'g')
				return item[0].match(regex)
			}
			//
		})

		let eventObj: any = {
			event: '',
			eventwebsite: '',
			venue: '',
			eventeid: '',
			rest: {}
		}

		eventRows.forEach((item) => {
			const property = item[0].replace('ser', '')
			eventObj[property] = item[1]
		})

		const { event, eventwebsite, venue, eventeid, ...rest } = eventObj

		const uniqueIdString =
			event.toLowerCase().trim().split(' ').join('_') +
			'-' +
			eventeid +
			'-' +
			venue.toLowerCase().trim().split(' ').join('_')

		return {
			name: event,
			eventwebsite,
			uniqueIdString,
			venueName: venue,
			eventeid: eventeid,
			venueemail: rest.venueemail,
			venuewebsite: rest.venuewebsite,
			venueburgee: rest.venueburgee,
			rest
		}
	} // getEvent()

	getScoring() {
		// THIS CAN BE INDIVIDUALLY APPLIED TO A FLEET,
		// But not always which will make it hard
		// it looks like the modifidied has a scrparent
		// and a 1 in the [1] position in the array

		const rows = this.data.filter((item: any) => {
			const regex = new RegExp(`^scr`, 'g')
			return item[0].match(regex)
		})

		let obj: any = {}

		rows.forEach((item) => {
			const property = item[0].replace('scr', '')
			obj[property] = item[1]
		})

		// console.log('Scoring rows: ', rows);

		const { ratingsystem, ratsysa, ratsysb, ...rest } = obj

		return {
			ratingsystem,
			ratsysa,
			ratsysb,
			rest
		}
	}
} // Blw
