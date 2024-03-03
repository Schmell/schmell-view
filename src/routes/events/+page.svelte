<script lang="ts">
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Page } from '$components/layout'
	import ItemCard from '$components/layout/ItemCard.svelte'
	import LikeCount from '$lib/like/like-count.svelte'
	import Icon from '@iconify/svelte'
	import { createPagination } from '@melt-ui/svelte'
	import type { PageData } from './$types'
	import AreYouSure from '$lib/areYouSure/areYouSure.svelte'
	import Count from '$lib/like/count.svelte'

	export let data: PageData

	let areYouSure = {
		open: false,
		action: '',
		severity: 'high'
	}

	// this could probably be a util
	function getFromString() {
		return `from=${$page.url.pathname}&${$page.url.searchParams.toString()}`
	}

	$: ({ user } = data)

	let pageSize = 10

	// const likey = createQuery({
	// 	queryFn: async () => data.awaited.events,
	// 	queryKey: ['heynow'],
	// 	initialData: events
	// })
	// if ($likey) {
	// 	console.log($likey.data.)
	// }

	// melt-ui pagination component
	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages, range, page: currentPage }
	} = createPagination({
		count: data.count ?? 0,
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
</script>

<svelte:head>
	<title>All Events - Schmell View</title>
</svelte:head>

{#if areYouSure?.open}
	<AreYouSure {...areYouSure} />
{/if}

<Page title={data.title ?? 'All Events'}>
	<div slot="trailing">
		<a class="br-primary" href="/events/createEvent">
			<Icon icon="material-symbols:add-circle" width="34" />
		</a>
	</div>

	<div class="navbar flex gap-2 bg-base-100 mb-2 rounded-xl">
		{#if $page.url.searchParams.get('sortBy') !== 'org'}
			<a href="/events?sortBy=org&{excludeSortSearchParams()}" class="btn btn-primary btn-xs">
				Sort by Org
			</a>
		{/if}
		{#if $page.url.searchParams.get('sortBy') !== 'venue'}
			<a href="/events?sortBy=venue&{excludeSortSearchParams()}" class="btn btn-primary btn-xs">
				Sort by Venue
			</a>
		{/if}

		{#if $page.url.searchParams.get('whereType') !== 'publisherId'}
			<a
				href="/events?whereType=publisherId&whereId={user?.userId}&title=Your Events"
				class="btn btn-primary btn-xs"
			>
				Your events
			</a>
		{:else}
			<a href="/events" class="btn btn-primary btn-xs"> All events </a>
		{/if}
	</div>

	{#if !data.events.length}
		<h1 class="text-xl font-semibold">You do not have any events yet.</h1>
		<a class="link-primary hover:link-hover" href="/import"> Upload events here </a>
	{/if}
	{#each data.events as event}
		<!--  -->
		<ItemCard title={event.name} href="/events/{event.id}{$page.url.search}">
			<div slot="top-right" class="text-xs">
				<Count item={event} type="event" />
			</div>

			<div class:opacity-60={!event.description}>
				{@html event.description ?? 'No description provided'}
			</div>

			<div slot="bottom-left" class="p-2 text-base-content">
				<a
					href="/organization/{event.Organization?.id}"
					class="flex items-center gap-2 line-clamp-1"
				>
					<Icon icon="clarity:organization-solid" />
					{@html event.Organization?.name}
				</a>
				<a href="/venue/{event.Venue?.id}" class="flex items-center gap-2 line-clamp-1">
					<Icon icon="mdi:map-marker" />
					{@html event.Venue?.name}
				</a>
			</div>
			<div slot="bottom-right">
				<div class="flex items-center justify-end min-h-12">
					{#if user?.userId === event?.publisherId}
						<div class="dropdown dropdown-top dropdown-end text-base-content">
							<div tabindex="0" role="button" class="px-1">
								<Icon icon="mdi:dots-vertical" width="20" />
							</div>
							<!-- svelte-ignore  a11y-no-noninteractive-tabindex-->
							<ul
								tabindex="0"
								class="dropdown-content z-[1] menu p-2 shadow-lg uppercase bg-base-300 rounded-box w-52"
							>
								<li>
									<a href="/events/{event?.id}/edit?{getFromString()}">
										<Icon icon="mdi:pencil-outline" /> edit
									</a>
								</li>
								<li>
									<form method="post" use:enhance>
										<button
											type="button"
											class="flex gap-2 items-center uppercase text-error"
											on:click={() => {
												areYouSure.open = true
												areYouSure.action = `?/deleteEvent&itemId=${event.id}&${getFromString()}`
											}}
										>
											<Icon icon="mdi:trash-outline" /> Delete
										</button>
									</form>
								</li>
							</ul>
						</div>
					{/if}

					<div class="avatar">
						<div class="w-6 rounded-full shadow-md">
							<a href="/user/{event.Publisher?.id}">
								<img src={event.Publisher?.avatar} alt={event.Publisher?.username} />
							</a>
						</div>
					</div>

					<!-- Tools -->
					<!-- {#if user?.userId === event?.publisherId} -->
					<!-- <div class="tooltip tooltip-top" data-tip="Edit Event">
							<a
								href="/events/{event?.id}/edit?from={$page.url.pathname}
									&{$page.url.searchParams.toString()}"
								class="btn btn-ghost p-1"
							>
								<Icon class="text-3xl text-primary" width="24" icon="mdi:pencil-outline" />
							</a>
						</div>

						<div class="tooltip tooltip-top" data-tip="Delete Event">
							<form method="post" use:enhance>
								<button
									type="button"
									class="btn btn-ghost p-1"
									on:click={() => {
										areYouSure.open = true
										areYouSure.action = `?/deleteEvent&itemId=${event.id}&from=${
											$page.url.pathname
										}&${$page.url.searchParams.toString()}`
										areYouSure.severity = 'low'
									}}
								>
									<Icon class="text-3xl text-primary" width="24" icon="mdi:trash-outline" />
								</button>
							</form>
						</div> -->
					<!-- {/if} -->
					<!-- tools end -->
				</div>
				<div class="text-xs text-base-content pr-2 pb-1">
					{event.createdAt?.toLocaleDateString()}
				</div>
			</div>
		</ItemCard>
	{/each}

	<!-- Pagination -->
	{#if data.count && data.count > pageSize}
		<div class="divider" />
		<nav {...$root} use:root class="">
			<p class="flex justify-center text-sm">Showing items {$range.start} - {$range.end}</p>
			<div class=" join flex justify-center">
				<button
					on:click={() => {
						goto(
							`/events?take=${pageSize}&skip=${pageSize - $range.start}
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
							href="/events?take={pageSize}&skip={pageSize * idx}
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
							`/events?take=${pageSize}&skip=${pageSize + $range.start}
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
</Page>
