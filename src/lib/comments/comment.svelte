<script lang="ts">
	import Count from '$lib/like/count.svelte'
	import { formatDateTime } from '$lib/utils/formatters'
	import { flyAndScale } from '$lib/utils/transitions'
	import Icon from '@iconify/svelte'
	import type { Like, User } from '@prisma/client'
	import { createMutation, useQueryClient } from '@tanstack/svelte-query'
	import { Avatar, DropdownMenu, LinkPreview } from 'bits-ui'

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

	// let commentMenu: HTMLDetailsElement
	let edit = false
	let readMore = false

	const client = useQueryClient()

	// function getShortItem() {
	// 	console.log(item.comment.length)
	// 	if (item.comment.length > 40) {

	// 	}
	// }
	// getShortItem()

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
			body: JSON.stringify({ id: item.id, comment: item.comment })
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

	// handel's
	function handleSubmit(e: SubmitEvent) {
		e.preventDefault
		e.stopPropagation
		$updateCommentMutation.mutate()
	}

	function handleDelete(e: SubmitEvent) {
		e.preventDefault
		e.stopPropagation
		$deleteCommentMutation.mutate()
	}

	//
</script>

<div class="flex items-start gap-2" class:blur-sm={$deleteCommentMutation.isPending}>
	<!-- User avatar -->
	<LinkPreview.Root>
		<LinkPreview.Trigger>
			<Avatar.Root class="w-8 h-8">
				<a href="/user/{item.User.id}">
					<Avatar.Image class="rounded-full" alt={item.User.username} src={item.User.avatar} />
					<Avatar.Fallback
						class="flex items-center justify-center text-lg border border-base-300 font-bold rounded-full"
						>{item.User.username.charAt(0)}</Avatar.Fallback
					>
				</a>
			</Avatar.Root>
		</LinkPreview.Trigger>
		<LinkPreview.Content
			class="rounded-xl border border-base-300 bg-base-200 p-4 px-8 shadow-lg"
			sideOffset={8}
			transition={flyAndScale}
			transitionConfig={{ duration: 150, y: -10 }}
		>
			<div class="flex items-center gap-2">
				<Avatar.Root class="w-8 h-8">
					<Avatar.Image class="rounded-full" alt={item.User.username} src={item.User.avatar} />
					<Avatar.Fallback class="rounded-full">{item.User.username.charAt(0)}</Avatar.Fallback>
				</Avatar.Root>
				<span>{item.User.username}</span>
			</div>
		</LinkPreview.Content>
	</LinkPreview.Root>

	<div class="flex gap-2 py-2 items-end w-full justify-between pr-4">
		<div class="w-full">
			{#if edit}
				<form on:submit={handleSubmit}>
					<div class="join">
						<input class="input join-item" bind:value={item.comment} />
						<button disabled={$updateCommentMutation.isPending} class="join-item btn btn-primary">
							{#if $updateCommentMutation.isPending}
								<span class="loading loading-dots loading-xs" />
							{/if}
							edit
						</button>
					</div>
				</form>
			{:else}
				<!-- read more here -->
				{#if item.comment.length > 60 && readMore === false}
					<div class="px-4 pb-2">
						{@html item.comment.slice(0, 59)} ...
					</div>
					<div class="w-full flex justify-end">
						<button class="btn btn-xs btn-outline shadow-md" on:click={() => (readMore = true)}>
							read more
						</button>
					</div>
				{:else}
					<div class="px-4 pb-2">
						{@html item.comment}
					</div>
					{#if item.comment.length > 60}
						<div class="w-full flex justify-end">
							<button class="btn btn-xs btn-outline shadow-md" on:click={() => (readMore = false)}>
								read less
							</button>
						</div>
					{/if}
				{/if}
			{/if}
			<!-- need refined time from post here -->
			<div class="text-xs text-accent">{formatDateTime(item?.createdAt ?? new Date())}</div>
		</div>

		<div class="flex items-center gap-4 justify-between relative">
			<!-- <LikeCount type="comment" {item} /> -->

			{#if userId === item.User?.id || userId === item.userId}
				<!-- need dialog here -->
				<div class="pt-1">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Icon icon="mdi:dots-vertical" />
						</DropdownMenu.Trigger>

						<DropdownMenu.Content class="min-w-20 max-w-32" side="left" sideOffset={4}>
							<div class="menu shadow-md dropdown-content z-[1] bg-base-100 rounded-lg">
								<DropdownMenu.Item>
									<button on:click={() => (edit = true)}> Edit </button>
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<form on:submit={handleDelete}>
										<button class="text-error"> Delete </button>
									</form>
								</DropdownMenu.Item>
							</div>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			{/if}

			<div class="text-xs">
				<Count {item} type="comment" />
			</div>
		</div>
	</div>
</div>
<div class="divider m-0" />
