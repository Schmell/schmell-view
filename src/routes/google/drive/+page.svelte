<script lang="ts">
	import { Page } from '$components/layout'

	export let data

	$: ({ files } = data)
</script>

<Page title="drive">
	<!-- <pre>{JSON.stringify(address, null, 2)}</pre> -->
	{#if files}
		{#each files as item}
			<div>{item.name}</div>
		{/each}
	{/if}
</Page>
