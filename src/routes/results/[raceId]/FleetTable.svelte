<script lang="ts">
	import type { Column, ColumnDef, SortDirection, TableOptions } from '@tanstack/svelte-table'
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
	import Icon from '@iconify/svelte'
	import { enhance } from '$app/forms'

	export let race
	export let results
	export let fleetName
	// $: console.log('results: ', results)

	const notypecheck = (x: any) => x

	let columnVisibility

	const finishType = race.starts.map((start) => {
		if (start.fleet[1] === fleetName || start.fleet[5] === fleetName) {
			return start.finishType
		}
	})
	// console.log('finishType: ', finishType)

	function getRaceDate() {
		if (!race.date) {
			return Temporal.Now.plainDateISO('Europe/London').toPlainDateTime()
		}
		const raceDateArray = race.date.split('/')
		return Temporal.PlainDate.from({
			day: raceDateArray[0],
			month: raceDateArray[1],
			year: raceDateArray[2]
		}).toPlainDateTime()
	}

	function calculateElapsed(start: string, finish: string, elapsed: string) {
		// console.log(start, finish, elapsed)
		if (elapsed) return elapsed
		if (!start || !finish) return null

		const raceDate = getRaceDate()

		const startArray = start.split(':')

		const startTime = raceDate.with({
			hour: Number(startArray[0]),
			minute: Number(startArray[1]),
			second: Number(startArray[2])
		})

		const finishArray = finish.split(':')

		const finishTime = raceDate.with({
			hour: Number(finishArray[0]),
			minute: Number(finishArray[1]),
			second: Number(finishArray[2])
		})

		const elapsedTime = startTime.until(finishTime)

		// Somtimes people will enter the results incorrectly ie: 12hr vs 24hr
		if (elapsedTime.total({ unit: 'minute' }) < 0) return 'ERROR'

		const rounded = Math.round(elapsedTime.total({ unit: 'minute' }) * 100) / 100

		function toHoursAndMinutes(totalMinutes) {
			const hours = Math.floor(totalMinutes / 60)
			const minutes = Math.floor(totalMinutes % 60)
			return `${hours}.${minutes} Hrs`
		}

		if (rounded > 60) {
			return toHoursAndMinutes(rounded)
		}

		return `${rounded} min`
	} // calculateElapsed

	let resultRows = results.map((result) => {
		// console.log(result.start, result.elapsed, result.Comp.boat)
		const elapsedTime = calculateElapsed(result.start, result.finish, result.elapsed)

		return {
			points: Number(result.points), // convert to number
			position: Number(result.position), // named place on table
			discard: Number(result.discard),
			rank: Number(result.Comp?.rank),
			total: Number(result.Comp?.total),
			nett: Number(result.Comp?.nett),
			finish: result.finish,
			elapsed: elapsedTime,
			elapsedWin: result.elapsedWin,
			ratingWin: result.ratingWin,
			start: result.start,
			corrected: result.corrected,
			code: result.code,
			fleet: result.Comp?.fleet ?? result.Comp?.division,
			compId: result.Comp?.id,
			boat: result.Comp?.boat,
			skipper: result.Comp?.skipper ?? '',
			rating: result.Comp.rating
		}
	}) // resultRows

	type Result = {
		points?: string
		rank?: string
		compId?: string
		boat?: string
		skipper?: string
		rating?: string
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
			header: `Name`,
			columns: [
				{
					accessorKey: 'boat',
					header: 'Boat',
					cell: (info) => flexRender(Cell, { info, useLink: true, class: 'justify-start' })
				},
				{
					accessorKey: 'skipper',
					header: 'Skipper',
					cell: (info) => flexRender(Cell, { info, class: 'justify-start' })
				},
				{
					accessorKey: 'sailno',
					header: 'SailNo',
					cell: (info) => flexRender(Cell, { info, class: 'justify-start' })
				},
				{
					accessorKey: 'rating',
					header: 'Rating',
					cell: (info) => flexRender(Cell, { info, class: 'justify-start' })
				}
			]
		},
		{
			header: `Score`,
			columns: [
				{
					accessorKey: 'points',
					header: 'Points',
					cell: (info) => flexRender(Cell, { info, discard: true, class: 'justify-start' })
				},
				{
					accessorKey: 'position',
					header: 'Place',
					cell: (info) => flexRender(Cell, { info, class: 'justify-start' })
				},
				{
					accessorKey: 'corrected',
					header: 'Corrected',
					cell: (info) =>
						flexRender(Cell, { info, discard: true, useCode: true, class: 'justify-start' })
				},
				{
					accessorKey: 'elapsed',
					header: 'Elapsed',
					cell: (info) =>
						flexRender(Cell, { info, discard: true, useCode: true, class: 'justify-start' })
				},
				{
					accessorKey: 'elapsedWin',
					header: 'elapsedWin',
					cell: (info) =>
						flexRender(Cell, { info, discard: true, useCode: true, class: 'justify-start' })
				},
				{
					accessorKey: 'ratingWin',
					header: 'ratingWin',
					cell: (info) =>
						flexRender(Cell, { info, discard: true, useCode: true, class: 'justify-start' })
				},
				{
					accessorKey: 'finish',
					header: 'Finish',
					cell: (info) =>
						flexRender(Cell, { info, discard: true, useCode: true, class: 'justify-start' })
				}
			]
		},
		{
			header: 'Overall',
			columns: [
				{
					accessorKey: 'rank',
					header: 'Rank',
					cell: (info) => flexRender(Cell, { info, class: 'justify-start' })
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
			points: true,
			position: false,
			skipper: false,
			rating: false,
			boat: true,
			sailno: false,
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

		if (race?.Event?.resultColumns) {
			return { ...defaultColumns, ...race?.Event?.resultColumns }
		}

		return defaultColumns
	}

	const options = writable<TableOptions<Result>>({
		data: resultRows,
		columns,
		state: {
			sorting,
			columnVisibility
		},
		enableRowSelection: true,
		// enableMultiRowSelection: false,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility
	})

	const table = createSvelteTable(options)

	$: setColumnVisibility(getResultColumns())
	// $: console.log(getResultColumns())

	function setGroupView(column: Column<Result, unknown>, accessor: string[]) {
		const accessorList = {}
		column.columns.forEach((col) => {
			if ([...accessor].includes(col.id)) {
				accessorList[col.id] = true
			} else {
				accessorList[col.id] = false
			}
		})

		setColumnVisibility({ ...columnVisibility, ...accessorList })
	}

	function isVisible(colString: string): boolean {
		const resCols = getResultColumns()
		return resCols[colString]
	}

	// const handleClick = () => {
	// 	const elem = document.activeElement as HTMLInputElement
	// 	if (elem) {
	// 		elem?.blur()
	// 	}
	// }

	//
</script>

<div class="w-fit mt-8 border-r-2 border-b-4 border-base-300 rounded-lg">
	<div
		class="flex justify-between items-center py-4 mb-2 px-2 bg-gradient-to-r from-base-200 to-base-300 rounded-t-lg shadow-lg"
	>
		<h2 class="text-4xl tracking-wide font-medium">{fleetName ?? 'Fleet'}</h2>
		<p class="pr-2">{race.name}</p>
	</div>

	<table class="table table-md table-zebra md:table-sm shadow-lg w-fit">
		<thead>
			{#each $table.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header}
						<th colSpan={header.colSpan}>
							{#if !header.isPlaceholder}
								<!--  -->
								{#if ['Overall', 'Name', 'Score'].includes(header.column.id)}
									<div class="dropdown">
										<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
										<label
											for=""
											tabindex="0"
											class="link link-hover decoration-none flex items-center gap-2"
										>
											<svelte:component
												this={flexRender(header.column.columnDef.header, header.getContext())}
											/>
											<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
										</label>
										<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
										<ul
											tabindex="0"
											class="p-2 w-32 shadow menu dropdown-content z-[1] bg-base-100 rounded-box"
										>
											{#if header.column.id === 'Overall'}
												<form
													method="post"
													use:enhance
													class="text-xs font-normal"
													on:change={({ currentTarget }) => {
														const formObj = Object.fromEntries(new FormData(currentTarget))
														setGroupView(header.column, Object.getOwnPropertyNames(formObj))
													}}
												>
													<label class="label">
														<span class="label-text">Rank</span>
														<input
															checked={isVisible('rank')}
															class="join-item checkbox checkbox-xs"
															type="checkbox"
															name="rank"
															aria-label="Overall Event Ranking"
														/>
													</label>

													<label class="label">
														<span class="label-text">Nett</span>
														<input
															checked={isVisible('nett')}
															class="join-item checkbox checkbox-xs"
															type="checkbox"
															name="nett"
															aria-label="Nett Overall Score"
														/>
													</label>

													<label class="label">
														<span class="label-text">Total</span>
														<input
															checked={isVisible('total')}
															class="join-item checkbox checkbox-xs"
															type="checkbox"
															name="total"
															aria-label="Overall total before drops"
														/>
													</label>
												</form>
											{:else if header.column.id === 'Name'}
												<form
													method="post"
													use:enhance
													class="text-xs font-normal"
													on:change={({ currentTarget }) => {
														const formObj = Object.fromEntries(new FormData(currentTarget))
														setGroupView(header.column, Object.getOwnPropertyNames(formObj))
													}}
												>
													<label class="label">
														<span class="label-text">Boat</span>
														<input
															checked={isVisible('boat')}
															class=" checkbox checkbox-xs"
															type="checkbox"
															name="boat"
															aria-label="Boat"
														/>
													</label>

													<label class="label">
														<span class="label-text">Skipper</span>
														<input
															checked={isVisible('skipper')}
															class=" checkbox checkbox-xs"
															type="checkbox"
															name="skipper"
															aria-label="Skipper"
														/>
													</label>

													<label class="label">
														<span class="label-text">Sail No.</span>
														<input
															checked={isVisible('sailno')}
															class=" checkbox checkbox-xs"
															type="checkbox"
															name="sailno"
															aria-label="Sail Number"
														/>
													</label>
													<label class="label">
														<span class="label-text">Rating</span>
														<input
															checked={isVisible('rating')}
															class=" checkbox checkbox-xs"
															type="checkbox"
															name="rating"
															aria-label="Rating"
														/>
													</label>
												</form>
											{:else if header.column.id === 'Score'}
												<form
													method="post"
													use:enhance
													class="text-xs font-normal"
													on:change={({ currentTarget }) => {
														const formObj = Object.fromEntries(new FormData(currentTarget))
														setGroupView(header.column, Object.getOwnPropertyNames(formObj))
													}}
												>
													<label class="label">
														<span class="label-text">Points</span>
														<input
															checked={isVisible('points')}
															class=" checkbox checkbox-xs"
															type="checkbox"
															name="points"
															aria-label="Points"
														/>
													</label>

													<label class="label">
														<span class="label-text">Corrected</span>

														<input
															checked={isVisible('corrected')}
															class=" checkbox checkbox-xs"
															type="checkbox"
															name="corrected"
															aria-label="Corrected"
														/>
													</label>

													<label class="label">
														<span class="label-text">Elapsed</span>
														<input
															checked={isVisible('elapsed')}
															class=" checkbox checkbox-xs"
															type="checkbox"
															name="elapsed"
															aria-label="Elapsed"
														/>
													</label>

													<label class="label">
														<span class="label-text">Rating Win</span>
														<input
															checked={isVisible('ratingWin')}
															class=" checkbox checkbox-xs"
															type="checkbox"
															name="ratingWin"
															aria-label="Rating Win"
														/>
													</label>

													<label class="label">
														<span class="label-text">Elapsed Win</span>
														<input
															checked={isVisible('elapsedWin')}
															class=" checkbox checkbox-xs"
															type="checkbox"
															name="elapsedWin"
															aria-label="Elapsed Win"
														/>
													</label>

													<label class="label">
														<span class="label-text">Finish</span>
														<input
															checked={isVisible('finish')}
															class=" checkbox checkbox-xs"
															type="checkbox"
															name="finish"
															aria-label="Finish"
														/>
													</label>
												</form>
											{/if}
										</ul>
									</div>
								{:else}
									<button
										class:cursor-pointer={header.column.getCanSort()}
										class:select-none={header.column.getCanSort()}
										class="flex"
										on:click={header.column.getToggleSortingHandler()}
										on:keyup
									>
										<svelte:component
											this={flexRender(header.column.columnDef.header, header.getContext())}
										/>
										<span class="pl-1">
											<svelte:component this={getSortSymbol(header.column.getIsSorted())} />
										</span>
									</button>
								{/if}
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>

		<!-- Body -->
		<tbody>
			{#each $table.getRowModel().rows as row, i}
				<tr
					on:click={() => {
						row.toggleSelected()
					}}
					class:selectedEven={row.getIsSelected() && i % 2 == 0}
					class:selectedOdd={row.getIsSelected() && !(i % 2 == 0)}
					class:odd={i % 2 == 0 && !row.getIsSelected()}
					class:even={!(i % 2 == 0) && !row.getIsSelected()}
				>
					{#each row.getVisibleCells() as cell}
						<td>
							<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
		<tfoot class="bg-gradient-to-r from-base-300 to-base-200 rounded-b-lg">
			{#each $table.getFooterGroups() as footerGroup}
				<tr>
					{#each footerGroup.headers as header}
						<th colSpan={header.colSpan}>
							{#if !header.isPlaceholder}
								<svelte:component
									this={flexRender(header.column.columnDef.footer, header.getContext())}
								/>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</tfoot>
	</table>
</div>

<style>
	.odd {
		@apply bg-base-100;
	}

	.even {
		@apply bg-base-200;
	}

	.selectedEven {
		@apply bg-info text-neutral-focus;
	}

	.selectedOdd {
		--tw-bg-opacity: 0.8 !important;
		background-color: hsl(var(--in) / var(--tw-bg-opacity)) !important;
		@apply text-neutral-focus;
	}
</style>
