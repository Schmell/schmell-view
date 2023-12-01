<script lang="ts">
	import { Form, Text } from '$components/superForm'
	import { Page } from '$components/layout'
	import type { PageData } from './$types'
	import { schema } from './schema'

	export let data: PageData
	$: ({ form } = data)
</script>

<Page title="test form">
	<Form {form} {schema} let:form>
		<Text name="name" {form} />
		<button type="submit" class="btn btn-primary w-full max-w-md mt-4">Submit</button>
	</Form>
</Page>
