<script lang="ts">
	import { Page } from '$components/layout'
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import { addressSchema, venueSchema } from './venueSchema'
	import { Form, Input, Textarea, Button } from '$components/form'
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'
	import { enhance } from '$app/forms'

	export let data: PageData

	$: console.log('data: ', data.addresses)

	const formObj = superForm(data.venueForm, {
		id: data.venueForm?.id,
		// taintedMessage: 'Are you sure you want to leave?'
		validators: venueSchema
	})

	$: ({ form } = formObj)
	// $: console.log('form: ', $form)
	function createAddressForm(id) {
		return superForm(data.addressForm, {
			id: id
			// validators: addressSchema
		})
	}
	// $: console.log('createAddressForm(id): ', createAddressForm('banana'))
</script>

<Page title="Edit Venue">
	<Form action="?/details" {formObj}>
		<Input name="name" {formObj} />
		<Textarea name="description" {formObj} />
		<Input name="website" {formObj} />
		<Input name="email" {formObj} />
		<Input name="burgee" {formObj} />
		<Input name="titleImage" label="Title Image" {formObj} />

		<Button>Submit</Button>
	</Form>

	<div class="collapse collapse-arrow bg-base-200">
		<input type="checkbox" />
		<div class="collapse-title">Address</div>
		<div class="collapse-content">
			<!--  -->
			{#if data.addresses}
				{#each data.addresses as address}
					{@const addressObj = createAddressForm(address.id)}
					{@const { enhance: thisEnhance } = addressObj}
					<!-- {@debug addressObj} -->
					<form action="?/address" method="post" use:thisEnhance>
						<div class="pl-4">
							<input type="hidden" name="__superform_id" bind:value={address.id} />
							<Input
								name="label"
								label="Label"
								placeholder="Mailing Address"
								formObj={addressObj}
							/>
							<Input name="street" formObj={addressObj} />
							<Input name="city" formObj={addressObj} />
							<Input name="state" label="State/Province" formObj={addressObj} />
							<Input name="country" formObj={addressObj} />
							<Input name="code" label="Zip/Postal" formObj={addressObj} />
						</div>
						<button>submit</button>
					</form>
				{/each}
			{/if}
			<!--  -->
		</div>
	</div>

	<div class="mt-4">
		<SuperDebug data={$form} />
	</div>
</Page>
