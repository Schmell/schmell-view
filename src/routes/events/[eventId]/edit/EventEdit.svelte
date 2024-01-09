<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Button, Check, Form, Input, Label, Textarea } from '$components/form'
	import Icon from '@iconify/svelte'
	import * as flashModule from 'sveltekit-flash-message/client'
	import { superForm } from 'sveltekit-superforms/client'
	import type { PageData } from './$types'
	import { eventSchema } from './eventSchema'
	import { Dialog } from 'bits-ui'

	export let data: PageData

	let fileInfoModal

	const formObj = superForm(data.form, {
		taintedMessage: 'Finish filling out the form or you will loose your data?',
		autoFocusOnError: true,
		validators: eventSchema,
		dataType: 'json',
		onUpdated() {
			const from = $page.url.searchParams.get('from')
			$page.url.searchParams.delete('from')
			if (from) {
				goto(from + $page.url.search, { replaceState: true })
			} else {
				history.replaceState({ from: 'here' }, '')
			}
		},
		onError({ result }) {
			$message = result.error.message
		},
		flashMessage: {
			module: flashModule,
			onError: ({ result, message }) => {
				message.set({ type: 'error', message: result.error.message })
			}
		},

		syncFlashMessage: false
	})

	$: ({ form, message, delayed } = formObj)

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
		<!-- this is probably not going to work -->
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
		<button type="button" class="btn" on:click={() => fileInfoModal.showModal()}>
			<Icon icon="mdi:card-search-outline" /> File info
		</button>
		<dialog id="fileInfoModal" bind:this={fileInfoModal} class="modal">
			<div class="modal-box">
				<div class="font-bold text-lg">File info</div>
				<div class="divider m-0" />
				{#if data.fileInfo}
					<div class="pb-2">
						<div class="text-xs">Name:</div>
						<div class="pl-2">{data.fileInfo.name}</div>
					</div>
					{#if data.fileInfo.lastModified}
						<div class="pb-2">
							<div class="text-xs">Last Modified:</div>
							<div class="pl-2">{new Date(data.fileInfo.lastModified).toDateString()}</div>
						</div>
					{/if}
					{#if data.fileInfo.size}
						<div class="pb-2">
							<div class="text-xs">Size:</div>
							<div class="pl-2">{data.fileInfo.size / 1000} Kb</div>
						</div>
					{/if}
				{:else}
					<div>No file info available</div>
				{/if}

				<div class="modal-action">
					<form method="dialog">
						<button class="btn">Close</button>
					</form>
				</div>
			</div>
		</dialog>
	</div>

	<Input name="name" {formObj} />
	<Textarea name="description" {formObj} />
	<Input name="eventwebsite" label="Website" {formObj} />
	<Input name="email" {formObj} />

	<Label name="Venue" {formObj} />
	<div class="pb-4 flex gap-2 justify-between items-center">
		<select name="venueId" class="select select-bordered w-full" bind:value={$form.venueId}>
			<option value={null} selected={!!$form.venueId}> None </option>
			{#each data.venues as venue}
				<option value={venue.id} selected={!!$form.venueId}>
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
			<Check label="Elapsed" name="resultColumns.elapsed" {formObj} />
		</div>
	</fieldset>

	<Button disabled={$delayed}>
		{#if $delayed}
			<span class="loading loading-dots loading-lg" />
		{:else}
			Submit
		{/if}
	</Button>
</Form>
