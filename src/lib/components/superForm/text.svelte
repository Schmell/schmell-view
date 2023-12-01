<script lang="ts">
	export let name: string
	export let label: string | undefined = undefined
	$: errors = Array.from($$props.form.fields[name].errors) ?? undefined
	$: console.log($$props.form.fields[name])
</script>

<label>
	<label for={name} class="label capitalize">{label ?? name}</label>
	<input
		{name}
		bind:value={$$props.form[name]}
		aria-invalid={errors ? 'true' : undefined}
		{...$$props.form.fields[name].constraints}
		{...$$restProps}
		class="input input-bordered w-full max-w-md"
	/>
</label>
{#if errors}<span class="text-error">{errors}</span>{/if}
