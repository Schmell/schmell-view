<script lang="ts">
	import LikeCount from '$lib/like/like-count.svelte'
	import type { CommentPartialWithRelations } from '$lib/schemas/generated/zod'
	import { formatDateTime } from '$lib/utils/formatters'
	import Icon from '@iconify/svelte'
	import type { Like, User } from '@prisma/client'
	import { createMutation, useQueryClient } from '@tanstack/svelte-query'

	// just define whats needed and allow all
	type Item = {
		id: string
		comment: string
		Likes: Like[]
		User: User
		createdAt: Date
		userId: string
		publisherId: string
		_count: string
		[key: string]: any
	}
	export let item: Item
	export let userId = ''

	let commentMenu: HTMLDetailsElement
	let comment = item.comment
	let edit = false

	const client = useQueryClient()

	// Delete
	async function deleteComment() {
		await fetch(`/api/comments/comment`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ item })
		}).then((res) => res.json())
	}
	const deleteCommentMutation = createMutation({
		mutationFn: deleteComment,
		onSuccess: async () => {
			await client.invalidateQueries({ queryKey: ['uniqueUsers'] })
			await client.invalidateQueries({ queryKey: ['comments'] })
			await client.invalidateQueries({ queryKey: ['count'] })
		}
	})

	// Update
	async function updateComment() {
		await fetch(`/api/comments/comment`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: item.id, comment })
		}).then((r) => r.json())
	}
	const updateCommentMutation = createMutation({
		mutationFn: updateComment,
		onMutate: async () => {},
		onError: ({ message }) => {
			console.log('message: ', message)
		},

		onSuccess: async () => {
			await client.invalidateQueries({ queryKey: ['comments'] })
			edit = false
		}
	})

	//
</script>

<div class="flex items-start gap-2" class:blur-sm={$deleteCommentMutation.isPending}>
	<div class="avatar pt-3">
		<div class="w-8 h-8 rounded-full">
			<img alt={item.User?.username} src={item.User?.avatar} />
		</div>
	</div>

	<div class="flex gap-2 py-2 items-end w-full justify-between pr-4">
		<div class="w-full">
			<!-- need a read more here -->
			{#if edit}
				<form
					on:submit={(e) => {
						e.preventDefault
						e.stopPropagation
						$updateCommentMutation.mutate()
					}}
				>
					<div class="join">
						<input class="input join-item" bind:value={comment} />
						<button disabled={$updateCommentMutation.isPending} class="join-item btn btn-primary">
							{#if $updateCommentMutation.isPending}
								<span class="loading loading-dots loading-xs" />
							{/if}
							edit
						</button>
					</div>
				</form>
			{:else}
				<div class="px-4 pb-2">{@html item.comment}</div>
			{/if}
			<!-- need refined time from post here -->
			<div class="text-xs text-accent">
				{formatDateTime(item?.createdAt ?? new Date())}
			</div>
		</div>
		{#if userId === item.User?.id || userId === item.userId}
			<details class="dropdown dropdown-end dropdown-left" bind:this={commentMenu}>
				<summary class="btn btn-ghost btn-xs m-0"> <Icon icon="mdi:dots-vertical" /> </summary>
				<ul class="menu shadow-md dropdown-content z-[1] bg-base-100 rounded-lg">
					<li>
						<button
							on:click={() => {
								commentMenu.open = false
								edit = true
							}}
						>
							Edit
						</button>
					</li>
					<li>
						<form
							on:submit={(e) => {
								e.preventDefault
								e.stopPropagation
								$deleteCommentMutation.mutate()
							}}
						>
							<button class="text-error" on:click={() => (commentMenu.open = false)}>
								Delete
							</button>
						</form>
					</li>
				</ul>
			</details>
		{/if}

		<div class="flex flex-col gap-4 justify-between relative">
			<LikeCount type="comment" {item} />
		</div>
	</div>
</div>
<div class="divider m-0" />
