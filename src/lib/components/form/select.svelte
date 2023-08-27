<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/utils';
	import Label from './label.svelte';

	export let name: string;
	export let items;
	export let label: string | undefined = undefined;
	export let formObj;
	export let change: any | undefined = '';

	const { form } = formObj;
</script>

<div class="flex flex-col my-1 w-full">
	<Label {label} {name} {formObj} />

	<select {name} class="select select-bordered w-full max-w-md" on:change={change}>
		{#each items as item}
			<option value={item} selected={item === $form[name]}>
				{capitalizeFirstLetter(item)}
			</option>
		{/each}
	</select>
</div>
