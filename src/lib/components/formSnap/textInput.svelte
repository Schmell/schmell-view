<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/utils'
	import { Form } from 'formsnap'
	import { getContext } from 'svelte'
	export let config
	// const config: any = getContext('config')
	$: console.log(config)
	// export let name: string
	// export let label: string | undefined = ''
	// export let placeholder: string | undefined = ''
	// export let description: string | undefined = ''
</script>

<!-- <Form.Field {config} {name}>
	<Form.Label>{label ? label : capitalizeFirstLetter(name)}</Form.Label>
	<Form.Input {placeholder} class="input input-bordered" />
	{#if description}
		<Form.Description>{description}</Form.Description>
	{/if}
	<Form.Validation />
</Form.Field> -->
