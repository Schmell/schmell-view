<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { Form, Input } from '$components/form'
	import type { User } from 'lucia'

	export let formObj
	export let itemId: string
	export let type: string
	export let action: string
	export let user: User
</script>

<Form {action} {formObj}>
	<div class="join w-full">
		<Input class="join-item" {formObj} name="comment" label=" " placeholder="add a comment" />
		<button class="join-item btn btn-primary w-24 mt-1">post</button>
	</div>
	<input type="hidden" name="itemId" value={itemId} />
	<input type="hidden" name="type" value={type} />
	<input type="hidden" name="userId" value={user?.userId} />
</Form>
