<script lang="ts">
	import { Page } from '$components/layout'
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import { addressSchema, venueSchema } from './venueSchema'
	import { Form, Input, Textarea, Button } from '$components/form'
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'
	import { enhance } from '$app/forms'
	import Icon from '@iconify/svelte'
	import { page } from '$app/stores'

	export let data: PageData

	let showAddressForm = false
	let addressToEdit
	let my_modal_2

	// $: console.log('data: ', data.addresses)

	const formObj = superForm(data.venueForm, {
		id: data.venueForm?.id,
		// taintedMessage: 'Are you sure you want to leave?'
		validators: venueSchema
	})

	$: ({ form } = formObj)
	// $: console.log('form: ', $form)
	function createAddressForm(id?) {
		return superForm(data.addressForm, {
			id: id
			// validators: addressSchema
		})
	}
	// const addressObj = createAddressForm()
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

	<button
		on:click={() => {
			;(showAddressForm = true), (addressToEdit = null)
		}}
		class="btn btn-xs btn-primary my-4"
	>
		<Icon icon="material-symbols:add-circle" /> add address
	</button>

	<!-- <button class="btn" onclick="my_modal_2.showModal()">open modal</button> -->

	{#if showAddressForm}
		{@const addressObj = createAddressForm(addressToEdit)}
		<dialog id="my_modal_2" open={showAddressForm} class="modal bg-base-100">
			<Form action="?/address" formObj={addressObj}>
				<!-- <input type="hidden" name="__superform_id" bind:value={'new'} /> -->
				<Input name="label" label="Label" placeholder="Mailing Address" formObj={addressObj} />
				<Input name="street" formObj={addressObj} />
				<Input name="city" formObj={addressObj} />
				<Input name="state" label="State/Province" formObj={addressObj} />
				<Input name="country" formObj={addressObj} />
				<Input name="code" label="Zip/Postal" formObj={addressObj} />
				<button on:click={() => (showAddressForm = false)} class="btn btn-primary w-full">
					submit
				</button>
			</Form>
		</dialog>
	{/if}

	{#if data.addresses}
		{#each data.addresses as address}
			<div class="py-2">
				<div class="flex justify-between items-center pr-4">
					<div class="text-lg font-semibold">{address.label}</div>
					<div class="flex gap-2">
						<form action="?/deleteAddress" method="post" use:enhance>
							<input type="hidden" name="addressId" value={address.id} />
							<button>
								<Icon class="text-2xl text-primary" icon="mdi:trash" />
							</button>
						</form>

						<form action="?/deleteAddress" method="post" use:enhance>
							<input type="hidden" name="addressId" value={address.id} />
							<button>
								<Icon class="text-2xl text-primary" icon="mdi:pencil" />
							</button>
						</form>
					</div>
				</div>
				<div>
					{address.street}
				</div>
				<div>
					{address.city}
				</div>
				<div>
					{address.state}
				</div>
				<div>
					{address.country}
				</div>
				<div>
					{address.code}
				</div>
			</div>
		{/each}
	{/if}

	<div class="mt-4">
		<SuperDebug data={$form} />
	</div>
</Page>
