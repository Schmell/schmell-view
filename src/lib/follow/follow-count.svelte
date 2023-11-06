<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { cn } from '$lib/utils'
	import { fail } from '@sveltejs/kit'
	import FollowButton from './follow-button.svelte'

	let _class: string | undefined = undefined
	export { _class as class }

	export let userId: string | undefined

	if (!userId) {
		throw fail(400, { message: 'Invalid userId in follow component' })
	}

	export let item
	// $: console.log('item: ', item)

	export let type: string

	let followAction: Response | undefined

	$: if (followAction?.ok) {
		invalidateAll()
	}

	function checkForUserFollow(item) {
		if (!item.Follow) return false
		if (item.Follow.some((follow) => follow.userId === userId)) {
			return true
		}

		return false
	}
</script>

<div
	class={cn('flex items-center gap-2 px-2 rounded-full', _class)}
	class:bg-accent={checkForUserFollow(item)}
	class:bg-base-100={!checkForUserFollow(item)}
>
	<FollowButton {userId} {item} {type} />

	<div
		class="border-l-2 border-base-200 pl-2 cursor-default"
		class:text-base-100={checkForUserFollow(item)}
	>
		{item._count ? item._count.Follows : 0}
	</div>
</div>
