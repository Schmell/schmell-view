<script lang="ts">
	import Like from './like.svelte'

	let _class: string | undefined = undefined
	export { _class as class }
	export let item
	export let type: string
</script>

<Like {item} {type} class={_class} />

<!-- {#if checkForUserLike(item)}
	<button
		aria-label="like button"
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
	<button
		aria-label="like button"
		disabled={userId === item.User?.id || userId === item.publisherId}
		on:click={() => {
			like(type, item, false)
		}}
	>
		<Icon class={cn('text-base-100', _class)} icon="mdi:thumb-up-outline" />
	</button>
{/if} -->
