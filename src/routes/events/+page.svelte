<script lang="ts">
	import { page } from '$app/stores'
	import { ItemCard, Page } from '$components/layout'
	import Like from '$lib/like/like.svelte'
	import { formatDateTime } from '$lib/utils/formatters'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'

	export let data: PageData

	$: ({ events, user } = data)
</script>

<Page title="Events">
	<div slot="trailing">
		<a class="br-primary" href="/events/createEvent">
			<Icon icon="material-symbols:add-circle" width="34" />
		</a>
	</div>
	{#await events}
		{#if !events[0]}
			<h1 class="text-xl font-semibold">You do not have any events yet.</h1>
			<a class="link-primary hover:link-hover" href="/import"> Upload events here </a>
		{/if}
	{:then events}
		{#each events as event}
			<ItemCard title={event.name} href="/events/{event.id}">
				<div slot="top-right">
					<Like class="text-sm" userId={user?.userId} item={event} type="event" />
				</div>

				<div slot="bottom-right" class="flex justify-end text-primary">
					<div class="tooltip tooltip-top" data-tip="View Event">
						<a href="/events/{event?.id}?from={$page.url.pathname}" class="btn btn-ghost p-1">
							<Icon class="text-3xl text-primary" icon="material-symbols:preview" />
						</a>
					</div>

					<div class="tooltip tooltip-top" data-tip="View Competitors">
						<a href="/comps/{event?.id}?from={$page.url.pathname}" class="btn btn-ghost p-1">
							<Icon icon="material-symbols:groups-outline-rounded" width="30" />
						</a>
					</div>

					<!-- Edit should only show when current user is owner -->
					{#if data.user?.userId === event?.publisherId}
						<div class="tooltip tooltip-top" data-tip="Event Edit">
							<a
								href="/events/edit/{event?.id}?from={$page.url.pathname}"
								class="btn btn-ghost p-1"
							>
								<Icon icon="material-symbols:edit-outline" width="24" />
							</a>
						</div>
					{/if}
				</div>
				{#if event.description}
					<div>
						{@html event.description}
					</div>
				{/if}
				<!-- {#if event.eventwebsite}
				 <a href={getHref(event.eventwebsite)}>
					 {event.eventwebsite}
				 </a>
			 {/if} -->

				<div slot="bottom-left" class="p-2 text-xs text-base-content">
					<div>
						<!-- Updated: -->
						<span class="px-2">
							{#if event.updatedAt}
								{formatDateTime(event.updatedAt)}
							{:else}
								No date provided
							{/if}
						</span>
					</div>
				</div>
			</ItemCard>
		{/each}
	{/await}
</Page>
