<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { cn } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import { error, fail } from '@sveltejs/kit'
	import { fade, blur } from 'svelte/transition'

	let className: string | undefined = undefined
	export { className as class }

	export let userId: string | undefined

	if (!userId) {
		throw error(400, 'Invalid userId in like component')
	}

	export let item

	export let type: string

	let likeAction: Response | undefined
	let likedLoading = false

	$: if (likeAction?.ok) {
		invalidateAll()
	}

	function getUserLikedId(item) {
		const liked = item.Likes.find((like) => {
			const liked = like.userId === userId
			if (liked) return like
		})

		return liked.id
	}

	function checkForUserLike(item) {
		if (!item.Likes) return false
		if (item.Likes.some((like) => like.userId === userId)) {
			return true
		}

		return false
	}

	async function likeApi() {
		await fetch(`/api/like`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ type, userId })
		}).then((res) => res.json())
	}

	async function like(type: string, item, unlike = false) {
		try {
			likedLoading = true
			likeAction = await fetch(
				`/api/like?likeType=${type}&itemId=${item.id}${
					unlike ? `&unlike=${getUserLikedId(item)}` : ''
				}`,
				{ method: 'GET', headers: { 'content-type': 'application/json' } }
			)

			likedLoading = false
		} catch (error) {
			console.log('error: ', error)

			throw fail(400, { message: 'add like error' })
		}
	}
</script>

<div
	class={cn('flex items-center gap-2 px-2 rounded-full', className)}
	class:bg-accent={checkForUserLike(item)}
	class:bg-base-100={!checkForUserLike(item)}
>
	{#if checkForUserLike(item)}
		<button
			on:click={() => {
				// third prop is unlike
				like(type, item, getUserLikedId(item))
			}}
		>
			{#if likedLoading}
				<Icon class=" opacity-25" icon="mdi:thumb-up" />
			{:else}
				<Icon class="text-base-100" icon="mdi:thumb-up" />
			{/if}
		</button>
	{:else}
		<!-- can't like your own comment -->
		<button
			disabled={userId === item.User?.id || userId === item.publisherId}
			on:click={() => {
				like(type, item, false)
			}}
		>
			{#if likedLoading}
				<Icon class="opacity-25" icon="mdi:thumb-up-outline" />
			{:else}
				<Icon icon="mdi:thumb-up-outline" />
			{/if}
			<!-- <Icon icon="mdi:thumb-up-outline" /> -->
		</button>
	{/if}

	<div
		class="border-l-2 border-base-200 pl-2 cursor-default"
		class:text-base-100={checkForUserLike(item)}
	>
		{item._count ? item._count.Likes : 0}
	</div>
</div>
