import type { Event, Race, Result } from '$lib/schemas/generated/zod'
import type { Comp } from '$lib/schemas/generated/zod/modelSchema/CompSchema'
import { createId } from '@paralleldrive/cuid2'
import { formatTime } from '../../utils/formatters'

export default class Blw {
	data: any
	file: File

	constructor(props: { data: any; file: File }) {
		this.data = props.data
		this.file = props.file
		this.data.cuid = createId()
	}

	getComps() {
		const compData: Comp[] = []

		const compBoats = this.data.filter((item: string[]) => {
			return item[0] === 'comphigh'
		})

		compBoats.sort().forEach((compBoat: any) => {
			let competitor: any = {
				compId: ''
				// uniqueCompId: ''
			}

			competitor.compId = `${compBoat[2]}-${this.data.cuid}`
			// also need a uniqueCompId for connecting comps to users

			let compRows = this.data.filter((item: any) => {
				if (!item[0]) return false

				var regex = new RegExp(`^comp`, 'g')
				return item[0].match(regex) && item[2] === compBoat[2]
			})

			compRows.forEach((item: any) => {
				let newName = item[0].replace('comp', '')
				// for older files
				if (newName === 'tot') newName = 'total'
				if (newName === 'pts') newName = 'nett'
				if (newName === 'pos') newName = 'rank'
				competitor[newName] = item[1] ?? ''
			})

			compData.push(competitor)
		}) //each compBoats

		return compData
	} // getComps

	getResults(raceId: string) {
		const resultsArr: any = []
		// use rdisc to get an individuals result
		const results = this.data.filter((item: string[]) => {
			return item[0] === 'rdisc' && item[3] === raceId
		})

		results.forEach((result: string[]) => {
			// Results in blw file have no prefix to speak of (just an r)
			// So we need to find each row individually
			// Maybe should check for no results
			// remove comps with id 0
			if (result[2] === '0') return

			// i think the secrect here is to function each to check for value
			const resultRow = {
				raceCompId: `${result[3]}-${result[2]}`,
				compId: `${result[2]}-${this.data.cuid}`,
				finish: this.resultHelp('rft', result) ?? '',
				start: this.resultHelp('rst', result) ?? '',
				points: this.resultHelp('rpts', result) ?? '',
				position: this.resultHelp('rpos', result) ?? '',
				discard: this.resultHelp('rdisc', result) ?? '',
				corrected: this.resultHelp('rcor', result) ?? '',
				resultType: this.resultHelp('rrestyp', result) ?? '',
				code: this.resultHelp('rcod', result) ?? '',
				elapsed: this.resultHelp('rele', result) ?? '',
				supposedRating: this.resultHelp('srat', result) ?? '',
				elapsedWin: this.resultHelp('rewin', result) ?? '',
				ratingWin: this.resultHelp('rrwin', result) ?? '',
				rrset: this.resultHelp('rrset', result) ?? '',
				recordedPosition: this.resultHelp('rrecpos', result) ?? '',
				raceRating: this.resultHelp('rrat', result) ?? ''
			}

			resultsArr.push(resultRow)
		}) // forEach

		return resultsArr
	} // getResults

	// i think this can be more efficient
	resultHelp(resultTag: string, result: any[] | number) {
		const res = this.data.filter((item: string[]) => {
			return item[0] === resultTag && item[2] === result[2] && item[3] === result[3]
		})
		// hmmm. what does this actually check for?
		if (res[0]) {
			return res[0][1]
		} else {
			return null
		}
	}

	getRacesIds(uniqueIdString: string) {}

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
				if (!item[0]) return false
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
			raceStarts.forEach(() => {
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
			if (!item[0]) return false
			const regex = new RegExp(`^ser`, 'g')
			return item[0].match(regex)
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

		const uniqueIdString = this.file?.name.toLowerCase().trim().split(' ').join('_')
		'-' + eventeid + '-' + event.toLowerCase().trim().split(' ').join('_')

		const name = event.length > 1 ? event : this.file?.name

		return {
			name,
			eventwebsite,
			uniqueIdString,
			venueName: venue,
			eventeid: eventeid,
			fileInfo: {
				name: this.file?.name,
				lastModified: this.file?.lastModified,
				size: this.file?.size,
				type: this.file?.type
			},
			rest
		}
	} // getEvent()

	getScoring() {
		// THIS CAN BE INDIVIDUALLY APPLIED TO A FLEET,
		// But not always which will make it hard
		// it looks like the modifidied has a scrparent
		// and a 1 in the [1] position in the array

		const rows = this.data.filter((item: any) => {
			if (!item[0]) return false
			const regex = new RegExp(`^scr`, 'g')
			return item[0].match(regex)
		})

		let obj: any = {}

		rows.forEach((item) => {
			const property = item[0].replace('scr', '')
			obj[property] = item[1]
		})

		const { ratingsystem, ratsysa, ratsysb, ...rest } = obj

		return {
			ratingsystem,
			ratsysa,
			ratsysb,
			rest
		}
	}
} // Blw

export interface IBlw {
	data: any
	file: File
	getEvent: () => Event
	getComps: () => Comp[]
	getRaces: (uniqueIdString: string) => Race[]
	getResults: (raceId: string | null) => Result[]
	getScoring: () => any
}
// export
export type BLW = typeof Blw
