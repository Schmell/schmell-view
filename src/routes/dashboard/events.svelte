<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Icon from '@iconify/svelte'
	import { Pagination } from 'bits-ui'

	export let events
	export let series
	export let eventsCount

	let eventPageSize = 5
	let eventDiv: HTMLDivElement
	let currentPage = 1
	// $: console.log(currentPage)

	function excludePaginationSearchParams() {
		$page.url.searchParams.delete('eventSkip')
		$page.url.searchParams.delete('eventTake')
		return $page.url.searchParams.toString()
	}

	function excludeSortSearchParams() {
		$page.url.searchParams.delete('sortBy')
		$page.url.searchParams.delete('sortOrder')
		return $page.url.searchParams.toString()
	}
</script>

<div class="flex flex-col gap-2" bind:this={eventDiv}>
	{#if !events.length && !series.length}
		<div class="text-sm">You have no Events or Series yet!</div>
		<a href="/events/createEvent" class="btn btn-primary rounded-full">Add event</a>
	{:else}
		{#each events as event}
			<a
				href="/events/{event?.id}"
				class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-accent w-full rounded-lg shadow-xl"
			>
				<div class="capitalize w-full p-2 font-bold rounded-t-xl bg-info bg-opacity-10">
					<div class="flex justify-between">
						<div class="line-clamp-1">{event.name}</div>
						<div class="flex gap-1 items-center min-w-fit text-xs pr-2">
							<Icon icon="mdi:thumb-up" />
							{event._count.Likes} /
							<Icon icon="mdi:bell-ring" />
							{event._count.Follows}
						</div>
					</div>
				</div>

				<div class="px-4">
					{@html event?.name} -
					<span class="text-xs">{@html event?.Venue?.name}</span>
					<div class="flex justify-between">
						<div>
							{event?._count.Races} of {event.Races.length} races sailed
						</div>
						<!-- Need to have a complete flag on the event -->
						{#if event._count.Races === event.Races.length || event.complete}
							<div class="badge badge-success">
								<Icon icon="mdi:check" />
								<!-- complete -->
							</div>
						{:else}
							<div class="badge badge-warning">
								<Icon icon="material-symbols:progress-activity" />
							</div>
						{/if}
					</div>
				</div>
				<!-- Organization -->
				<div class="flex justify-between items-end w-full px-4">
					<div>
						<div class="flex items-center text-xs gap-4">
							<div class="flex items-center gap-2">
								<Icon icon="clarity:organization-line" />
								{event?.Organization?.name}
							</div>
							<div class="flex items-center gap-1">
								<div class="flex items-center gap-1 min-w-fit">
									<Icon icon="mdi:thumb-up" />
									{event._count.Likes}
								</div>
								/
								<div class="flex items-center gap-1">
									<Icon icon="mdi:bell-ring" />
									{event._count.Follows}
								</div>
							</div>
						</div>
					</div>

					<div class="text-xs opacity-40">
						{event?.createdAt?.toLocaleDateString()}
					</div>
				</div>
			</a>
		{/each}

		<!-- ///////////////////////////////////////////////////////// -->
		<!-- events pagination -->
		<div class="inline-flex justify-center">
			<Pagination.Root
				count={eventsCount ? eventsCount : 0}
				perPage={eventPageSize}
				let:pages
				let:range
			>
				<div class="flex items-center">
					<Pagination.PrevButton
						class="mr-2 inline-flex items-center justify-center text-xl text-base-content rounded-sm bg-transparent hover:bg-base-200 active:scale-98 disabled:cursor-not-allowed disabled:text-neutral hover:disabled:bg-transparent"
						on:click={() => {
							currentPage = currentPage - 1
							goto(
								`/dashboard?eventTake=${eventPageSize}&eventSkip=${
									eventPageSize * currentPage
								}&${excludePaginationSearchParams()}`
							)

							// now more than ever need to anchor the <Page> to the content window
							eventDiv.scrollIntoView({ block: 'start' })
						}}
					>
						<Icon icon="mdi:menu-left" />
					</Pagination.PrevButton>
					<div class="flex items-center join">
						{#each pages as page (page.key)}
							{#if page.type === 'ellipsis'}
								<div class="text-sm font-medium text-base-content join-item">...</div>
							{:else}
								<Pagination.Page
									{page}
									class="inline-flex size-6 items-center justify-center rounded-lg bg-base-300 text-md font-medium hover:bg-base-100  join-item active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-transparent data-[selected]:bg-foreground data-[selected]:text-background"
									on:click={() => {
										goto(
											`/dashboard?eventTake=${eventPageSize}&eventSkip=${
												eventPageSize * (page.value - 1)
											}&${excludePaginationSearchParams()}`
										)
										currentPage = page.value
										eventDiv.scrollIntoView({ block: 'start' })
									}}
								>
									{page.value}
								</Pagination.Page>
							{/if}
						{/each}
					</div>
					<Pagination.NextButton
						class="ml-2 inline-flex size-10 items-center justify-center text-xl text-base-content rounded-lg bg-transparent hover:bg-base-100 active:scale-98 disabled:cursor-not-allowed disabled:text-muted-foreground hover:disabled:bg-transparent"
						on:click={() => {
							goto(
								`/dashboard?eventTake=${eventPageSize}&eventSkip=${
									eventPageSize * currentPage
								}&${excludePaginationSearchParams()}`
							)
							eventDiv.scrollIntoView({ block: 'start' })
						}}
					>
						<Icon icon="mdi:menu-right" />
					</Pagination.NextButton>
				</div>
				<p class="text-center text-sm text-base-content">
					Showing {range.start} - {range.end}
				</p>
			</Pagination.Root>
		</div>
		<!--  -->

		<h1>Series</h1>
		<div class="divider m-0" />

		{#each series as ser}
			<a
				href="/series/{ser?.id}"
				class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"
			>
				<div class="capitalize w-full p-2 font-bold rounded-t-xl bg-secondary bg-opacity-10">
					<div class="flex justify-between">
						<div class="line-clamp-1">{ser.name}</div>
						<div class="flex gap-1 items-center min-w-fit text-xs pr-2">
							<Icon icon="mdi:thumb-up" />
							{ser._count.Likes} /
							<Icon icon="mdi:bell-ring" />
							{ser._count.Follows}
						</div>
					</div>
				</div>
				<div class="p-2 px-4">
					{@html ser.description}
				</div>

				<a href="/organization/{ser.Organization?.id}" class="flex justify-between w-full px-4">
					<div class="flex gap-2 items-center text-xs">
						<Icon icon="clarity:organization-line" />
						{ser.Organization?.name}
					</div>
					<div class="text-xs opacity-40">
						{ser?.createdAt?.toLocaleDateString()}
					</div>
				</a>
			</a>
		{/each}
	{/if}
</div>
