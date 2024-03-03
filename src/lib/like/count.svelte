<script lang="ts">
	import { cn } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import LikeComponent from './like-component.svelte'

	let _class: string | undefined = undefined
	export { _class as class }

	export let item
	export let type
	$: console.log(type)
</script>

<LikeComponent let:Like let:liked {item} {type}>
	<div class={cn('outer rounded-full', _class)} class:bg-accent={liked} class:bg-base-100={!liked}>
		<div class:text-base-100={liked} class:animate-bounce={Like.isPending}>
			<Like.Button />
		</div>
		<div class="select-none" class:text-base-100={liked}><Icon icon="mdi:dots-vertical" /></div>
		<div class=" select-none" class:text-base-100={liked} class:opacity-25={Like.isPending}>
			{item._count ? item._count.Likes : 0}
		</div>
	</div>
</LikeComponent>

<style>
	.outer {
		display: grid;
		grid-template-columns: 1fr 0.15em 1fr;
		justify-items: center;
		align-items: center;
	}
	.outer > div {
		margin: 0.15em;
		padding-inline: 0.5em;
	}
</style>
