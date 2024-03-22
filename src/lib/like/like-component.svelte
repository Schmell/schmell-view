<script lang="ts">
	import { setContext } from 'svelte'
	import Button from './button.svelte'
	import { createMutation, useQueryClient } from '@tanstack/svelte-query'
	import { goto, invalidateAll } from '$app/navigation'
	import { error, fail } from '@sveltejs/kit'
	import { page } from '$app/stores'
	import { getFlash } from 'sveltekit-flash-message/client'
	import { writable } from 'svelte/store'
	import { toast } from 'svelte-sonner'
	import { delay } from '$lib/utils'

	export let item
	export let type
	let userId: string | null = null

	$: if ($page.data.user) userId = $page.data.user.id

	const client = useQueryClient()

	const flash = getFlash(page)
	function showMessage(message) {
		$flash = message
	}
	const likedByUser = writable(false)

	$: if (userId) {
		likedByUser.set(item.Likes.some((like) => like.userId === userId))
	}

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

	let likeDelay: EpochTimeStamp = 0

	const likeMutate = createMutation({
		mutationFn: likeApi,
		onMutate: async () => {
			likeDelay = Date.now()
		},
		onSuccess: async () => {
			const delta = Date.now() - likeDelay
			await delay(1000 - delta)
		},
		onSettled: async () => {
			if (type === 'comment') {
				await client.invalidateQueries({ queryKey: ['comments'] })
			} else {
				await invalidateAll()
			}
		},
		onError: async () => {
			toast.error('Not Authorized', {
				description: 'You need to be logged in to like stuff',
				cancel: {
					label: 'Cancel'
				},
				action: {
					label: 'Login',
					onClick: () => goto(`/auth/login?from=${$page.url.pathname}`)
				}
			})
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

	$: liked = $likedByUser
	$: Like = { Button, likedByUser, isPending: $likeMutate.isPending }
</script>

<div>
	<slot {Like} {liked} />
</div>
