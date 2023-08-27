<script lang="ts">
	import { Page } from '$components/layout';
	import type { PageData } from './$types';

	export let data: PageData;
	$: console.log('data: ', data);
</script>

<Page title="Duplicate">
	{#if data.error}
		<p class="text-error">{data.error}</p>
	{/if}
	<div>
		{JSON.stringify(data.event) ?? ''}
	</div>
</Page>
