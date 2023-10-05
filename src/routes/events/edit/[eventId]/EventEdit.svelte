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

	<!-- <fieldset name="resultColumns">
		<h3>Result Columns</h3>
		<div class="divider m-0" />
		<div class="">
			<h6>Event Rankings</h6>
			<div class="flex gap-4">
				<span>
					<Check label="Rank" name="resultColumns.rank" {formObj} />
				</span>
				<span>
					<Check label="Nett" name="resultColumns.nett" {formObj} />
				</span>
				<span>
					<Check label="Total" name="resultColumns.total" {formObj} />
				</span>
			</div>

			<div class="divider" />

			<h6>Display names</h6>
			<div class="flex gap-4">
				<span>
					<Check label="Skipper" name="resultColumns.skipper" {formObj} />
				</span>
				<span>
					<Check label="Boat" name="resultColumns.boat" {formObj} />
				</span>
				<span>
					<Check label="Sail No." name="resultColumns.sailNo" {formObj} />
				</span>
			</div>

			<div class="divider" />

			<h6>Race Outcomes</h6>
			<div class="flex">
				<span>
					<Check label="Points" name="resultColumns.points" {formObj} />
				</span>
				<span>
					<Check label="Position" name="resultColumns.position" {formObj} />
				</span>
				<span>
					<Check label="Finish" name="resultColumns.finish" {formObj} />
				</span>
				<span>
					<Check label="Corrected" name="resultColumns.corrected" {formObj} />
				</span>
				<span>
					<Check label="Elapsed" name="resultColumns.elapsed" {formObj} />
				</span>
			</div>
		</div>
	</fieldset> -->

	<Button>Submit</Button>
</Form>
{#if dev}
	<div class="mt-8">
		<SuperDebug data={$form} />
	</div>
{/if}
