<script lang="ts">
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Page } from '$components/layout'
	import ItemCard from '$components/layout/ItemCard.svelte'
	import Icon from '@iconify/svelte'
	import { createPagination } from '@melt-ui/svelte'
	import type { PageData } from './$types'
	import AreYouSure from '$lib/areYouSure/areYouSure.svelte'
	import Count from '$lib/like/count.svelte'
	import { Avatar, DropdownMenu } from 'bits-ui'

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
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Icon icon="mdi:dots-vertical" width="20" />
						</DropdownMenu.Trigger>
						<DropdownMenu.Content
							class="dropdown-content gap-2 z-[1] menu shadow-lg uppercase bg-base-300 rounded-box min-w-28"
							side="left"
							sideOffset={4}
						>
							<DropdownMenu.Item class="p-1 rounded-md hover:bg-base-100">
								<a href="/comps/{event?.id}" class="flex gap-2 items-center">
									<Icon class="" icon="mdi:pencil-outline" /> Competitors
								</a>
							</DropdownMenu.Item>
							<DropdownMenu.Item class="p-1 rounded-md hover:bg-base-100">
								<a href="/races/{event?.id}" class="flex gap-2 items-center">
									<Icon class="" icon="mdi:pencil-outline" /> Races
								</a>
							</DropdownMenu.Item>
							{#if user?.userId === event?.publisherId}
								<DropdownMenu.Item class="p-1 rounded-md hover:bg-base-100">
									<a
										href="/events/{event?.id}/edit?{getFromString()}"
										class="flex gap-2 items-center"
									>
										<Icon class="" icon="mdi:pencil-outline" /> <span>Edit</span>
									</a>
								</DropdownMenu.Item>
								<DropdownMenu.Item class="p- rounded-md hover:bg-base-100">
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
								</DropdownMenu.Item>
							{/if}
						</DropdownMenu.Content>
					</DropdownMenu.Root>

					<div class="tooltip tooltip-top rounded-full" data-tip={event.Publisher?.username}>
						<a href="/user/{event.Publisher?.id}" class="btn btn-ghost rounded-full p-1">
							<Avatar.Root class="avatar w-6 rounded-full  bg-base-300 ">
								<Avatar.Image
									class="rounded-full "
									alt="{event.Publisher?.username}}"
									src={event.Publisher?.avatar}
								/>
								<Avatar.Fallback class="rounded-full ">
									{event.Publisher?.username.slice(0, 1)}
								</Avatar.Fallback>
							</Avatar.Root>
						</a>
					</div>
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
