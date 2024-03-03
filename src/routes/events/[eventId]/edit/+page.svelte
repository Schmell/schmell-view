<script lang="ts">
	import { Page } from '$components/layout'
	import type { PageData } from './$types'
	import EventEdit from './EventEdit.svelte'

	export let data: PageData
</script>

<svelte:head>
	<title>Edit - Schmell View</title>
</svelte:head>

<Page title={data.form.data.name}>
	<EventEdit {data} />
</Page>
