<script lang="ts">
	import { Page } from '$components/layout';
	import ImportForm from '../ImportForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ event, orgs, duplicate } = data);
</script>

<Page title="Update event">
	{#if data.error}
		<!-- <p class="text-error">{data.error}</p> -->
	{:else if duplicate}
		<p class="text-xl underline underline-offset-2 decoration-neutral-content">{event?.name}</p>
		<p class="text-lg pb-2">is an event that already exists</p>
		<p>You can use this for to update here.</p>
	{/if}
	<ImportForm {orgs} action="/import?/update" />
	<div class="pt-4">
		<p class="text-error">CAUTION!</p>
		<p class="text-warning">
			Make sure your external file is in sync with this server version.<br />You can potentailly
			overwrtie work you have done in this app.
		</p>
	</div>
</Page>
