<script lang="ts">
	import ErrorLabel from './errorLabel.svelte';
	import Label from './label.svelte';
	import { cn } from '$lib/utils';

	export let name: string;
	export let formObj;
	export let rows: number | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };

	const { form } = formObj;
</script>

<div class="flex flex-col my-1 w-full">
	<Label {name} {formObj} />
	<textarea
		class={cn('textarea textarea-bordered max-w-lg', className)}
		bind:value={$form[name]}
		{name}
		{rows}
	/>
	<ErrorLabel {name} {formObj} />
</div>
