<script lang="ts">
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	import Page from '$components/layout/Page.svelte'
	import Icon from '@iconify/svelte'
	import ItemCard from '$components/layout/ItemCard.svelte'
	import LikeCount from '$lib/like/like-count.svelte'

	export let data: PageData
	$: ({ user } = data)
</script>

<Page title="Series">
	<div slot="trailing">
		<a href="/series/new/edit?from={$page.url.pathname}" class="rounded-full shadow-lg">
			<Icon icon="mdi:plus-circle" width="44" />
		</a>
	</div>
	{#await data.series}
		<div>Loading...</div>
	{:then}
		{#if !data.series}
			<div>No series available</div>
		{:else}
			{#each data.series as ser (ser.id)}
				<ItemCard title={ser.name} href="/series/{ser.id}">
					<div slot="top-right" class="text-xs flex gap-2">
						<LikeCount item={ser} type="series" />
					</div>

					<div class:opacity-60={!ser.description}>
						{@html ser.description ?? 'No description provided'}
					</div>

					<div slot="bottom-left" class="p-2 text-base-content">
						{#if ser.Organization}
							<a
								href="/organization/{ser.Organization.id}"
								class="flex items-center gap-2 line-clamp-1"
							>
								<Icon icon="clarity:organization-solid" />
								{@html ser.Organization.name}
							</a>
						{/if}
						{#if ser.Venues}
							{#each ser.Venues as venue}
								<a href="/venue/{venue.id}" class="flex items-center gap-2 line-clamp-1">
									<Icon icon="mdi:map-marker" />
									{@html venue.name}
								</a>
							{/each}
						{/if}
					</div>
					<div slot="bottom-right">
						{#if user?.userId === ser.publisherId}
							<div class="tooltip tooltip-top" data-tip="Edit Series">
								<a
									href="/series/{ser?.id}/edit?from={$page.url.pathname}
									&{$page.url.searchParams.toString()}"
									class="btn btn-ghost p-1"
								>
									<Icon class="text-3xl text-primary" icon="material-symbols:edit-outline" />
								</a>
							</div>
						{/if}
						<div class="text-xs text-base-content pr-2 pb-1">
							{ser.createdAt?.toLocaleDateString()}
						</div>
					</div>
				</ItemCard>
			{/each}
		{/if}
	{:catch}
		<div>An error occured</div>
	{/await}
</Page>
