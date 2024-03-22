<script lang="ts">
	import { createMutation, useQueryClient } from '@tanstack/svelte-query'
	import type { Comment } from '@prisma/client'
	import { delay } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import { fade, slide } from 'svelte/transition'
	import { toast } from 'svelte-sonner'
	import { goto } from '$app/navigation'

	export let itemId: string
	export let type: string
	export let userId = ''
	let comment: HTMLInputElement
	let formElement: HTMLFormElement
	let focused = false

	const client = useQueryClient()

	async function createComment() {
		await fetch(`/api/comments/comment`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ comment, itemId, type, userId })
		}).then((res) => res.json())
	}

	let addCommentTime = 0
	const addCommentMutation = createMutation({
		mutationFn: createComment,
		onMutate: async () => {
			addCommentTime = Date.now()
		},

		onSuccess: async () => {
			const delta = Date.now() - addCommentTime
			await delay(1000 - delta)
		},

		onSettled: async () => {
			focused = false
			await client.invalidateQueries({ queryKey: ['uniqueUsers'] })
			await client.invalidateQueries({ queryKey: ['comments'] })
			await client.invalidateQueries({ queryKey: ['count'] })
		},

		onError: (err: any, variables: any, context: any) => {
			console.error('comment form Error: ', err, variables, context)
			toast.error('Not Authorized', {
				description: 'You need to be logged in to make a comment',
				action: {
					label: 'Login',
					onClick: () => goto('/auth/login')
				}
			})
			if (context?.previousTodos) {
				client.setQueryData<Comment[]>(['comments'], context.previousTodos)
			}
		}
	})

	function handleSubmit(e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		e.preventDefault
		e.stopPropagation
		$addCommentMutation.mutate(e)
		e.currentTarget.reset()
	}
</script>

<div class="w-full py-4">
	<form bind:this={formElement} on:submit={handleSubmit}>
		<div class="join w-full flex">
			<input
				class="input rounded-lg shadow-lg join-item w-full !outline-none focus:shadow-lg focus:border-r-transparent"
				class:error={$addCommentMutation.isError}
				bind:value={comment}
				on:focus={() => (focused = true)}
				on:blur={() => {
					if (!comment) focused = false
				}}
			/>
			{#if focused}
				<button
					disabled={$addCommentMutation.isPending}
					class="btn btn-ghost bg-base-200 text-xl border-2 border-opacity-10 border-white text-primary shadow-lg join-item w-14"
				>
					<div transition:slide>
						{#if $addCommentMutation.isPending}
							<span class="loading loading-dots loading-xs" />
						{:else}
							<Icon icon="mdi:send" />
						{/if}
					</div>
				</button>
			{/if}
		</div>
	</form>
</div>
