<script>
	import { FollowButton } from '$lib/follow'
	import Like from './like.svelte'
	export let item
	export let type
</script>

<div class="flex items-center gap-1">
	<div
		class="p-3 text-xl w-8 h-8 flex items-center justify-center border-2 border-base-300 bg-base-100 rounded-full shadow-lg"
	>
		<Like {item} {type} />
	</div>
	<div
		class="p-4 text-xl w-8 h-8 flex items-center justify-center border-2 border-base-300 bg-base-100 rounded-full shadow-lg"
	>
		<FollowButton class="text-base-content" {item} {type} />
	</div>
</div>
