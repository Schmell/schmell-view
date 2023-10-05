<script lang="ts">
	import { Button, Form, Input } from '$components/form'

	export let formObj
	export let itemId
	export let type
	// $: console.log('type: ', type)
	export let action
	export let user
</script>

<Form {action} {formObj}>
	<Input {formObj} name="comment" label=" " placeholder="add a comment" />
	<input type="hidden" name="itemId" value={itemId} />
	<input type="hidden" name="type" value={type} />
	<input type="hidden" name="userId" value={user?.userId} />
	<!-- <Button type="submit">Submit</Button> -->
</Form>
