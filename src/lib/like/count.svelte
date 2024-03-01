<script lang="ts">
	import { cn } from '$lib/utils'
	import LikeComponent from './like-component.svelte'

	let _class: string | undefined = undefined
	export { _class as class }

	export let item
	export let type
</script>

<LikeComponent let:Like let:liked {item} {type}>
	<div
		class={cn('w-[5em] flex items-center gap-[0.5em] px-[0.5em] rounded-full', _class)}
		class:bg-accent={liked}
		class:bg-base-100={!liked}
		class:animate-bounce={Like.isPending}
	>
		<div class="m-w-[0.5em] pl-[0.5em] py-[0.25em]" class:text-base-100={liked}>
			<Like.Button />
		</div>
		<div
			class="border-l-2 border-base-200 pr-[0.5em] pl-[0.75em] cursor-default"
			class:text-base-100={liked}
			class:opacity-25={Like.isPending}
		>
			{item._count ? item._count.Likes : 0}
		</div>
	</div>
</LikeComponent>
