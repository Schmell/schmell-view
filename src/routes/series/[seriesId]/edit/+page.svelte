<script lang="ts">
	import { page } from '$app/stores'
	import { Form, Input, Textarea } from '$components/form'
	import { Page } from '$components/layout'
	import { superForm } from 'sveltekit-superforms/client'
	import type { PageData } from './$types'
	import Button from '$components/form/button.svelte'
	import Icon from '@iconify/svelte'
	import { seriesSchema } from './seriesSchema'

	export let data: PageData
	$: ({ form, orgs, events } = data)
	// $: console.log(events)
	// $: console.log(data.form.data)

	const formObj = superForm(data.form, {
		// validators: seriesSchema,
		dataType: 'json'
	})

	// function getSelectedEvents(events) {
	// 	const eventIds = form.data.Events?.map((event) => {
	// 		console.log('event: ', event.id)
	// 		return events.find((ev) => {
	// 			console.log('ev: ', ev.name)
	// 			return ev.id === event.id
	// 		})
	// 	})
	// 	return eventIds
	// }
	// $: console.log(getSelectedEvents(events))

	$: ({ form: supaForm } = formObj)
</script>

<Page title={form.data.name === 'new' ? 'New Series' : form.data.name}>
	<Form action="?/series&{$page.url.searchParams.toString()}" {formObj}>
		<Input name="name" {formObj} />
		<Textarea name="description" rows={4} {formObj} />
		<Input name="logo" {formObj} />
		<Input name="titleImage" label="Title Image" {formObj} />
		<label for="organizationId" class="label"> Organization </label>
		<div class="pb-4 flex gap-2 justify-between items-center">
			<div class="w-full items-center">
				<select
					name="organizationId"
					class="select select-bordered w-full"
					bind:value={$supaForm.organizationId}
				>
					<option value={null}> None </option>
					{#each data.orgs as org}
						<option value={org.id} selected={$supaForm.organizationId ? true : false}>
							{org.name}
						</option>
					{/each}
				</select>
			</div>
			<a
				href="/organization/new/edit?{$page.url.searchParams.toString()}"
				class="text-primary rounded-full shadow-lg"
			>
				<Icon icon="material-symbols:add-circle" width="44" />
			</a>
		</div>

		<div class="pb-4">
			{#if form.data.Events}
				{#each form.data.Events as event}
					<div class="flex justify-between items-center">
						<button formaction="?/deleteEvent&eventId={event.id}">{event.name}</button>
						<Icon icon="mdi:delete-circle" />
					</div>
				{/each}
			{/if}
		</div>

		<hr class="p-0 pb-4 border-success" />

		<div>
			{#each events as event}
				<div class="flex justify-between items-center">
					<button formaction="?/addEvent&eventId={event.id}">{event.name}</button>
					<Icon icon="material-symbols:add-circle" />
				</div>
			{/each}
		</div>

		<Button>Submit</Button>
	</Form>
</Page>
