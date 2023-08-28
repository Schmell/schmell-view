<script lang="ts">
	import { Page } from '$components/layout';
	import type { PageData } from './$types';

	export let data: PageData;
	// $: console.log('data: ', data);
	$: ({ event } = data);
</script>

<Page title="Duplicate">
	{#if data.error}
		<p class="text-error">{data.error}</p>
	{:else}
		<p class="text-xl">{event?.name}</p>
		<p class="text-lg">is an event that already exists</p>
		<div>You can</div>
	{/if}
</Page>
