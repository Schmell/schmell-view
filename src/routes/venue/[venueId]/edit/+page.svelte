<script lang="ts">
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Button, Form, Input, Textarea } from '$components/form'
	import { Page } from '$components/layout'
	import Icon from '@iconify/svelte'
	import * as flashModule from 'sveltekit-flash-message/client'
	import { superForm } from 'sveltekit-superforms/client'
	import type { PageData } from './$types'
	import { addressSchema, contactSchema, venueSchema } from './schemas'

	export let data: PageData

	let showAddressForm = false
	let showContactForm = false
	let showNameField = false
	let submitting = false

	if ($page.params.venueId === 'new') {
		showNameField = true
	}

	const formObj = superForm(data.venueForm, {
		id: data.venueForm?.id,
		autoFocusOnError: true,
		taintedMessage: 'Finish filling out the form or your information will be lost?',
		validators: venueSchema,
		onUpdated() {
			const from = $page.url.searchParams.get('from')
			$page.url.searchParams.delete('editContact')
			$page.url.searchParams.delete('from')
			goto(from + $page.url.search, { replaceState: true })
		},
		flashMessage: {
			module: flashModule,
			onError: ({ result, message }) => {
				const errorMessage = result.error.message
				message.set({ type: 'error', message: errorMessage })
			}
		}
	})

	const { form, errors, delayed } = formObj

	const addressFormObj = superForm(data.addressForm, {
		taintedMessage: 'Finish filling out the form or your information will be lost?',
		validators: addressSchema,
		onResult: ({ cancel, result }) => {
			if (result.type === 'success') showAddressForm = false
		}
	})

	const contactFormObj = superForm(data.contactForm, {
		taintedMessage: 'Finish filling out the form or your information will be lost?',
		validators: contactSchema,
		onResult: ({ cancel, result }) => {
			if (result.type === 'success') showContactForm = false
		}
	})
</script>

<Page title="Edit Venue">
	<Form action="?/details&{$page.url.searchParams.toString()}" {formObj}>
		{#if showNameField}
			<div class="relative join rounded-lg w-full items-center">
				<Input name="name" {formObj} class="join-item" />
				<button
					on:click={() => (showNameField = false)}
					class="btn btn-primary join-item rounded-r-lg absolute right-0 top-7"
				>
					cancel
				</button>
				<label for="name" class="text-sm absolute top-16 pt-3" class:text-warning={$errors.name}>
					Must be Unique
				</label>
			</div>

			{#if $errors.name?.includes('Duplicate name')}
				<a
					href="/venue/{$page.params.venueId}/merge?name={$form.name}"
					class="btn btn-xs btn-primary"
				>
					Merge this venue
				</a>
			{/if}
		{:else}
			<div class="flex justify-between items-center py-2">
				<input type="hidden" name="name" value={$form.name} />
				<div class="text-lg font-semibold">{$form.name}</div>
				<button
					on:click={() => {
						showNameField = true
					}}
					class="btn btn-xs btn-outline"
				>
					change
				</button>
			</div>
		{/if}
		<Textarea name="description" rows={3} {formObj} />
		<Input name="website" {formObj} />
		<Input name="email" {formObj} />
		<Input name="burgee" {formObj} />
		<Input name="titleImage" label="Title Image" {formObj} />
		<Button disabled={$delayed}>
			{#if $delayed}
				<span class="loading loading-dots loading-md" />
			{:else}
				Submit
			{/if}
		</Button>
	</Form>

	{#if showAddressForm}
		<dialog id="my_modal_2" open={showAddressForm} class="modal pt-16 w-full">
			<div class="modal-box">
				<Form action="?/address" formObj={addressFormObj}>
					{#if $page.url.searchParams.get('editAddress')}
						<input name="id" type="hidden" value={$page.url.searchParams.get('editAddress')} />
					{/if}
					<Input
						name="label"
						label="Label"
						placeholder="Mailing Address"
						formObj={addressFormObj}
					/>
					<Input name="po" label="PO box" formObj={addressFormObj} />
					<Input name="street" formObj={addressFormObj} />
					<div class="grid grid-cols-2 gap-2">
						<Input name="city" formObj={addressFormObj} />
						<Input name="state" label="State/Province" formObj={addressFormObj} />
						<Input name="country" formObj={addressFormObj} />
						<Input name="code" label="Zip/Postal" formObj={addressFormObj} />
					</div>
					<input type="submit" value="submit" class="btn btn-primary w-full" />
				</Form>
			</div>
		</dialog>
	{/if}

	{#if showContactForm}
		<dialog id="my_modal_2" open={showContactForm} class="modal pt-16 w-full">
			<div class="modal-box">
				<Form action="?/contact" formObj={contactFormObj}>
					{#if $page.url.searchParams.get('editContact')}
						<input name="id" type="hidden" value={$page.url.searchParams.get('editContact')} />
					{/if}
					<Input name="label" placeholder="Inquiries" formObj={contactFormObj} />
					<Input name="email" formObj={contactFormObj} />
					<Input name="phone" formObj={contactFormObj} />
					<input type="submit" value="submit" class="btn btn-primary w-full" />
				</Form>
			</div>
		</dialog>
	{/if}

	<div class="grid grid-cols-2">
		<!-- Addresses -->
		<div class="p-2">
			<button
				on:click={() => {
					showAddressForm = true
				}}
				class="btn btn-xs btn-secondary w-full my-4"
			>
				<Icon icon="material-symbols:add-circle" /> add address
			</button>

			{#if data.addresses}
				{#each data.addresses as address}
					<div class="flex justify-between items-center pr-4">
						<div class="text-lg font-semibold">{address.label}</div>

						<div class="flex gap-1 items-center">
							<form action="?/deleteAddress" method="post" use:enhance>
								<input type="hidden" name="addressId" value={address.id} />
								<button>
									<Icon class="text-2xl text-primary" width="20" icon="mdi:trash" />
								</button>
							</form>

							<!-- need this form wrapper to align icons???? -->
							<form>
								<button
									type="button"
									on:click={() => {
										goto(`?editAddress=${address.id}`)
										showAddressForm = true
									}}
								>
									<Icon class="text-2xl text-primary" width="20" icon="mdi:pencil" />
								</button>
							</form>
						</div>
					</div>
					<div class="pl-2 pr-4 pb-4">
						{#if address.po}
							<div>PO Box: {address.po}</div>
						{/if}
						<div>{address.street},</div>
						<span>{address.city},</span>
						<span>{address.state},</span>
						<span>{address.country},</span>
						<span>{address.code}</span>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Contacts -->
		<div class="py-2">
			<button
				on:click={() => {
					showContactForm = true
				}}
				class="btn btn-xs btn-secondary w-full my-4"
			>
				<Icon icon="material-symbols:add-circle" /> add contact
			</button>
			{#if data.contacts}
				{#each data.contacts as contact}
					<div class="pb-2">
						<div class="flex justify-between items-center pr-4">
							<div class="text-lg font-semibold">{contact.label}</div>
							<div class="flex gap-2 items-center">
								<form action="?/deleteContact" method="post" use:enhance>
									<input type="hidden" name="addressId" value={contact.id} />
									<button>
										<Icon class="text-2xl text-primary" width="20" icon="mdi:trash" />
									</button>
								</form>

								<!-- need this form wrapper to align icons???? -->
								<form>
									<button
										type="button"
										on:click={() => {
											// console.log()
											goto(`?${$page.url.search}&editContact=${contact.id}`)
											showContactForm = true
										}}
									>
										<Icon class="text-2xl text-primary" width="20" icon="mdi:pencil" />
									</button>
								</form>
							</div>
						</div>
						<ul class="pl-2">
							{#if contact.email}
								<li>
									<a href="mailto:{contact.email}" class="flex gap-2 items-center">
										<Icon icon="mdi:email" />
										{contact.email}
									</a>
								</li>
							{/if}
							{#if contact.phone}
								<li>
									<a href="tel:{contact.phone}" class="flex gap-2 items-center">
										<Icon icon="mdi:phone" />
										{contact.phone}
									</a>
								</li>
							{/if}
						</ul>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</Page>
