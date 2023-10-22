<script lang="ts">
	import { Form, Input } from '$components/form'

	export let formObj
	export let itemId
	export let type
	// $: console.log('type: ', type)
	export let action
	export let user
</script>

<Form {action} {formObj}>
	<div class="join w-full">
		<Input
			class="join-item rounded-xl"
			{formObj}
			name="comment"
			label=" "
			placeholder="add a comment"
		/>
		<button type="submit" class="join-item btn btn-primary w-24 mt-1">post</button>
	</div>
	<input type="hidden" name="itemId" value={itemId} />
	<input type="hidden" name="type" value={type} />
	<input type="hidden" name="userId" value={user?.userId} />
</Form>
