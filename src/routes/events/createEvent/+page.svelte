<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { Button } from '$components/form'
	import { Page } from '$components/layout'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'

	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let data: PageData
	$: ({ orgs } = data)

	$: if (orgs?.length === 1) {
		// skip the select org if the user has only one org
		orgId = orgs[0].id
		setOrgId()
	}

	let showImport = false
	let step = 'start'
	let orgId = ''
	let loading = false

	function onSubmit() {
		// use:enhance function
		loading = true
		return ({ update }) => {
			update()
		}
	}

	function setOrgId() {
		dispatch('message', {
			value: orgId
		})
		step = 'import'
	}
</script>

<Page title="Create Event">
	{#if showImport}
		<div>
			<ul class="steps w-full maw-w-md mb-2">
				<li class="step" class:step-primary={step === 'start'}>Add Organization</li>
				<li class="step" class:step-primary={step === 'import'}>Import</li>
				<li class="step" class:step-primary={step === 'verify'}>Verify</li>
				<li class="step" class:step-primary={step === 'publish'}>Publish</li>
			</ul>

			<div class="flex flex-col">
				{#if step === 'start'}
					<label for="org" class="label">Organization</label>
					<div class="flex gap-4 items-center w-full mb-5">
						<select bind:value={orgId} name="orgId" class="select select-bordered w-72 grow">
							{#if orgs}
								{#each orgs as org (org.id)}
									<option value={org.id}>{org.name}</option>
								{/each}
							{:else}
								<option disabled selected value="">You have no organizations</option>
							{/if}
							<option value={null}>None</option>
						</select>
						<org class="id" />
						<div class="tooltip tooltip-bottom-right" data-tip="Add Organization">
							<a
								href="/organization/new/edit?from={$page.url.pathname}{$page.url.search}"
								class="btn btn-primary btn-circle btn-sm hover:btn-primary-focus"
							>
								<Icon class="text-3xl" icon="ic:baseline-add" />
							</a>
						</div>
					</div>
					<Button on:click={setOrgId}>Use Organization</Button>
				{/if}

				{#if step == 'import'}
					<form
						method="POST"
						action="?/newImport"
						enctype="multipart/form-data"
						use:enhance={onSubmit}
					>
						<input type="hidden" name="orgId" value={orgId} />
						<div class="h-16 flex items-center">
							{#if loading}
								<progress class="progress progress-accent w-full px-8 h-12 rounded-lg" />
							{:else}
								<input
									type="file"
									name="file"
									class="file-input file-input-bordered file-input-accent w-full max-w-lg"
									on:change={(e) => {
										// console.log(e.target)
									}}
								/>
							{/if}
						</div>
						<input type="hidden" name="orgId" value={orgId} />
						<Button disabled={loading}>
							{#if loading}
								<span class="loading loading-dots loading-lg" />
							{:else}
								Import
							{/if}
						</Button>
					</form>
				{/if}
			</div>
		</div>
	{:else}
		<p class="py-4">
			You can create a brand new event by entering in the info,races and competitors or you can
			upload a Sailwave series
		</p>
		<div class="flex justify-between">
			<button on:click={() => (showImport = !showImport)} class="btn btn-outline mb-6">
				Import Sailwave file
			</button>
			<a href="/events/edit/new" class="btn btn-outline mb-6"> Enter Event manualy </a>
		</div>
	{/if}

	<a href="/import/update"><p class="mt-4">Use Update event to keep your events in sync.</p></a>
</Page>
