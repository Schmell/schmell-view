<script lang="ts">
	import { Page } from '$components/layout'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'
	import { page } from '$app/stores'
	import ItemCard from '$components/layout/ItemCard.svelte'
	import Like from '$lib/like/like.svelte'

	export let data: PageData

	$: ({ events, user } = data)
</script>

<Page title="Events">
	<div slot="trailing">
		<a class="br-primary" href="/events/createEvent">
			<Icon icon="material-symbols:add-circle" width="34" />
		</a>
	</div>
	<div class="navbar bg-base-100 mb-2 rounded-xl">
		<button class="btn btn-primary btn-xs"> Group by Org </button>
	</div>
	{#await events}
		{#if !events.length}
			<h1 class="text-xl font-semibold">You do not have any events yet.</h1>
			<a class="link-primary hover:link-hover" href="/import"> Upload events here </a>
		{/if}
	{:then events}
		{#each events as event}
			<!-- <div>{event.name}</div> -->
			<ItemCard title={event.name} href="/event/{event.id}">
				<div slot="top-right" class="text-xs">
					<Like userId={user?.userId} item={event} type="event" />
				</div>
				<div>
					{event.description ?? ''}
				</div>
				<div slot="bottom-left" class="p-2">
					<a href="/organization/{event.Organization?.id}" class="flex items-center gap-2">
						<Icon icon="gridicons:popout" />
						{event.Organization?.name}
					</a>
				</div>
			</ItemCard>
		{/each}
	{/await}
</Page>
