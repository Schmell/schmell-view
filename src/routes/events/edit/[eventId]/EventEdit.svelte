<script>
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { Button, Check, Form, Input, Textarea } from '$components/form';
	import { eventSchema } from './eventSchema';
	// import { EventSchema } from '$lib/server/generated/zod';

	export let data;

	const formObj = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave?',
		validators: eventSchema,
		dataType: 'json'
	});
	$: ({ form } = formObj);
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

	<Input name="titleImage" label="Title Image Url" {formObj} />
	<fieldset name="resultColumns">
		<h3>Result Columns</h3>
		<div class="divider m-0" />
		<div class="">
			<h6>Event Rankings</h6>
			<div class="flex gap-4">
				<span>
					<Check name="rank" group="resultColumns" {formObj} />
				</span>
				<span>
					<Check name="nett" group="resultColumns" {formObj} />
				</span>
				<span>
					<Check name="total" group="resultColumns" {formObj} />
				</span>
			</div>
			<div class="divider" />
			<h6>Display names</h6>
			<div class="flex gap-4">
				<span>
					<Check name="skipper" group="resultColumns" {formObj} />
				</span>
				<span>
					<Check name="boat" group="resultColumns" {formObj} />
				</span>
				<span>
					<Check name="sailNo" group="resultColumns" {formObj} />
				</span>
			</div>
			<div class="divider" />
			<h6>Race Outcomes</h6>
			<div class="flex">
				<span>
					<Check name="points" group="resultColumns" {formObj} />
				</span>
				<span>
					<Check name="position" group="resultColumns" {formObj} />
				</span>
				<span>
					<Check name="finish" group="resultColumns" {formObj} />
				</span>
				<span>
					<Check name="corrected" group="resultColumns" {formObj} />
				</span>
				<span>
					<Check name="elapsed" group="resultColumns" {formObj} />
				</span>
			</div>
		</div>
	</fieldset>
	<Input name="Venue" {formObj} />
	<Button>Submit</Button>
</Form>
<div class="mt-8">
	<SuperDebug data={$form} />
</div>
