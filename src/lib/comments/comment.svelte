<script lang="ts">
	import Count from '$lib/like/count.svelte'
	import { formatDateTime } from '$lib/utils/formatters'
	import { flyAndScale } from '$lib/utils/transitions'
	import Icon from '@iconify/svelte'
	import type { Like, User } from '@prisma/client'
	import { createMutation, useQueryClient } from '@tanstack/svelte-query'
	import { Avatar, DropdownMenu, LinkPreview } from 'bits-ui'
	import { fly, slide } from 'svelte/transition'

	// ✔️ just define whats needed and allow all the rest
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

	let edit = false
	let readMore = false
	let focused = false

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
			body: JSON.stringify({ id: item.id, comment: item.comment })
		}).then((r) => r.json())
	}
	const updateCommentMutation = createMutation({
		mutationFn: updateComment,
		onMutate: async () => {
			return { waiting: true }
		},
		onError: ({ message }) => {
			console.log('message: ', message)
		},

		onSuccess: async () => {
			focused = false
			await client.invalidateQueries({ queryKey: ['comments'] })
			edit = false
		}
	})

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
			<Avatar.Root class="w-8 h-8 rounded-full bg-neutral-content bg-opacity-45">
				<a href="/user/{item.User.id}">
					<Avatar.Image class="" alt={item.User.username} src={item.User.avatar} />
					<Avatar.Fallback
						class="flex items-center justify-center text-lg border border-base-300 font-bold rounded-full"
					>
						{item.User.username.charAt(0)}
					</Avatar.Fallback>
				</a>
			</Avatar.Root>
		</LinkPreview.Trigger>
		<LinkPreview.Content
			class="rounded-xl border border-base-300 bg-base-200 p-4 px-8 shadow-lg"
			transition={flyAndScale}
			transitionConfig={{ duration: 150, y: -10 }}
			sideOffset={8}
		>
			<div class="flex items-center gap-2">
				<Avatar.Root class="w-8 h-8 rounded-full bg-neutral-content bg-opacity-45">
					<Avatar.Image class="" alt={item.User.username} src={item.User.avatar} />
					<Avatar.Fallback class="">{item.User.username.charAt(0)}</Avatar.Fallback>
				</Avatar.Root>
				<span>{item.User.username}</span>
			</div>
		</LinkPreview.Content>
	</LinkPreview.Root>

	<div class=" py-2 w-full justify-between pr-4">
		<div class="w-full">
			{#if edit}
				<form on:submit={handleSubmit} class="join w-full pb-2">
					<input
						class="input join-item w-full !outline-none focus:shadow-lg focus:border-r-transparent"
						bind:value={item.comment}
						on:focus={() => (focused = true)}
					/>
					{#if focused}
						<button
							disabled={$updateCommentMutation.isPending}
							class="join-item btn btn-ghost border-2 border-opacity-10 border-white"
						>
							<div in:slide out:slide={{ delay: 500, duration: 500 }}>
								{#if $updateCommentMutation.isPending}
									<span class="loading loading-dots loading-xs" />
								{:else}
									<Icon class="text-xl" icon="mdi:send" />
								{/if}
							</div>
						</button>
					{/if}
				</form>
			{:else if item.comment.length > 75 && readMore === false}
				<div class="px-4">
					{@html item.comment.slice(0, 74)} ...
				</div>
				<div class="w-full flex justify-end">
					<button class="btn btn-xs btn-ghost shadow-md" on:click={() => (readMore = true)}>
						more
					</button>
				</div>
			{:else}
				<div class="px-4">
					{@html item.comment}
				</div>
				{#if item.comment.length > 60}
					<div class="w-full flex justify-end">
						<button class="btn btn-xs btn-ghost shadow-md" on:click={() => (readMore = false)}>
							less
						</button>
					</div>
				{/if}
			{/if}
			<!-- need refined time from post here -->
		</div>

		<div class="flex items-center gap-4 justify-between relative">
			<div class="text-xs text-accent">{formatDateTime(item?.createdAt ?? new Date())}</div>
			<div class="flex items-center gap-3">
				{#if userId === item.User?.id || userId === item.userId}
					<div class="pt-1">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Icon icon="mdi:dots-vertical" />
							</DropdownMenu.Trigger>

							<DropdownMenu.Content
								class="dropdown-content gap-2 z-[1] menu shadow-lg uppercase bg-base-300 rounded-box min-w-24"
								side="left"
								sideOffset={4}
							>
								<DropdownMenu.Item class=" p-1 pl-2 hover:bg-base-100 rounded-md">
									<button on:click={() => (edit = true)} class="flex items-center gap-2">
										<Icon class="" icon="mdi:pencil-outline" /> Edit
									</button>
								</DropdownMenu.Item>
								<DropdownMenu.Item class="p-1 pl-2 hover:bg-base-100 rounded-md">
									<form on:submit={handleDelete}>
										<button class="text-error flex items-center gap-2">
											<Icon icon="mdi:trash-outline" /> Delete
										</button>
									</form>
								</DropdownMenu.Item>
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
</div>
<div class="divider m-0" />
