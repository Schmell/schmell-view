<script lang="ts">
	import { ItemCard } from '$components/layout';
	import { Page } from '$components/layout';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ races, event } = data);

	const formatDateTime = (date: Date) => {
		try {
			return new Intl.DateTimeFormat(undefined, {
				dateStyle: 'short',
				timeStyle: 'short'
			}).format(date);
		} catch (error) {
			console.error('error: ', error);
		}
	};
</script>

<Page title={event?.name}>
	{#if data}
		<!-- content here -->
		{#if races}
			{#each races as race}
				<ItemCard title={race.name} href="">
					<div slot="top-right">
						<a href="/results/{race.id}" class="btn btn-accent btn-xs">View Results</a>
					</div>

					<div slot="bottom-right" class="flex justify-end text-primary">
						<div class="tooltip tooltip-top" data-tip="View Competitors">
							<a href="/comps/{event?.id}" class="btn btn-ghost p-1">
								<Icon icon="material-symbols:groups-outline-rounded" width="30" />
							</a>
						</div>

						{#if data.user?.userId === event?.publisherId}
							<div class="tooltip tooltip-top" data-tip="Race Edit">
								<a href="/event/{event?.id}" class="btn btn-ghost">
									<Icon icon="material-symbols:edit-outline" width="24" />
								</a>
							</div>
						{/if}
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
							class:badge-error={race.sailed === '0'}
						>
							{race.sailed === '1' ? 'Complete' : 'Un-Sailed'}
						</div>

						<div class="p-2 text-sm pr-6">
							{race.date ? race.date : 'TBA'} - {race.time ? race.time : ''}
						</div>
					</div>

					<div slot="bottom-left" class="relative">
						<!-- <div>
							Updated:
							<span class="px-2">
								{#if race.updatedAt}
									{formatDateTime(race.updatedAt)}
								{:else}
									No date provided
								{/if}
							</span>
						</div> -->
						<div class="absolute">
							<span class="px-2 text-xs">
								{#if race.createdAt}
									{formatDateTime(race.createdAt)}
								{:else}
									No time provided
								{/if}
							</span>
						</div>
					</div>
				</ItemCard>
			{/each}
		{/if}
	{:else}
		<progress class="progress progress-primary w-56" />
	{/if}
</Page>
