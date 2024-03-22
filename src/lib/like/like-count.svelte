<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { cn, svelog } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import type { Like } from '@prisma/client'
	import { error, fail } from '@sveltejs/kit'
	import { useQueryClient } from '@tanstack/svelte-query'

	type Item = {
		id: string
		Likes: Partial<Like>[]
		publisherId?: string | null
		_count: any
		[key: string]: any
	}

	let className: string | undefined = undefined
	export { className as class }
	export let item: Item
	export let type: string

	let userId
	if ($page.data.user) userId = $page.data.user.id

	let isLoading = false
	let likedByUser = false

	const client = useQueryClient()

	/**
	 * Find the Like id for the liked item
	 * @param {Like[]} likes An array of likes
	 * @param {string} userId a string id of the current user
	 * @returns {string} Either empty string or id of a Like
	 */
	function getUserLikeId(userId: string, likes: Partial<Like>[]) {
		if (!likes) return ''
		const liked = likes.find((like) => like.userId === userId)
		if (liked) return liked.id
		return ''
	}

	$: likedByUser = item.Likes?.some((like) => like.userId === userId)

	async function likeApi(unlikeId?: string) {
		return await fetch(`/api/like`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ itemId: item.id, type, userId, unlikeId })
		}).then((r) => r.json())
	}

	async function like(unlikeId?: string) {
		try {
			isLoading = true
			const action = await likeApi(unlikeId)
			//
			if (action.error) {
				console.log(action.error)
			} else {
				if (type === 'comment') {
					await client.invalidateQueries({ queryKey: ['comments'] })
				} else {
					await invalidateAll()
				}
			}

			isLoading = false
		} catch (error) {
			console.error('like count error: ', error)
			throw fail(400, { message: 'add like error' })
		}
	}
</script>

<div
	class={cn('flex items-center gap-2 px-2 rounded-full', className)}
	class:bg-accent={likedByUser}
	class:bg-base-100={!likedByUser}
	class:animate-bounce={isLoading}
>
	{#if likedByUser}
		<button
			disabled={isLoading}
			on:click={() => {
				like(getUserLikeId($page.data.user.id, item.Likes))
			}}
		>
			{#if !isLoading}
				<Icon class="text-base-100" icon="mdi:thumb-up" />
			{:else}
				<Icon class="opacity-25 animate-pulse" icon="mdi:thumb-up" />
			{/if}
		</button>
	{:else}
		<!-- can't like your own comment -->
		<button
			disabled={userId === item.User?.id || userId === item.publisherId}
			on:click={() => like()}
		>
			{#if isLoading}
				<Icon class="opacity-25 animate-pulse" icon="mdi:thumb-up-outline" />
			{:else}
				<Icon icon="mdi:thumb-up-outline" />
			{/if}
		</button>
	{/if}

	<div class="border-l-2 border-base-200 pl-2 cursor-default" class:text-base-100={likedByUser}>
		{item._count ? item._count.Likes : 0}
	</div>
</div>
