<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms'
	import { superForm } from 'sveltekit-superforms/client'
	import { Text } from '$components/superForm'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	export let schema
	// $: console.log('schema: ', schema)

	export let action: string | undefined = undefined

	export let form: SuperValidated<typeof schema>

	const formObj = superForm(form, {
		taintedMessage: 'Are you sure you want to leave?',
		autoFocusOnError: true,
		validators: schema,
		dataType: 'json',
		onResult: () => {
			// const from = $page.url.searchParams.get('from') ?? ''
			// goto(from, { replaceState: true })
		},
		onError({ result }) {
			// $message = result.error.message
		}
	})

	const { enhance } = formObj
</script>

<form method="POST" use:enhance>
	<slot form={formObj} />
</form>
