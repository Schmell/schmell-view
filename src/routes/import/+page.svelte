<script lang="ts">
	import { Page } from '$components/layout';
	import ImportForm from './ImportForm.svelte';

	export let data;
	$: ({ orgs, duplicate, org } = data);
	$: console.log('org: ', org);
</script>

<Page title="Import from File">
	{#if duplicate}
		<ImportForm {orgs} action="?/update" />
	{:else}
		<ImportForm {orgs} action="?/newImport" />
	{/if}
</Page>
