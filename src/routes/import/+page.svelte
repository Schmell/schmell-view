<script lang="ts">
	// $: console.log('data: ', data);

	// This page should be multi purpose
	// so make components for each concern
	// initialy this should show th import form
	// get event data
	// checkForDuplicates
	// show a page that has all the upload details/defaults that might need to be set
	//

	// question? can we get the json from the file here
	// maybe make this page not ssr?

	// possibly we // redesign it all
	// import should be apart of creating an event
	// So it should go - create event or update event then attach a resuslts file
	import { Page } from '$components/layout';
	import ImportForm from './ImportForm.svelte';
	import { importState } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import { Button, File } from '$components/form';
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';

	// export let form;
	export let data;
	$: ({ orgs } = data);
	let loading = false;
	// $: ({ status } = form);
	// $: console.log('form.status: ', form);
</script>

<Page title="Import from File">
	<!-- <ImportForm {orgs} /> -->
	<div>
		<form method="POST" enctype="multipart/form-data" use:enhance>
			<div class="flex flex-col">
				<label for="file" class="label">Sailwave File</label>

				<input
					type="file"
					name="file"
					class="file-input file-input-bordered file-input-accent w-full max-w-lg"
				/>
				<!-- <File name="file" {formObj} label="Sailwave File" /> -->
				<label for="org" class="label mt-2">Organization</label>
				<div class="flex gap-4 items-center w-full mb-5">
					<select name="org" class="select select-bordered w-72 grow">
						{#if orgs}
							{#each orgs as org}
								<option value={org.id}>{org.name}</option>
							{/each}
						{:else}
							<option disabled selected value="">You have no organizations</option>
						{/if}
						<option value={null}>None</option>
					</select>
					<div class="tooltip tooltip-bottom-right" data-tip="Add Organization">
						<a href="/organization/edit/new?from=import" class="btn btn-primary btn-circle btn-sm">
							<Icon class="text-3xl" icon="ic:baseline-add" />
						</a>
					</div>
				</div>
				<Button
					on:click={() => {
						loading = true;
					}}
					disabled={loading}
				>
					{#if loading}
						<span class="loading loading-dots loading-lg" />
					{:else}
						Import
					{/if}
				</Button>
			</div>
		</form>
	</div>
	<p>Under here</p>
	{#if $importState}
		<p>{$importState}</p>
	{/if}
	<!-- <p>{data.}</p> -->
</Page>
