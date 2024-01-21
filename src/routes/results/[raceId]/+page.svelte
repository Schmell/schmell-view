<script lang="ts">
	import { Page } from '$components/layout'
	import type { Comp, Result } from '@prisma/client'
	import type { PageData } from './$types'
	import FleetTable from './FleetTable.svelte'

	export let data: PageData

	// first step is turn the unique fleets if any in this race into an array
	function getUniqueFleetsArray() {
		return [
			...new Set(
				data.results?.map((item) => {
					if (item.Comp?.fleet) {
						return item.Comp?.fleet
					}
					return item.Comp?.division
				})
			)
		]
	}

	function getFleetResults(key) {
		return data.results?.filter((result) => {
			// console.log('result: ', result)
			if (result.Comp?.fleet) {
				return result.Comp?.fleet === key
			} else if (result.Comp?.division) {
				return result.Comp?.division === key
			}
			// if there is no fleet or division
			return result
		})
	}

	function fleetsTables() {
		let fleetsTables: (Result & {
			Comp: Comp | null
		})[] = []

		const unique = getUniqueFleetsArray()

		unique.forEach((uf) => {
			let fleetResults = getFleetResults(uf)
			if (fleetResults) fleetsTables.push(fleetResults as any)
		})
		console.log(fleetsTables)
		return fleetsTables
	}
</script>

<Page title={data.race?.Event?.name}>
	{#if !Number(data.race?.sailed)}
		<div class="bg-error w-full p-2 text-error-content rounded-md">This Race was not sailed</div>
	{:else}
		<div class="pt-2 flex flex-col items-center">
			{#each fleetsTables() as table}
				<FleetTable
					race={data.race}
					results={table}
					fleetName={table[0].Comp?.fleet ?? table[0].Comp?.division}
				/>
			{/each}
		</div>
	{/if}
</Page>
