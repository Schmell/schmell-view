<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { cn } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import type { Follow } from '@prisma/client'
	import { error, fail, json } from '@sveltejs/kit'
	import { createMutation } from '@tanstack/svelte-query'
	import { getFlash } from 'sveltekit-flash-message/client'

	let _class: string | undefined = undefined
	export { _class as class }

	type Item = {
		id: string
		Follows: Partial<Follow>[]
		publisherId?: string | null
		// _count: any
		[key: string]: any
	}

	export let item: Item | null
	export let type: string
	let userId: string
	if ($page.data.user) userId = $page.data.user.id

	const flash = getFlash(page)
	function showMessage(message) {
		$flash = message
	}

	function getUserFollowedId(follows: Partial<Follow>[]) {
		const followed = follows.find((follow) => {
			return follow.userId === userId
		})
		return followed?.id
	}

	let followedId
	$: if (item?.Follows) {
		followedId = getUserFollowedId(item.Follows)
	}

	let followedByUser
	$: if (item?.Follows) {
		followedByUser = item.Follows.some((follow) => follow.userId === userId) ?? false
	}

	async function followApi(unfollowId?: string) {
		if (unfollowId === undefined) return json({ error: 'API error - no unfollow id provided' })
		return await fetch(`/api/follow`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				itemId: item?.id,
				type,
				unfollowId
			})
		})
	}

	const follow = createMutation({
		mutationFn: followApi,
		onSuccess: async () => {
			await invalidateAll()
		},
		onError: () => {
			showMessage({ type: 'error', message: 'API error' })
			throw fail(400, { message: 'add like error' })
		}
	})
</script>

{#if followedByUser}
	<button aria-label="follow" on:click={() => $follow.mutate(followedId)}>
		{#if $follow.isPending}
			<Icon class={cn('opacity-25 animate-pulse text-base-content', _class)} icon="mdi:bell-ring" />
		{:else}
			<Icon class={cn('text-base-content', _class)} icon="mdi:bell-ring" />
		{/if}
	</button>
{:else}
	<button
		aria-label="follow"
		disabled={userId === item?.User?.id || userId === item?.publisherId}
		on:click={() => $follow.mutate('')}
	>
		{#if $follow.isPending}
			<Icon
				class={cn('opacity-25 animate-pulse text-base-content', _class)}
				icon="mdi:bell-badge-outline"
			/>
		{:else}
			<Icon class={cn('text-base-content', _class)} icon="mdi:bell-badge-outline" />
		{/if}
	</button>
{/if}
