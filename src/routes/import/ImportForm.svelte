<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$components/form';
	import Icon from '@iconify/svelte';
	export let orgs;
	export let action;

	let loading;

	const onSubmit = () => {
		loading = true;
		return ({ update }) => {
			update();
		};
	};
</script>

<div>
	<form method="POST" {action} enctype="multipart/form-data" use:enhance={onSubmit}>
		<div class="flex flex-col">
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
					<a
						href="/organization/edit/new?from={$page.url.pathname}"
						class="btn btn-primary btn-circle btn-sm hover:btn-primary-focus"
					>
						<Icon class="text-3xl" icon="ic:baseline-add" />
					</a>
				</div>
			</div>
			<Button disabled={loading}>
				{#if loading}
					<span class="loading loading-dots loading-lg" />
				{:else}
					Import
				{/if}
			</Button>
		</div>
	</form>
</div>
