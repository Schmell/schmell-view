<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { cn } from '$lib/utils'
	// import { cn } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import { error, fail } from '@sveltejs/kit'

	let className: string | undefined = undefined
	export { className as class }

	export let userId: string | undefined

	if (!userId) {
		throw error(400, 'Invalid userId in like component')
	}

	export let item

	export let type: string

	let likeAction: Response | undefined

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

	async function like(type: string, item, unlike = false) {
		try {
			likeAction = await fetch(
				`/api/like?likeType=${type}&itemId=${item.id}${
					unlike ? `&unlike=${getUserLikedId(item)}` : ''
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

			throw fail(400, { message: 'add like error' })
		}
	}
</script>

{#if checkForUserLike(item)}
	<button
		on:click={() => {
			// third prop is unlike
			like(type, item, getUserLikedId(item))
		}}
	>
		<Icon class={cn('text-base-100', className)} icon="mdi:thumb-up" />
	</button>
{:else}
	<!-- can't like your own comment -->
	<button
		disabled={userId === item.User?.id || userId === item.publisherId}
		on:click={() => {
			like(type, item, false)
		}}
	>
		<Icon class={cn('text-base-100', className)} icon="mdi:thumb-up-outline" />
	</button>
{/if}
