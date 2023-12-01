<script lang="ts">
	import { Form, Input } from '$components/form'
	import type { User } from 'lucia'
	import { superForm } from 'sveltekit-superforms/client'
	import * as flashModule from 'sveltekit-flash-message/client'

	export let commentForm
	export let itemId: string
	export let type: string
	export let action: string
	export let user: User

	let submitting = false
	const formObj = superForm(commentForm, {
		onSubmit() {
			submitting = true
		},
		onResult() {
			submitting = false
		},

		flashMessage: {
			module: flashModule,
			onError: ({ result, message }) => {
				message.set({ type: 'error', message: result.error.message })
			}
		}
		//
	})
	$: ({ delayed } = formObj)
</script>

<Form {action} {formObj}>
	<input type="hidden" name="itemId" value={itemId} />
	<input type="hidden" name="type" value={type} />
	<input type="hidden" name="userId" value={user?.userId} />
	<div class="join w-full">
		<Input
			{formObj}
			name="comment"
			label=" "
			placeholder="add a comment"
			class="rounded-r-none shadow-lg"
		/>
		{#if $delayed}
			<button class="join-item btn btn-primary w-24 mt-1" disabled={$delayed}>
				<span class="loading loading-dots loading-md" />
			</button>
		{:else}
			<button class="join-item btn btn-primary w-24 mt-1"> post </button>
		{/if}
	</div>
</Form>
