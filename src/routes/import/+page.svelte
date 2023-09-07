<script lang="ts">
	import { Page } from '$components/layout';
	import ImportForm from './ImportForm.svelte';

	export let data;
	$: ({ orgs } = data);
</script>

<Page title="Import from File">
	<ImportForm {orgs} {...$$props} action="?/newImport" />
</Page>
