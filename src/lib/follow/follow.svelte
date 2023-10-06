<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { cn } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import { error, fail } from '@sveltejs/kit'

	let _class: string | undefined = undefined
	export { _class as class }

	export let userId: string | undefined

	if (!userId) {
		throw error(400, 'Invalid userId in like component')
	}

	export let item
	$: console.log('item: ', item)

	export let type: string

	let followAction: Response | undefined

	$: if (followAction?.ok) {
		invalidateAll()
	}

	function getUserFollowedId(item) {
		const followed = item.follow.find((follow) => {
			const followed = follow.userId === userId
			if (follow) return followed
		})

		return followed.id
	}

	function checkForUserFollow(item) {
		if (!item.Follow) return false
		if (item.Follow.some((follow) => follow.userId === userId)) {
			return true
		}

		return false
	}

	async function follow(type: string, item, unfollow = false) {
		try {
			followAction = await fetch(
				`/api/like?likeType=${type}&itemId=${item.id}${
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
</script>

<div
	class={cn('flex items-center gap-2 px-2 rounded-full', _class)}
	class:bg-accent={checkForUserFollow(item)}
	class:bg-base-100={!checkForUserFollow(item)}
>
	{#if checkForUserFollow(item)}
		<button
			on:click={() => {
				// third prop is unlike
				follow(type, item, getUserFollowedId(item))
			}}
		>
			<Icon class="text-base-100" icon="mdi:thumb-up" />
		</button>
	{:else}
		<!-- can't like your own comment -->
		<button
			disabled={userId === item.User?.id || userId === item.publisherId}
			on:click={() => {
				follow(type, item, false)
			}}
		>
			<Icon icon="material-symbols:bookmark-add-outline-rounded" />
		</button>
	{/if}

	<div
		class="border-l-2 border-base-200 pl-2 cursor-default"
		class:text-base-100={checkForUserFollow(item)}
	>
		{item._count ? item._count.Follows : 0}
	</div>
</div>
