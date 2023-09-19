<script lang="ts">
	import type { ColumnDef, SortDirection, TableOptions } from '@tanstack/svelte-table'
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel
	} from '@tanstack/svelte-table'
	import { Temporal } from '@js-temporal/polyfill'
	import { writable } from 'svelte/store'
	import AscSort from './ascSort.svelte'
	import Cell from './cell.svelte'
	import DscSort from './dscSort.svelte'
	import Empty from './empty.svelte'

	export let race
	export let results
	export let fleetName

	const notypecheck = (x: any) => x

	let columnVisibility

	const finishType = race.starts.map((start) => {
		if (start.fleet[1] === fleetName || start.fleet[5] === fleetName) {
			return start.finishType
		}
	})
	console.log('finishType: ', finishType)

	function calculateElapsed(start, finish, elapsed) {
		// if no elapsed and finishtype === "Finish Time"
		if (elapsed) return elapsed
		if (!start || !finish) return null

		const raceDate = race.date ?? Date.now().toString()

		// console.log('start: ', start)
		// console.log('finish: ', finish)
		const startArray = start.split(':')
		const startTime = Temporal.PlainTime.from({
			hour: startArray[0],
			minute: startArray[1],
			second: startArray[2]
		})
		const finishArray = finish.split(':')
		const finishTime = Temporal.PlainTime.from({
			hour: finishArray[0],
			minute: finishArray[1],
			second: finishArray[2]
		})

		const elapsedTime = startTime.until(finishTime)
		console.log('elapsedTime: ', elapsedTime.toString())

		if (!elapsed && finishType === 'Finish Time') {
			// turn start and finish into time codes and subtract
			return
		}
	}

	let resultRows = results.map((result) => {
		const elapsedTime = calculateElapsed(result.start, result.finish, result.elapsed)
		console.log('elapsedTime: ', elapsedTime)
		return {
			points: Number(result.points), // convert to number
			position: Number(result.position), // named place on table
			discard: Number(result.discard),
			rank: Number(result.Comp?.rank),
			total: Number(result.Comp?.total),
			nett: Number(result.Comp?.nett),
			finish: result.finish,
			elapsed: result.elasped,
			elapsedWin: result.elapsedWin,
			ratingWin: result.ratingWin,
			start: result.start,
			corrected: result.corrected,
			code: result.code,
			fleet: result.Comp?.fleet ?? result.Comp?.division,
			boat: result.Comp?.boat,
			skipper: result.Comp?.skipper ?? ''
		}
	})

	type Result = {
		points?: string
		rank?: string
		boat?: string
		skipper?: string
		code?: string
		start?: string
		finish?: string
		corrected?: string
		elapsed?: string
		elapsedWin: string
		ratingWin: string
		[key: string]: any
	}

	///////////////////////////////////////////////////////
	const columns: ColumnDef<Result>[] = [
		{
			header: `Points`,
			columns: [
				{
					accessorKey: 'rank',
					header: 'Rank',
					cell: (info) => flexRender(Cell, { info })
				},
				{
					accessorKey: 'points',
					header: 'Points',
					cell: (info) => flexRender(Cell, { info, discard: true })
				},
				{
					accessorKey: 'position',
					header: 'Place',
					cell: (info) => flexRender(Cell, { info })
				}
			]
		},
		{
			header: `Name`,
			columns: [
				{
					accessorKey: 'boat',
					header: 'Boat',
					cell: (info) => flexRender(Cell, { info, class: 'justify-start' })
				},
				{
					accessorKey: 'skipper',
					header: 'Skipper',
					cell: (info) => flexRender(Cell, { info, class: 'justify-start' })
				}
			]
		},
		{
			header: `Score`,
			columns: [
				{
					accessorKey: 'corrected',
					header: 'Corrected',
					cell: (info) => flexRender(Cell, { info, discard: true, useCode: true })
				},
				{
					accessorKey: 'elapsed',
					header: 'Elapsed',
					cell: (info) => flexRender(Cell, { info, discard: true, useCode: true })
				},
				{
					accessorKey: 'elapsedWin',
					header: 'elapsedWin',
					cell: (info) => flexRender(Cell, { info, discard: true, useCode: true })
				},
				{
					accessorKey: 'ratingWin',
					header: 'ratingWin',
					cell: (info) => flexRender(Cell, { info, discard: true, useCode: true })
				},
				{
					accessorKey: 'nett',
					header: 'Nett',
					cell: (info) => flexRender(Cell, { info, class: 'justify-start' })
				},
				{
					accessorKey: 'total',
					header: 'Total',
					cell: (info) => flexRender(Cell, { info, class: 'justify-start' })
				}
			]
		}
	]
	///////////////////////////////////////////////////////

	let sorting = [{ id: 'points', desc: false }]

	function getSortSymbol(isSorted: boolean | SortDirection) {
		return isSorted ? (isSorted === 'asc' ? AscSort : DscSort) : Empty
	}

	const setSorting = (updater) => {
		if (updater instanceof Function) {
			sorting = updater(sorting)
		} else {
			sorting = updater
		}

		options.update((old) => ({
			...old,
			state: {
				...old.state,
				sorting
			}
		}))
	}

	const options = writable<TableOptions<Result>>({
		data: resultRows,
		columns,
		state: {
			sorting,
			columnVisibility
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility
		// debugTable: true
	})

	function setColumnVisibility(updater) {
		if (updater instanceof Function) {
			columnVisibility = updater(columnVisibility)
		} else {
			columnVisibility = updater
		}

		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnVisibility
			}
		}))
	}

	function getResultColumns() {
		//
		const defaultColumns = {
			position: false,
			skipper: false,
			elapsed: false,
			elapsedWin: false,
			ratingWin: false,
			total: false,
			start: false,
			finish: false,
			nett: true
		}

		if (race?.resultColumns) {
			return { ...defaultColumns, ...race?.resultColumns }
		}
		// console.log('Event resultColumns: ', race?.Event)

		if (race?.Event?.resultColumns) {
			console.log('Event resultColumns: ', race?.Event?.resultColumns)
			return { ...defaultColumns, ...race?.Event?.resultColumns }
		}

		return defaultColumns
	}

	$: setColumnVisibility(getResultColumns())

	const table = createSvelteTable(options)
</script>

<div class="my-8">
	<div class="flex justify-between mb-4">
		<h2 class="text-4xl font-medium">{fleetName}</h2>

		<!-- <label for="my-modal-3" class="btn btn-active">view</label>
		<input type="checkbox" id="my-modal-3" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box relative">
				<label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
				<h3 class="text-lg font-bold">Choose View Options</h3>
				{#each $table.getAllLeafColumns() as column}
					<div class="px-1">
						<label class="label">
							<span class="label-text pr-1">{column.id.toLocaleUpperCase()}</span>
							<input
								type="checkbox"
								class="checkbox checkbox-xs"
								checked={column.getIsVisible()}
								on:change={column.getToggleVisibilityHandler()}
							/>
						</label>
					</div>
				{/each}
			</div>
		</div> -->
	</div>
	<table class="table table-zebra w-full mr-10">
		<thead>
			{#each $table.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header}
						<th colSpan={header.colSpan}>
							{#if !header.isPlaceholder}
								<button
									class:cursor-pointer={header.column.getCanSort()}
									class:select-none={header.column.getCanSort()}
									class="flex"
									on:click={header.column.getToggleSortingHandler()}
									on:keyup
								>
									<svelte:component
										this={notypecheck(
											flexRender(header.column.columnDef.header, header.getContext())
										)}
									/>
									<span class="pl-1">
										<svelte:component this={getSortSymbol(header.column.getIsSorted())} />
									</span>
								</button>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>
		<tbody>
			{#each $table.getRowModel().rows.slice(0, 10) as row}
				<tr>
					{#each row.getVisibleCells() as cell}
						<td>
							<svelte:component
								this={notypecheck(flexRender(cell.column.columnDef.cell, cell.getContext()))}
							/>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
		<tfoot>
			{#each $table.getFooterGroups() as footerGroup}
				<tr>
					{#each footerGroup.headers as header}
						<th colSpan={header.colSpan}>
							{#if !header.isPlaceholder}
								<svelte:component
									this={notypecheck(
										flexRender(header.column.columnDef.footer, header.getContext())
									)}
								/>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</tfoot>
	</table>
</div>
