<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Button, Form, Input, Textarea } from '$components/form/index.js'
	import { Page } from '$components/layout'
	import { OrganizationSchema } from '$lib/schemas/generated/zod/index.js'
	import * as flashModule from 'sveltekit-flash-message/client'
	import { superForm } from 'sveltekit-superforms/client'

	export let data

	const formObj = superForm(data.form, {
		autoFocusOnError: true,
		taintedMessage: 'Finish filling out the form or your information will be lost?',
		validators: OrganizationSchema,
		onUpdated() {
			const from = $page.url.searchParams.get('from')
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

	const { form, delayed, timeout } = formObj
</script>

<Page title={$form.name === 'New Organization' ? 'Add a new Organization' : 'Edit Organization'}>
	<Form {formObj}>
		
		<input type="hidden" name="id" value={$form.id}/>
		
		<Input name="name" {formObj} />
		<Input name="logo" {formObj} />
		<Textarea name="description" rows={3} {formObj} />
		<Input name="website" {formObj} />
		<Input name="email" type="email" {formObj} />
		<Input name="titleImage" label="Title Image Url" {formObj} />
		<Button disabled={$delayed}>
			{#if $delayed || $timeout}
				<span class="loading loading-dots loading-md" />
			{:else}
				Submit
			{/if}
		</Button>
	</Form>
</Page>
