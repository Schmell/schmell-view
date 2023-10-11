<script>
	import { superForm } from 'sveltekit-superforms/client'
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'
	import { Button, Check, Form, Input, Textarea, Label } from '$components/form'
	import { eventSchema } from './eventSchema'
	import { dev } from '$app/environment'

	export let data

	const formObj = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave?',
		validators: eventSchema,
		dataType: 'json'
	})

	$: ({ form } = formObj)
	// $: console.log('data: ', data.venues)
	// $: console.log('form: ', $form)
</script>

<Form {formObj}>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Public</span>
			<input type="checkbox" name="public" class="toggle toggle-success" checked={$form.public} />
		</label>
	</div>

	<Input name="name" {formObj} />
	<Textarea name="description" {formObj} />
	<Input name="eventwebsite" label="Website" {formObj} />
	<Input name="email" {formObj} />

	<div class="pb-4">
		<Label name="Venue" {formObj} />
		<select
			name="venueId"
			class="select select-bordered w-full max-w-md"
			bind:value={$form.venueId}
		>
			{#each data.venues as venue}
				<option value={venue.id} selected={$form.venueId}>
					{venue.name}
				</option>
			{/each}
		</select>
	</div>

	<Input name="titleImage" label="Title Image Url" {formObj} />

	<fieldset name="resultColumns">
		<legend class="pb-2 w-full">
			<div class="text-2xl">Result Columns:</div>
		</legend>
		<div
			class="w-full p-2 font-semibold bg-gradient-to-r from-base-100 to-base-300 rounded-br-2xl border-t border-accent shadow-md"
		>
			Event Rankings
		</div>
		<div class="flex gap-4 px-2 py-1">
			<Check label="Rank" name="resultColumns.rank" {formObj} />
			<Check label="Nett" name="resultColumns.nett" {formObj} />
			<Check label="Total" name="resultColumns.total" {formObj} />
		</div>

		<div
			class="w-full p-2 font-semibold bg-gradient-to-r from-base-100 to-base-300 rounded-br-2xl border-t border-accent shadow-md"
		>
			Display names
		</div>
		<div class="flex gap-4 px-2 py-1">
			<Check label="Boat" name="resultColumns.boat" {formObj} />
			<Check label="Skipper" name="resultColumns.skipper" {formObj} />
			<Check label="Sail No." name="resultColumns.sailNo" {formObj} />
		</div>

		<div
			class="w-full p-2 font-semibold bg-gradient-to-r from-base-100 to-base-300 rounded-br-2xl border-t border-accent shadow-md"
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

	<Button>Submit</Button>
</Form>
{#if dev}
	<div class="mt-8">
		<SuperDebug data={$form} />
	</div>
{/if}
