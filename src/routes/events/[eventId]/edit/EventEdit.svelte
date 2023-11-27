<script lang="ts">
	import { page } from '$app/stores'
	import { Button, Check, Form, Input, Label, Textarea } from '$components/form'
	import Icon from '@iconify/svelte'
	import { superForm } from 'sveltekit-superforms/client'
	import { eventSchema } from './eventSchema'
	import { goto } from '$app/navigation'
	import * as flashModule from 'sveltekit-flash-message/client'

	export let data

	let submitting = false

	const formObj = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave?',
		validators: eventSchema,
		dataType: 'json',
		onSubmit: () => {
			submitting = true
		},
		onResult: () => {
			const from = $page.url.searchParams.get('from') ?? ''
			// console.log($page.url.searchParams.get('from'))
			goto(from, { replaceState: true })
		},
		onError({ result }) {
			$message = result.error.message
		},
		flashMessage: {
			module: flashModule,
			onError: ({ result, message }) => {
				// Error handling for the flash message:
				// - result is the ActionResult
				// - message is the flash store (not the status message store)
				const errorMessage = result.error.message
				message.set({ type: 'error', message: 'error' })
			}
		},
		syncFlashMessage: false
	})

	$: ({ form, message } = formObj)

	function getUniqueIdString() {
		return (
			$form.name.toLowerCase().trim().split(' ').join('_') +
			'-' +
			$form.eventeid +
			'-' +
			$form.Venue.name.toLowerCase().trim().split(' ').join('_')
		)
	}
</script>

<Form {formObj}>
	<div class="flex items-center gap-6">
		{#if $form.eventeid}
			<input name="eventeid" type="hidden" bind:value={$form.eventeid} />
		{:else}
			<Input name="eventeid" {formObj} />
		{/if}
		<!-- //////////////////////////////////////////////////////////////////// -->
		<!-- this is probably mpot going to work -->
		{#if !$form.uniqueIdString}
			<input name="uniqueIdString" type="hidden" value={getUniqueIdString} />
		{/if}
		<!-- ///////////////////////////////////////////////////////////// -->
		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text pr-4">Public</span>
				<input
					type="checkbox"
					name="public"
					class="toggle toggle-success"
					bind:checked={$form.public}
				/>
			</label>
		</div>

		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text pr-4">Complete</span>
				<input
					type="checkbox"
					name="complete"
					class="toggle toggle-success"
					bind:checked={$form.complete}
				/>
			</label>
		</div>
	</div>

	<Input name="name" {formObj} />
	<Textarea name="description" {formObj} />
	<Input name="eventwebsite" label="Website" {formObj} />
	<Input name="email" {formObj} />

	<Label name="Venue" {formObj} />
	<div class="pb-4 flex gap-2 justify-between items-center">
		<select name="venueId" class="select select-bordered w-full" bind:value={$form.venueId}>
			<option value={null} selected={$form.venueId}> None </option>
			{#each data.venues as venue}
				<option value={venue.id} selected={$form.venueId}>
					{venue.name}
				</option>
			{/each}
		</select>
		<a
			href="/venue/new/edit?{$page.url.searchParams.toString()}"
			class="text-primary rounded-full shadow-lg"
		>
			<Icon icon="material-symbols:add-circle" width="44" />
		</a>
	</div>

	<Input name="titleImage" label="Title Image Url" {formObj} />

	<fieldset name="resultColumns">
		<legend class="pb-2 w-full">
			<div class="text-2xl">Result Columns:</div>
		</legend>
		<div
			class="w-full p-2 font-semibold bg-gradient-to-r from-base-200 to-base-300 rounded-br-2xl border-t border-accent shadow-md"
		>
			Event Rankings
		</div>
		<div class="flex gap-4 px-2 py-1">
			<Check label="Rank" name="resultColumns.rank" {formObj} />
			<Check label="Nett" name="resultColumns.nett" {formObj} />
			<Check label="Total" name="resultColumns.total" {formObj} />
		</div>

		<div
			class="w-full p-2 font-semibold bg-gradient-to-r from-base-200 to-base-300 rounded-br-2xl border-t border-accent shadow-md"
		>
			Display names
		</div>
		<div class="flex gap-4 px-2 py-1">
			<Check label="Boat" name="resultColumns.boat" {formObj} />
			<Check label="Skipper" name="resultColumns.skipper" {formObj} />
			<Check label="Sail No." name="resultColumns.sailNo" {formObj} />
		</div>

		<div
			class="w-full p-2 font-semibold bg-gradient-to-r from-base-200 to-base-300 rounded-br-2xl border-t border-accent shadow-md"
		>
			Race Outcomes
		</div>
		<div class="flex gap-4 px-2 py-1">
			<Check label="Points" name="resultColumns.points" {formObj} />
			<Check label="Position" name="resultColumns.position" {formObj} />
			<Check label="Finish" name="resultColumns.finish" {formObj} />
			<Check label="Corrected" name="resultColumns.corrected" {formObj} />
			<Check label="Elapsed" name="elapsed" {formObj} />
		</div>
	</fieldset>

	<Button disabled={submitting}>
		{#if submitting}
			<span class="loading loading-dots loading-lg" />
		{:else}
			Submit
		{/if}
	</Button>
</Form>
