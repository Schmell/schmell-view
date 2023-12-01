<script lang="ts">
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import { Button, Form, Select } from '$components/form/index.js'
	import { Page } from '$components/layout/index.js'
	import { themes } from '$lib/utils'

	export let data: PageData
	let langMap = ['english', 'french', 'spanish', 'italian']

	const formObj = superForm(data.form)
	const { form, delayed } = formObj

	$: if ($form.theme) {
		document.documentElement.setAttribute('data-theme', $form.theme)
	}
</script>

<Page title="User Settings">
	<Form {formObj}>
		<Select name="language" {formObj} items={langMap} />
		<Select name="theme" {formObj} items={themes} />
		<Button class="mt-6" disabled={$delayed}>
			{#if $delayed}
				<span class="loading loading-dots loading-md" />
			{:else}
				Submit
			{/if}
		</Button>
	</Form>
</Page>
