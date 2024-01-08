<script lang="ts">
	import Page from '$components/layout/Page.svelte'
	import LikeFollow from '$lib/like/like-follow.svelte'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'

	export let data: PageData

	$: ({ user, venues } = data)
</script>

<svelte:head>
	<title>Venues - Vite Sail</title>
</svelte:head>

<Page title="All Venues">
	{#if venues}
		{#each venues as venue}
			<div class="py-4">
				<div class="w-full border-r-4 border-b-2 border-base-300 shadow-lg rounded-lg">
					<div class="flex justify-between items-center p-2 rounded-t-lg shadow-md bg-base-100">
						<div class="flex gap-2 text-xl font-semibold">
							{venue.name}
							{#if venue.burgee?.startsWith('http')}
								<img src={venue.burgee} width="24" alt="venue burgee" />
							{/if}
						</div>
						<img src={venue.Publisher?.avatar} width="24" alt={venue.Publisher?.name} />
					</div>
					<div class="p-2">
						<div>
							{#if venue._count.Series}
								<a href="/series?whereType=venueId&whereId={venue.id}&title={venue.name} Series">
									{venue._count.Series} Series
								</a>
								/
							{/if}
							<a href="/events?whereType=venueId&whereId={venue.id}&title={venue.name} Events">
								{venue._count.Events}
								{venue._count.Events <= 1 ? 'Event' : 'Events'}
							</a>
						</div>
						<div class="text-sm">
							{#if venue._count.Follows}
								{venue._count.Follows} Follows
							{/if}
							{#if venue._count.Likes}
								{venue._count.Likes} Likes
							{/if}
						</div>
					</div>
					<div class="flex gap-2 p-2 justify-between items-end">
						<div class="text-xs">
							<a href="mailto:{venue.email}" target="_blank">{venue.email}</a>
							<a href={venue.website} class="flex gap-1 items-center" target="_blank">
								<Icon icon="clarity:pop-out-line" />
								{venue.website}
							</a>
						</div>

						<LikeFollow type="venue" item={venue} userId={user?.userId} />
					</div>
				</div>
			</div>
		{/each}
	{/if}
</Page>
