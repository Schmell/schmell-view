<script lang="ts">
	export let name;
	export let formObj;
	$: ({ form } = formObj);
</script>

<input {name} type="hidden" bind:value={$form[name]} />
