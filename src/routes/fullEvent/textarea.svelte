<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/utils'
	import { Form } from 'formsnap'
	export let config
	export let name
	export let label: string | undefined = undefined
	export let description: string | undefined = undefined
</script>

<Form.Field {config} {name}>
	<Form.Label class="label">{label ?? capitalizeFirstLetter(name)}</Form.Label>
	<Form.Textarea class="textarea textarea-bordered" />
	<Form.Description class="hidden">{description}</Form.Description>
	<Form.Validation class="label label-error" />
</Form.Field>
