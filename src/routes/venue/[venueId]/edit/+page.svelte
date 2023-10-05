<script lang="ts">
	import { Page } from '$components/layout'
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import { venueSchema } from './venueSchema'
	import { Form, Input, Textarea, Button } from '$components/form'

	export let data: PageData

	const formObj = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave?'
		// validators: venueSchema
	})

	// $: ({ form } = formObj)
	// $: console.log('form: ', $form)
</script>

<Page title="Edit Venue">
	<Form {formObj}>
		<Input name="name" {formObj} />
		<Textarea name="description" {formObj} />
		<Input name="website" {formObj} />
		<Input name="email" {formObj} />
		<Input name="burgee" {formObj} />
		<Input name="titleImage" label="Title Image" {formObj} />
		<div class="collapse collapse-arrow bg-base-200">
			<input type="checkbox" />
			<div class="collapse-title">Address</div>
			<div class="collapse-content">
				<div class="pl-4">
					<fieldset name="address01">
						<input name="addressId" type="hidden" value="address.id" />
						<Input name="addressName" label="Label" placeholder="Mailing Address" {formObj} />
						<Input name="street" {formObj} />
						<Input name="city" {formObj} />
						<Input name="state" label="State/Province" {formObj} />
						<Input name="country" {formObj} />
						<Input name="code" label="Zip/Postal" {formObj} />
					</fieldset>
				</div>
			</div>
		</div>

		<Button>Submit</Button>
	</Form>
</Page>
