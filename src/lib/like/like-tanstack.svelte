<script lang="ts">
	import { cn } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query'

	type Item = {
		id: string
		publisherId?: string | null
		[key: string]: any
	}
	type Like = {
		id: string
		userId: string
		[key: string]: any
	}
	/** Item typedef
	 * @typedef Item
	 * @type {object}
	 * @property {string} id - an id string
	 * @property {*=} rest - the rest of Item we don't care about
	 */

	/** Like typedef
	 * @typedef Like
	 * @type {object}
	 * @property {string} id - an id string
	 * @property {string} userId - current User id string.
	 * @property {*=} rest - the rest of Like we don't care about
	 */

	let _class: string | undefined = undefined
	export { _class as class }

	export let item: Item
	export let type: string
	export let userId: string = ''
	let likedByUser = false

	const client = useQueryClient()

	/**
	 * Find the Like id for the liked item
	 * @param {Like[]} likes An array of likes
	 * @param {string} userId a string id of the current user
	 * @returns {string} Either empty string or id of a Like
	 */
	function getUserLikeId(likes: Like[] | undefined, userId: string) {
		if (!likes) return ''
		const liked = likes.find((like) => like.userId === userId)
		if (liked) return liked.id
		return ''
	}

	/**
	 * Check if current User likes this item
	 * @param {Like[]} likes An array of likes
	 * @param {string} userId a string id of the current user
	 * @returns {boolean} returns true if item is Liked by the current User
	 */
	function itemLikedByUser(likes: Like[] | undefined, userId: string) {
		if (!likes) return false
		return likes.some((like) => like.userId === userId)
	}

	async function likeApi(): Promise<Like[]> {
		return await fetch(`/api/like?itemId=${item.id}&type=${type}`).then((res) => res.json())
	}
	const getLikes = createQuery({
		queryFn: likeApi,
		queryKey: ['likes', item.id],
		initialData: item.Likes
	})

	/**
	 * Create or delete Like API call
	 * @param {string} unlikeId with id string deletes like. Empty string creates like
	 * @returns {Promise<Like[]>} An array of Like
	 */
	async function createLikeApi(unlikeId: string): Promise<Like[]> {
		return await fetch('/api/like', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ type, userId: userId, itemId: item.id, unlikeId })
		}).then((res) => res.json())
	}
	const createLike = createMutation({
		mutationFn: createLikeApi,
		onSuccess: async () => {
			await client.invalidateQueries({ queryKey: ['likes'] })
		}
	})

	$: {
		if ($getLikes.isSuccess || $createLike.isSuccess) {
			likedByUser = itemLikedByUser($getLikes.data, userId)
		}
	}
</script>

<div
	class={cn('flex items-center gap-2 px-2 rounded-full', _class)}
	class:bg-accent={likedByUser}
	class:bg-base-100={!likedByUser}
>
	{#if $createLike.isPending}
		<button disabled>
			<Icon class="text-base-100 animate-ping" icon="mdi:thumb-up" />
		</button>
	{:else}
		{#if likedByUser}
			<button on:click={() => $createLike.mutate(getUserLikeId($getLikes.data, userId))}>
				<Icon class="text-base-100" icon="mdi:thumb-up" />
			</button>
		{/if}

		{#if !likedByUser}
			<button on:click={() => $createLike.mutate('')}>
				<Icon icon="mdi:thumb-up-outline" />
			</button>
		{/if}
	{/if}
</div>
