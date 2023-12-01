<script lang="ts">
	import { Page } from '$components/layout'
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	import EventEdit from './EventEdit.svelte'

	export let data: PageData
	$: console.log($page)
	//
</script>

<Page title={data.form.data.name}>
	<EventEdit {data} />
</Page>
