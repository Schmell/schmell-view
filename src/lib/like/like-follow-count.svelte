<script>
	import { LikeButton, LikeAndCount } from '$lib/like'
	import { FollowButton } from '$lib/follow'
	import FollowCount from '$lib/follow/follow-count.svelte'
	// import LikeCount from './like-count.svelte'
	export let item
	export let userId
	export let type
</script>

<div class="flex flex-col items-center">
	<div
		class="p-3 text-xl w-8 h-8 flex items-center justify-center border-2 border-base-300 bg-base-100 rounded-full shadow-lg"
	>
		<LikeAndCount class="text-md" {item} {userId} {type} />
	</div>
	<div
		class="p-4 text-xl w-8 h-8 flex items-center justify-center border-2 border-base-300 bg-base-100 rounded-full shadow-lg"
	>
		<!-- <Icon class="text-base-content" icon="mdi:bell-badge-outline" /> -->
		<FollowCount class="text-md" {item} {userId} {type} />
	</div>
</div>
<!-- </div> -->
