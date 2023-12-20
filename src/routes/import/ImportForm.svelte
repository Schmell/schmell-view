<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { Button } from '$components/form'
	import Icon from '@iconify/svelte'

	export let orgs
	export let action
	$: ({ orgs, data } = $$props)

	let orgId
	// $: console.log('orgId: ', orgId)
	$: if (orgId) step = 'import'

	let step = ''
	// $: console.log('step: ', step)

	let selectValue
	// $: console.log('selectValue: ', selectValue)

	let loading
	function onSubmit() {
		// use:enhance function
		loading = true
		return ({ update }) => {
			update()
		}
	}

	function addOrgHandler() {
		orgId = selectValue
	}
</script>

<div>
	<ul class="steps w-full maw-w-md mb-2">
		<li class="step" class:step-primary={!step}>Add Organization</li>
		<li class="step" class:step-primary={step === 'import'}>Import</li>
		<li class="step" class:step-primary={step === 'verify'}>Verify</li>
		<li class="step" class:step-primary={step === 'publish'}>Publish</li>
	</ul>

	<div class="flex flex-col">
		{#if !step}
			<!-- <form method="POST" use:enhance> -->
			<label for="org" class="label">Organization</label>

			<div class="flex gap-4 items-center w-full mb-5">
				<select
					on:input={() => {
						selectValue = selectValue
					}}
					bind:value={selectValue}
					name="orgId"
					class="select select-bordered w-72 grow"
				>
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
					<a
						href="/organization/new/edit?from={$page.url.pathname}{$page.url.search}"
						class="btn btn-primary btn-circle btn-sm hover:btn-primary-focus"
					>
						<Icon class="text-3xl" icon="ic:baseline-add" />
					</a>
				</div>
			</div>

			<Button on:click={addOrgHandler}>Add Organization</Button>
			<!-- </form> -->
		{/if}

		{#if step == 'import'}
			<form method="POST" {action} enctype="multipart/form-data" use:enhance={onSubmit}>
				<div class="h-16 flex items-center">
					{#if loading}
						<progress class="progress progress-accent w-full px-8 h-12 rounded-lg" />
					{:else}
						<input
							type="file"
							name="file"
							class="file-input file-input-bordered file-input-accent w-full max-w-lg"
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
