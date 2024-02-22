<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { cn } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import { error, fail } from '@sveltejs/kit'

	let _class: string | undefined = undefined
	export { _class as class }

	export let type: string
	export let item
	export let userId: string | undefined

	if (!userId) {
		throw error(400, 'Invalid userId in like component')
	}

	let followAction: Response | undefined

	$: if (followAction?.ok) {
		invalidateAll()
	}

	function getUserFollowedId(item) {
		console.log('item: ', item)
		const followed = item.Follows.find((follow) => {
			const followed = follow.userId === userId
			if (follow) return followed
		})
		// console.log('followed: ', followed)
		return followed.id
	}

	function checkForUserFollow(item) {
		// console.log('item: ', item)
		if (!item.Follows) return false
		if (item.Follows.some((follow) => follow.userId === userId)) {
			return true
		}

		return false
	}

	async function follow(type: string, item, unfollow = false) {
		try {
			followAction = await fetch(
				`/api/follow?followType=${type}&itemId=${item.id}${
					unfollow ? `&unfollow=${getUserFollowedId(item)}` : ''
				}`,

				{
					method: 'GET',
					headers: {
						'content-type': 'application/json'
					}
				}
			)
		} catch (error) {
			console.log('error: ', error)

			throw fail(400, { message: 'add follow error' })
		}
	}

	// $: console.log(checkForUserFollow(item))
</script>

{#if checkForUserFollow(item)}
	<button
		aria-label="follow"
		on:click={() => {
			follow(type, item, getUserFollowedId(item))
		}}
	>
		<Icon class={cn('text-base-content', _class)} icon="mdi:bell-ring" />
	</button>
{:else}
	<!-- can't follow your own stuff -->
	<!-- -->
	<button
		aria-label="follow"
		disabled={userId === item.User?.id || userId === item.publisherId}
		on:click={() => {
			follow(type, item, false)
		}}
	>
		<Icon class={cn('text-base-content', _class)} icon="mdi:bell-badge-outline" />
	</button>
{/if}
