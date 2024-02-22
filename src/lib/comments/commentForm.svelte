<script lang="ts">
	import { createMutation, useQueryClient } from '@tanstack/svelte-query'
	import type { Comment } from '@prisma/client'

	export let itemId: string
	export let type: string
	export let userId = ''
	let comment: HTMLInputElement
	let formElement: HTMLFormElement

	const client = useQueryClient()

	async function createComment() {
		await fetch(`/api/comments/comment`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ comment, itemId, type, userId })
		}).then((res) => res.json())
	}

	const addCommentMutation = createMutation({
		mutationFn: createComment,
		onMutate: async () => {
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await client.cancelQueries({ queryKey: ['uniqueUsers'] })
			// await client.cancelQueries({ queryKey: ['count'] })
			await client.cancelQueries({ queryKey: ['comments'] })

			// Snapshot the previous value
			const previousComments = client.getQueryData<any>(['comments', 1])

			// Optimistically update to the new value
			// if (previousComments) {
			// 	console.log(comment)
			// 	const newComment = { id: null, userId, type, comment }
			// 	previousComments.pages.push(newComment)
			// 	// console.log(previousComments.pages)

			// 	client.setQueryData<any>(['comments', 1], {
			// 		...previousComments,
			// 		items: [newComment]
			// 	})
			// 	// console.log(client.getQueryData(['comments', 1]))
			// }

			return { previousComments }
		},

		// If the mutation fails, use the context return ed from onMutate to roll back
		onError: (err: any, variables: any, context: any) => {
			console.error('comment form Error: ', err, variables, context)
			if (context?.previousTodos) {
				client.setQueryData<Comment[]>(['comments'], context.previousTodos)
			}
		},
		// Always refetch after error or success:
		onSuccess: async () => {
			// await client.resetQueries()
			await client.invalidateQueries({ queryKey: ['uniqueUsers'] })
			await client.invalidateQueries({ queryKey: ['comments'] })
			// await client.invalidateQueries({ queryKey: ['count'] })
		}
	})
</script>

<div class="w-full pt-2">
	<!-- can't use enhance here -->
	<form
		bind:this={formElement}
		on:submit={(e) => {
			e.preventDefault
			e.stopPropagation
			formElement.reset()
			$addCommentMutation.mutate(e)
		}}
	>
		<div class="join w-full flex">
			<input
				class="input rounded-r-none shadow-lg join-item w-full"
				class:error={$addCommentMutation.isError}
				bind:value={comment}
			/>
			<button
				disabled={$addCommentMutation.isPending}
				class="btn btn-primary shadow-lg join-item w-24"
			>
				{#if $addCommentMutation.isPending}
					<span class="loading loading-dots loading-xs" />
				{:else}
					Post
				{/if}
			</button>
		</div>
	</form>
</div>

<!-- <Form {action} {formObj}>
	<input type="hidden" name="itemId" value={itemId} />
	<input type="hidden" name="type" value={type} />
	<input type="hidden" name="userId" value={userId} />
	<div class="join w-full">
		<Input
			{formObj}
			name="comment"
			label=" "
			placeholder="add a comment"
			class="rounded-r-none shadow-lg join-item"
		/>
		{#if $delayed}
			<button class="join-item btn btn-primary w-24 mt-1" disabled={$delayed}>
				<span class="loading loading-dots loading-md" />
			</button>
		{:else}
			<button class="join-item btn btn-primary w-24 mt-1"> post </button>
		{/if}
	</div>
</Form> -->
