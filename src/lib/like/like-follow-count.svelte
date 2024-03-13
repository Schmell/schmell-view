<script>
	import Icon from '@iconify/svelte'

	export let count
</script>

<div class="flex gap-1 items-center min-w-fit text-xs pr-2">
	{#if count}
		{#if count.Likes}
			<Icon icon="mdi:thumb-up" />
		{:else}
			<Icon icon="mdi:thumb-up-outline" />
		{/if}
		{count.Likes} /
		{#if count.Follows}
			<Icon icon="mdi:bell-ring" />
		{:else}
			<Icon icon="mdi:bell-ring-outline" />
		{/if}
		{count.Follows}
	{/if}
</div>
