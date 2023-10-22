<script lang="ts">
	import { page } from '$app/stores'
	import { Page } from '$components/layout'
	import ItemCard from '$components/layout/ItemCard.svelte'
	import Like from '$lib/like/like.svelte'
	import Icon from '@iconify/svelte'
	import { onMount } from 'svelte'
	import type { PageData } from './$types'

	export let data: PageData

	$: ({ events, count, user } = data)

	const take = Number($page.url.searchParams.get('take') || 10)
	const skip = Number($page.url.searchParams.get('skip') || 0)

	let pages = 1
	let currentPage = 1

	onMount(() => {
		function getPages() {
			return count / take
		}

		pages = Math.round(getPages())

		function getCurrentPage() {
			return skip / take
		}
		currentPage = getCurrentPage()
	})
</script>

<Page title={data.title ?? 'All Events'}>
	<div slot="trailing">
		<a class="br-primary" href="/events/createEvent">
			<Icon icon="material-symbols:add-circle" width="34" />
		</a>
	</div>
	<div class="navbar flex gap-2 bg-base-100 mb-2 rounded-xl">
		<button class="btn btn-primary btn-xs"> Group by Org </button>
		<a
			href="/events?whereType=publisherId&whereId={user?.userId}&title=Your Events"
			class="btn btn-primary btn-xs"
		>
			Your events
		</a>
	</div>
	{#await events}
		{#if !events.length}
			<h1 class="text-xl font-semibold">You do not have any events yet.</h1>
			<a class="link-primary hover:link-hover" href="/import"> Upload events here </a>
		{/if}
	{:then events}
		{#each events as event}
			<!--  -->
			<ItemCard title={event.name} href="/events/{event.id}">
				<div slot="top-right" class="text-xs">
					<Like userId={user?.userId} item={event} type="event" />
				</div>
				<div>
					{@html event.description ?? ''}
				</div>
				<div class="w-full" />
				<div slot="bottom-left" class="p-2">
					<a href="/organization/{event.Organization?.id}" class="flex items-center gap-2">
						<Icon icon="gridicons:popout" />
						{@html event.Organization?.name}
					</a>
				</div>
				<div slot="bottom-right">
					{#if data.user?.userId === event?.publisherId}
						<div class="tooltip tooltip-top" data-tip="Edit Event">
							<a
								data-sveltekit-replacestate
								href="/events/{event?.id}/edit?from={$page.url.pathname}"
								class="btn btn-ghost p-1"
							>
								<Icon class="text-3xl text-primary" icon="material-symbols:edit-outline" />
							</a>
						</div>
					{/if}
				</div>
			</ItemCard>
		{/each}
		<div class="flex gap-4 justify-center items-center">
			<div class="join shadow-lg">
				<!-- only show if pages are more than 1 -->
				{#each Array(pages) as _, idx}
					<button class="join-item btn" class:btn-active={currentPage == idx}>{idx + 1}</button>
				{/each}
			</div>
			<div class="p-2 border border-base-300 rounded-lg shadow-inner">1 / {pages}</div>
			<div class="join">
				<a href="/events?skip={take - currentPage}" class="join-item btn">
					<Icon icon="mdi:chevron-left" />
				</a>
				<a href="/events?skip={take + currentPage}" class="join-item btn">
					<Icon icon="mdi:chevron-right" />
				</a>
			</div>
		</div>
	{/await}
</Page>
