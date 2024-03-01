<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { cn } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import type { Like } from '@prisma/client'
	import { error, fail } from '@sveltejs/kit'
	import { createMutation, useQueryClient } from '@tanstack/svelte-query'
	import { getFlash } from 'sveltekit-flash-message/client'

	type Item = {
		id: string
		type: string
		Likes: Partial<Like>[]
		publisherId?: string | null
		_count: any
		[key: string]: any
	}

	let _class: string | undefined = undefined
	export { className as class }
	export let item: Item
	export let type: string

	if (!$page.data.user) throw error(400, 'Invalid userId in like component')
	let userId = $page.data.user.id
	let likedByUser = false

	const client = useQueryClient()

	const flash = getFlash(page)
	function showMessage(message) {
		$flash = message
	}

	/**
	 * Find the Like id for the liked item
	 * @param {Like[]} likes An array of likes
	 * @param {string} userId a string id of the current user
	 * @returns {string} Either empty string or id of a Like
	 */
	function getUserLikeId(likes: Partial<Like>[], userId: string) {
		const liked = likes.find((like) => like.userId === userId)
		if (!liked) return ''
		return liked.id
	}

	$: likedByUser = item.Likes.some((like) => like.userId === userId)

	async function likeApi(unlikeId: any) {
		return await fetch(`/api/like`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ itemId: item.id, userId, type, unlikeId })
		}).then((res) => res.json())
	}
	const likeMutate = createMutation({
		mutationFn: likeApi,
		onSuccess: async () => {
			if (item.type === 'comment') {
				await client.invalidateQueries({ queryKey: ['comments'] })
			} else {
				await invalidateAll()
			}
		},
		onError: () => {
			showMessage({ type: 'error', message: 'API error' })
			throw fail(400, { message: 'add like error' })
		}
	})
</script>

<div class={cn('text-base-content', _class)}>
	{#if likedByUser}
		<button
			disabled={$likeMutate.isPending}
			on:click={() => $likeMutate.mutate(getUserLikeId(item.Likes, userId))}
		>
			{#if !$likeMutate.isPending}
				<Icon class="" icon="mdi:thumb-up" />
			{:else}
				<Icon class="opacity-25 animate-pulse" icon="mdi:thumb-up" />
			{/if}
		</button>
	{:else}
		<button
			disabled={userId === item.User?.id || userId === item.publisherId}
			on:click={() => $likeMutate.mutate('')}
		>
			{#if $likeMutate.isPending}
				<Icon class="opacity-25 animate-pulse" icon="mdi:thumb-up-outline" />
			{:else}
				<Icon icon="mdi:thumb-up-outline" />
			{/if}
		</button>
	{/if}
</div>
