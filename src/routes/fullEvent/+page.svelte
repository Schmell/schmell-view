<script lang="ts">
	import type { PageData } from './$types'
	import { FormPrimitive as Form } from '$lib/components/ui/form'
	import { fullEventSchema } from './fullEventSchema'
	import { Page } from '$components/layout'
	import Textarea from './textarea.svelte'

	export let data: PageData
</script>

<Page title="full event">
	<Form.Root form={data.form} schema={fullEventSchema} let:config debug={true}>
		<Form.Field {config} name="public">
			<Form.Label>Public</Form.Label>
			<Form.Checkbox />
			<Form.Description>Is this event for public consumtion?</Form.Description>
			<Form.Validation />
		</Form.Field>
		<Form.Field {config} name="eventName">
			<Form.Label>Name</Form.Label>
			<Form.Input />
			<Form.Description>Name of the event.</Form.Description>
			<Form.Validation />
		</Form.Field>
		<Form.Field {config} name="eventWebsite">
			<Form.Label class="label">Website</Form.Label>
			<Form.Input class="input" />
			<Form.Description class="hidden">Web address.</Form.Description>
			<Form.Validation />
		</Form.Field>
		<Form.Field {config} name="eventDescription">
			<Form.Label>Description</Form.Label>
			<Form.Textarea />
			<Form.Description>Provide a short description here.</Form.Description>
			<Form.Validation class="" />
		</Form.Field>
		<Textarea {config} name="desc" />
		<Form.Field {config} name="email">
			<Form.Label>Email</Form.Label>
			<Form.Input />
			<Form.Description>Use your company email if you have one.</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Root>
</Page>

<style>
	/* input {
		@apply input input-bordered w-full max-w-xs;
	} */
</style>
