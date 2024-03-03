<script lang="ts">
	import Icon from '@iconify/svelte'
	import { cn } from '$lib/utils'
	import { getContext } from 'svelte'
	import { page } from '$app/stores'

	// let _class: string | undefined = undefined
	// export { _class as class }

	export let likedClass: string | undefined = undefined
	export let unlikedClass: string | undefined = undefined

	const { liked, likeMutate, item, userId, getUserLikeId } = getContext('ctx') as any
</script>

<div class="pt-[0.15em]">
	{#if $liked}
		<button
			disabled={$likeMutate.isPending}
			on:click={() => $likeMutate.mutate(getUserLikeId(item.Likes, userId))}
		>
			{#if !$likeMutate.isPending}
				<Icon class={cn('', likedClass)} icon="mdi:thumb-up" />
			{:else}
				<Icon class={cn('opacity-25 animate-pulse', likedClass)} icon="mdi:thumb-up" />
			{/if}
		</button>
	{:else}
		<button
			disabled={$page.data.user.id === item.User?.id || $page.data.user.id === item.publisherId}
			on:click={() => $likeMutate.mutate('')}
		>
			{#if !$likeMutate.isPending}
				<Icon icon={cn('mdi:thumb-up-outline', unlikedClass)} />
			{:else}
				<Icon class={cn('opacity-25 animate-pulse', unlikedClass)} icon="mdi:thumb-up-outline" />
			{/if}
		</button>
	{/if}
</div>
