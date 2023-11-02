<script lang="ts">
	import { Form, Input } from '$components/form'
	import Page from '$components/layout/Page.svelte'
	import { superForm } from 'sveltekit-superforms/client'
	import type { PageData } from './$types'
	import { compSchema } from './schema'
	import Button from '$components/form/button.svelte'
	import Textarea from '$components/form/textarea.svelte'

	export let data: PageData

	const formObj = superForm(data.form, {
		taintedMessage: 'Finish filling out the form or your data will be lost?',
		validators: compSchema,
		dataType: 'json'
	})
</script>

<Page title="Edit Competitior">
	<Form {formObj}>
		<Input name="boat" {formObj} />
		<Input name="skipper" {formObj} />
		<Input name="sailno" {formObj} />
		<Input name="club" {formObj} />
		<Input name="rating" {formObj} />
		<Textarea name="description" {formObj} />
		<Input name="image" {formObj} />
		<Button>Submit</Button>
	</Form>
</Page>
