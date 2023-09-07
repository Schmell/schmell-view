<script lang="ts">
	import { ItemCard, Page } from '$components/layout';
	import { formatDateTime } from '$lib/utils/formatters';
	import Icon from '@iconify/svelte';

	export let data;
	$: ({ user, comps } = data);
	// $: console.log('comps: ', comps);
</script>

<Page title="Competitiors">
	{#if comps}
		{#each comps as comp}
			<ItemCard title={comp.boat ? comp.boat : comp.skipper} href="/comps/comp/{comp.id}">
				<!-- <div slot="top-right">
					<a href="/races/{comp.id}" class="btn btn-accent btn-xs">View Races</a>
				</div> -->
				<div slot="bottom-right" class="flex justify-end text-primary">
					<div class="tooltip tooltip-top" data-tip="View Competitor">
						<a href="/comps/comp/{comp?.id}" class="btn btn-ghost p-1">
							<Icon icon="material-symbols:groups-outline-rounded" width="30" />
						</a>
					</div>
					<!-- Edit should only show when current user is owner -->
					{#if user?.userId === comp.publisherId}
						<div class="tooltip tooltip-top" data-tip="Edit Competitor">
							<a href="/comps/{comp?.id}?edit=1" class="btn btn-ghost">
								<Icon icon="material-symbols:edit-outline" width="24" />
							</a>
						</div>
					{/if}
				</div>

				<div class=" grid grid-cols-2 gap-4">
					{#if comp.skipper}
						<div>
							<div class="text-xs opacity-70">Skipper:</div>
							<div class="pl-2">
								{comp.skipper}
							</div>
						</div>
					{/if}

					{#if comp.club}
						<div>
							<div class="text-xs opacity-70">Club:</div>
							<div class="pl-2">
								{comp.club}
							</div>
						</div>
					{/if}

					{#if comp.fleet}
						<div>
							<div class="text-xs opacity-70">Fleet:</div>
							<div class="pl-2">
								{comp.fleet}
							</div>
						</div>
					{/if}

					{#if comp.division}
						<div>
							<div class="text-xs opacity-70">division:</div>
							<div class="pl-2">
								{comp.division}
							</div>
						</div>
					{/if}

					{#if comp.rating}
						<div>
							<div class="text-xs opacity-70">Rating:</div>
							<div class="pl-2">
								{comp.rating}
							</div>
						</div>
					{/if}
				</div>

				<div slot="bottom-left" class="p-2 text-xs text-base-content">
					<div>
						Updated:
						<span class="px-2">
							{#if comp.updatedAt}
								{formatDateTime(comp.updatedAt)}
							{:else}
								No date provided
							{/if}
						</span>
					</div>
					<div>
						Created:
						<span class="px-2">
							{#if comp.createdAt}
								{formatDateTime(comp.createdAt)}
							{:else}
								No time provided
							{/if}
						</span>
					</div>
				</div>
			</ItemCard>
		{/each}
	{:else}
		<div>Loading...</div>
	{/if}
</Page>
