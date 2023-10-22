<script lang="ts">
	import { Page } from '$components/layout'
	import type { PageData } from './$types'

	export let data: PageData
	$: ({ events } = data)
	// $: console.log('data: ', races)
</script>

<Page title="All Races">
	{#if !events}
		<div>No events</div>
	{:else}
		{#each events as event}
			<div class="py-4">
				<div class="text-xl font-semibold">{event.name}</div>
				<ul class="pl-4 py-2">
					{#each event.Races as race}
						<div class="flex justify-between items-center">
							<a href="/races/{race.id}" class="block">{race.name}</a>
							<div
								class="badge badge-xs"
								class:badge-success={race.sailed}
								class:badge-error={race.sailed === '0'}
							>
								{#if race.sailed}
									Sailed
								{:else}
									Un-Sailed
								{/if}
							</div>
						</div>
					{/each}
				</ul>
			</div>
		{/each}
	{/if}
</Page>
