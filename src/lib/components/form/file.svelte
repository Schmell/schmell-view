<script lang="ts">
	import Label from './label.svelte';

	export let formObj;
	export let label;
	export let name;
	// export let
</script>

<div class="flex flex-col my-1 w-full">
	<Label {label} {name} {formObj} />
	<input
		type="file"
		{name}
		class="file-input file-input-bordered file-input-accent w-full max-w-lg"
	/>
</div>
