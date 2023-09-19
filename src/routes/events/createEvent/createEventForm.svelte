<script lang="ts">
	import { Form } from '$components/form'
	import Page from '$components/layout/Page.svelte'
	import { superForm } from 'sveltekit-superforms/client'

	export let data
	const formObj = superForm(data.form)
</script>

<Page title="full event">
	<Form {formObj} />
</Page>
