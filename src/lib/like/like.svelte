<script lang="ts">
	import { cn } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import { error, fail } from '@sveltejs/kit'
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query'

	let _class: string | undefined = undefined
	export { _class as class }

	export let userId: string | undefined

	if (!userId) {
		throw error(400, 'Invalid userId in like component')
	}

	export let item
	// $: console.log(item)
	export let type: string

	let likeAction: Response | undefined

	const client = useQueryClient()

	// $: if (likeAction?.ok) {
	// 	invalidateAll()
	// }

	function getUserLikedId(item) {
		const liked = item.Likes.find((like) => {
			const liked = like.userId === userId
			if (liked) return like
		})
		if (liked) return liked.id
		return false
	}

	function checkForUserLike(item) {
		// console.log(item.Likes)
		if (!item.Likes) return false
		if (item.Likes.some((like) => like.userId === userId)) {
			return true
		}
	}

	async function getLikeApi() {
		// console.log('getLikeApi')
		const endpoint = '/api/newlike'
		return await fetch(`${endpoint}?&type=${type}&id=${item.id}&userId=${userId}`).then((r) =>
			r.json()
		)
	}
	const getLike = createQuery({
		queryFn: getLikeApi,
		queryKey: ['like', item.id],
		initialData: item.Likes
	})
	// if ($getLike.isSuccess) {
	// 	console.log($getLike.data.id)
	// }

	// console.log()

	async function createLikeApi(unlikeId) {
		// console.log(unlikeId)
		return await fetch('/api/newlike', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ type, userId, itemId: item.id, unlikeId })
		}).then((res) => res.json())
	}
	const createLike = createMutation({
		mutationFn: createLikeApi,
		onMutate: async (api) => {
			// need to have a query that we can cancel
			// client.cancelQueries({ queryKey: ['like', item.id] })
			client.cancelQueries({ queryKey: ['like'] })
		},
		onSuccess: async () => {},
		onSettled: async () => {
			await client.invalidateQueries({ queryKey: ['like'] })
		}
	})
	// if ($getLike.isSuccess) {
	// 	console.log($getLike.data.id)
	// 	console.log($getLike.data)
	// }
	// console.log(checkForUserLike(item))
</script>

<div
	class={cn('flex items-center gap-2 px-2 rounded-full', _class)}
	class:bg-accent={$getLike.data?.id}
	class:bg-base-100={!$getLike.data?.id}
>
	{#if $getLike.data?.id}
		<!-- This is the already liked state -->
		<button
			on:click={() => {
				$createLike.mutate(false)
			}}
		>
			<Icon class="text-base-100" icon="mdi:thumb-up" />
		</button>
	{/if}
	{#if $getLike.isPending}
		<button
			on:click={() => {
				$createLike.mutate(false)
			}}
		>
			<Icon class="text-base-100 animate-ping" icon="mdi:thumb-up" />
		</button>
	{/if}
	{#if !$getLike.data?.id}
		<button
			disabled={userId === item.User?.id || userId === item.publisherId}
			on:click={(e) => {
				$createLike.mutate(item.id)
			}}
		>
			<Icon icon="mdi:thumb-up-outline" />
		</button>
	{/if}
</div>
<!-- <pre>{JSON.stringify($getLike.data)}</pre> -->
