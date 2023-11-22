<script lang="ts">
	import type { PageData } from './$types'
	import Page from '$components/layout/Page.svelte'
	import { enhance } from '$app/forms'
	import { Button } from '$components/form'

	export let data: PageData

	$: ({ venue, venueToMerge } = data)
	// $: console.log('venue: ', venue)
</script>

<Page title="Merge Venues">
	{#if venue.error}
		<div class="font-bold text-warning">{venue.error}</div>
		{#if venue.errCode === 'm-001'}
			<p>You can request the Publisher to merge this venue with your Series or Events</p>
			<!-- <button class="btn btn-sm btn-primary my-4">Request merge</button> -->
		{/if}
	{/if}
	{#if venue.data}
		<div class="text-xl font-semibold underline pb-2">You are trying to merge:</div>
		<div>
			<div>
				<a href="/venue/{venueToMerge?.id}" class="font-semibold">
					{venueToMerge?.name && venueToMerge?.name.length > 0
						? venueToMerge?.name
						: 'No name provided'}
				</a>
			</div>
			<div class="text-sm">with</div>
			<div>
				{#if venue.data}
					<a href="/venue/{venue?.data?.id}" class="font-semibold">{venue?.data.name}</a>
				{/if}
			</div>
		</div>
		<div class="text-lg pt-4">Include:</div>

		<hr class="border-primary pb-2" />

		<form method="post" action="?/merge" use:enhance>
			<input type="hidden" name="venueId" value={venue.data?.id} />
			<input type="hidden" name="venueToMergeId" value={venueToMerge?.id} />
			{#if venueToMerge?._count.Series}
				<label for="series" class="label">
					<div>Series <span class="tex-xs opacity-60">({venueToMerge._count.Series})</span></div>
					<input name="series" type="checkbox" checked class="checkbox" />
				</label>
			{/if}
			{#if venueToMerge?._count.Events}
				<label for="events" class="label">
					<div>Events <span class="tex-xs opacity-60">({venueToMerge._count.Events})</span></div>
					<input name="events" type="checkbox" checked class="checkbox" />
				</label>
			{/if}
			{#if venueToMerge?._count.Comments}
				<label for="comments" class="label">
					<div>
						Comments <span class="tex-xs opacity-60">({venueToMerge._count.Comments})</span>
					</div>
					<input name="comments" type="checkbox" checked class="checkbox" />
				</label>
			{/if}
			{#if venueToMerge?._count.Likes}
				<label for="likes" class="label">
					<div>Likes <span class="tex-xs opacity-60">({venueToMerge._count.Likes})</span></div>
					<input
						name="likes"
						type="checkbox"
						checked={venue.data?._count.Likes > 0}
						class="checkbox"
					/>
				</label>
			{/if}
			{#if venueToMerge?._count.Follows}
				<label for="follows" class="label">
					<div>Follows <span class="tex-xs opacity-60">({venueToMerge._count.Follows})</span></div>
					<input
						name="follows"
						type="checkbox"
						checked={venue.data?._count.Follows > 0}
						class="checkbox"
					/>
				</label>
			{/if}
			{#if venue.errCode === 'm-001'}
				<Button formaction="?/requestMerge">Request Merge</Button>
			{:else}
				<Button>Merge</Button>
			{/if}
		</form>
	{:else}
		<div>An Error Occured</div>
	{/if}
</Page>
