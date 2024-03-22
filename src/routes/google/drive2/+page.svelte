<script lang="ts">
	import { enhance } from '$app/forms'
	import { Page } from '$components/layout'
	import { page } from '$app/stores'

	export let data
	$: ({ files } = data)

	let showPre = false
</script>

<Page title="Drive2">
	{#if files}
		{#each files as item}
			<!-- content here -->
			<div class="p-1">
				<a href="{$page.url.pathname}?id={item.id}">{item.name}</a>
			</div>
		{/each}
	{/if}
	<div class="my-4">
		<form action="?/upload" method="post" enctype="multipart/form-data" use:enhance>
			<input
				type="file"
				class="file-input file-input-bordered file-input-primary w-full max-w-xs"
				name="file"
			/>
			<button class="btn btn-primary mt-4 block w-full max-w-xs">Upload</button>
		</form>
	</div>

	<button class="btn btn-link" on:click={() => (showPre = !showPre)}>Show Json</button>
	{#if showPre}
		<!-- content here -->
		<pre class="text-xs">{JSON.stringify(files, null, 2)}</pre>
	{/if}
</Page>
