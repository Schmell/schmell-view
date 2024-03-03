<script lang="ts">
	import { setContext } from 'svelte'
	import Button from './button.svelte'
	import { createMutation, useQueryClient } from '@tanstack/svelte-query'
	import { invalidateAll } from '$app/navigation'
	import { error, fail } from '@sveltejs/kit'
	import { page } from '$app/stores'
	import { getFlash } from 'sveltekit-flash-message/client'
	import { writable } from 'svelte/store'

	export let item
	export let type

	if (!$page.data.user) throw error(400, 'Invalid userId in like component')
	$: userId = $page.data.user.id
	// const userId = writable('')
	// let likedByUser = false

	const client = useQueryClient()

	const flash = getFlash(page)
	function showMessage(message) {
		$flash = message
	}
	const likedByUser = writable({})
	$: likedByUser.set(item.Likes.some((like) => like.userId === userId))

	/**
	 * Find the Like id for the liked item
	 * @param {Like[]} likes An array of likes
	 * @param {string} userId a string id of the current user
	 * @returns {string} Either empty string or id of a Like
	 */
	function getUserLikeId(likes) {
		const liked = likes.find((like) => like.userId === userId)
		if (!liked) return ''
		return liked.id
	}

	async function likeApi(unlikeId: any) {
		return await fetch(`/api/like`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				itemId: item.id,
				userId,
				type,
				unlikeId
			})
		}).then((res) => res.json())
	}
	const likeMutate = createMutation({
		mutationFn: likeApi,
		onSuccess: async () => {
			if (type === 'comment') {
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

	$: {
		setContext('ctx', {
			liked: likedByUser,
			userId,
			type,
			likeMutate: likeMutate,
			mutate: $likeMutate.mutate,
			getUserLikeId,
			item
			// checkForUserLike
		})
	}
	// let liked
	$: liked = $likedByUser

	// let Like
	$: Like = { Button, likedByUser, isPending: $likeMutate.isPending }
</script>

<div>
	<slot {Like} {liked} />
</div>
