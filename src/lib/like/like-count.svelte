<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { cn, svelog } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import type { Like, Prisma } from '@prisma/client'
	import { error, fail } from '@sveltejs/kit'
	import { useQueryClient } from '@tanstack/svelte-query'

	type Item = {
		id: string
		Likes: Partial<Like>[]
		publisherId: string | null
		_count: any
		[key: string]: any
	}

	let className: string | undefined = undefined
	export { className as class }
	export let item: Item
	export let userId: string | undefined
	export let type: string

	if (!userId) throw error(400, 'Invalid userId in like component')

	// let action: Response | undefined
	let isLoading = false
	let itemLikedByUser = () => false

	const client = useQueryClient()

	function getUserLikedId() {
		const liked = item.Likes.find((like) => {
			if (like.userId === userId) return like
		})
		return liked?.id
	}

	$: {
		itemLikedByUser = () => {
			if (!item.Likes) return false

			if (item.Likes.some((like) => like.userId === userId)) {
				return true
			}
			return false
		}
	}

	async function likeApi(unlikeId: string | boolean = false) {
		return await fetch(`/api/like`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ itemId: item.id, type, userId, unlikeId })
		}).then((r) => r.json())
	}

	async function like(unlikeId: string | boolean = false) {
		try {
			isLoading = true
			// const action = await fetch(`/api/like?type=${type}&itemId=${item.id}&unlikeId=${unlikeId}`, {
			// 	method: 'GET',
			// 	headers: { 'content-type': 'application/json' }
			// })
			const action = await likeApi(unlikeId)
			//
			if (action.error) {
				console.log(action.error)
			} else {
				await invalidateAll()
				if (type === 'comment') await client.invalidateQueries({ queryKey: ['comments'] })
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
	class:bg-accent={itemLikedByUser()}
	class:bg-base-100={!itemLikedByUser()}
	class:animate-bounce={isLoading}
>
	{#if itemLikedByUser()}
		<button
			disabled={isLoading}
			on:click={() => {
				like(getUserLikedId())
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
		{svelog(item.User?.userId, item.publisherId ?? 'no')}
		<button
			disabled={userId === item.User?.userId || userId === item.publisherId || isLoading}
			on:click={() => like(false)}
		>
			{#if isLoading}
				<Icon class="opacity-25 animate-pulse" icon="mdi:thumb-up-outline" />
			{:else}
				<Icon icon="mdi:thumb-up-outline" />
			{/if}
		</button>
	{/if}

	<div
		class="border-l-2 border-base-200 pl-2 cursor-default"
		class:text-base-100={itemLikedByUser()}
	>
		{item._count ? item._count.Likes : 0}
	</div>
</div>
