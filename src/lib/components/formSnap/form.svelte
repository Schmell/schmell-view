<script lang="ts">
	import { Form } from 'formsnap'
	import { superForm } from 'sveltekit-superforms/client'
	export let sv
	export let schema
	// export let form
	const { form } = superForm(sv)
	// setContext('config', { form, schema })
</script>

<Form.Root {form} {schema}>
	<slot />
</Form.Root>
