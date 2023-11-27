<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { cn } from '$lib/utils'
	// import { cn } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import { error, fail } from '@sveltejs/kit'

	let _class: string | undefined = undefined
	export { _class as class }

	export let userId: string | undefined

	if (!userId) {
		throw error(400, 'Invalid userId in like component')
	}

	export let item

	export let type: string

	let likeAction: Response | undefined
	let likeLoading = false

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
			likeLoading = true
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
			likeLoading = false
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
		{#if likeLoading}
			<span class="loading loading-spinner loading-sm" />
		{:else}
			<Icon class={cn('text-base-100', _class)} icon="mdi:thumb-up" />
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
		<Icon class={cn('text-base-100', _class)} icon="mdi:thumb-up-outline" />
	</button>
{/if}
