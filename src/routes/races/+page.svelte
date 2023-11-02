<script lang="ts">
	import { ItemCard, Page } from '$components/layout'
	import { page } from '$app/stores'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'
	import { createPagination } from '@melt-ui/svelte'
	import { goto } from '$app/navigation'

	export let data: PageData
	$: ({ races } = data)

	let pageSize = 10

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages, range, page: currentPage }
	} = createPagination({
		count: data.count,
		perPage: pageSize,
		defaultPage: 1,
		siblingCount: 1
	})

	function excludePaginationSearchParams() {
		$page.url.searchParams.delete('skip')
		$page.url.searchParams.delete('take')
		return $page.url.searchParams.toString()
	}

	function excludeSortSearchParams() {
		$page.url.searchParams.delete('sortBy')
		$page.url.searchParams.delete('sortOrder')
		return $page.url.searchParams.toString()
	}

	function excludeWhereSearchParams() {
		$page.url.searchParams.delete('whereType')
		$page.url.searchParams.delete('whereId')
		return $page.url.searchParams.toString()
	}
</script>

<Page title={data.title ?? 'All Races'}>
	{#if !races}
		<div>No races</div>
	{:else}
		{#each races as race}
			<ItemCard title={race.name} href="">
				<div slot="top-right">
					<a href="/results/{race.id}" class="btn btn-accent btn-xs">View Results</a>
				</div>

				<div slot="bottom-right" class="text-primary">
					<div class="flex justify-end">
						<div class="tooltip tooltip-top" data-tip="View Competitors">
							<a href="/comps/{race?.id}" class="btn btn-ghost p-1">
								<Icon icon="material-symbols:groups-outline-rounded" width="30" />
							</a>
						</div>

						{#if data.user?.userId === race?.publisherId}
							<div class="tooltip tooltip-top" data-tip="Race Edit">
								<a href="/event/{race?.id}" class="btn btn-ghost">
									<Icon icon="material-symbols:edit-outline" width="24" />
								</a>
							</div>
						{/if}
					</div>
					<span class="px-2 text-xs text-secondary">
						{#if race.createdAt}
							{race.createdAt.toLocaleDateString()}
						{:else}
							No time provided
						{/if}
					</span>
				</div>

				{#if race.notes}
					<div class="text-xs text-primary-focus underline">Notes:</div>
					<div class="px-2 pb-4">
						{race.notes}
					</div>
				{:else}
					<div class="opacity-0 select-none">I</div>
				{/if}

				<div class="flex justify-between items-center">
					<div
						class="badge"
						class:badge-success={race.sailed === '1'}
						class:text-success-content={race.sailed === '1'}
						class:badge-error={race.sailed === '0'}
						class:text-error-content={race.sailed === '0'}
					>
						{race.sailed === '1' ? 'Complete' : 'Un-Sailed'}
					</div>

					<div class="p-2 text-sm pr-6">
						{race.date ? race.date : 'TBA'} - {race.time ? race.time : ''}
					</div>
				</div>

				<div slot="bottom-left" class="relative">
					<!-- <div class="absolute"> -->
					<!-- {#if $page.url.searchParams.get('sortBy')} -->
					<div class="text-base-content px-4 text-sm">
						<a href="/events/{race.Event?.id}" class="flex gap-2 items-center">
							<Icon icon="mdi:calendar-blank" />
							<div class="line-clamp-1">{@html race.Event?.name}</div>
						</a>
						<a href="/organization/{race.Event?.Organization?.id}" class="flex gap-2 items-center">
							<Icon icon="clarity:organization-solid" />
							<div class="line-clamp-1">{@html race.Event?.Organization?.name}</div>
						</a>
						<a href="/venue/{race.Event?.Venue?.id}" class="flex gap-2 items-center">
							<Icon icon="mdi:map-marker" />
							<div class="line-clamp-1">{@html race.Event?.Venue?.name}</div>
						</a>
					</div>
				</div>
			</ItemCard>
		{/each}

		<!-- Pagination -->
		{#if data.count > pageSize}
			<div class="divider" />
			<nav {...$root} use:root class="">
				<p class="flex justify-center text-sm">Showing items {$range.start} - {$range.end}</p>
				<div class=" join flex justify-center">
					<button
						on:click={() => {
							goto(
								`/races?take=${pageSize}&skip=${pageSize - $range.start}
								&${excludePaginationSearchParams()}`
							)
						}}
						{...$prevButton}
						use:prevButton
						class="join-item btn btn-xs"
					>
						<Icon icon="mdi:chevron-left" />
					</button>
					{#each $pages as page, idx}
						{#if page.type === 'ellipsis'}
							<span>...</span>
						{:else}
							<a
								href="/races?take={pageSize}&skip={pageSize * idx}
									&{excludePaginationSearchParams()}"
								{...$pageTrigger(page)}
								use:pageTrigger
								class="join-item btn btn-xs"
								class:btn-active={$currentPage === idx + 1}
							>
								{page.value}
							</a>
						{/if}
					{/each}
					<button
						on:click={() => {
							goto(
								`/races?take=${pageSize}&skip=${pageSize + $range.start}
								&${excludePaginationSearchParams()}`
							)
						}}
						{...$nextButton}
						use:nextButton
						class="join-item btn btn-xs"
					>
						<Icon icon="mdi:chevron-right" />
					</button>
				</div>
			</nav>
		{/if}
	{/if}
</Page>
