<script lang="ts">
	import { Page } from '$components/layout'
	import { trpc } from '$lib/trpc/client'
	import { page } from '$app/stores'
	import { writable } from 'svelte/store'
	export let data
	// $: console.log(data)
	$: ({ user } = data)
	const t = trpc($page)
	const foo = t.greeting.greet.createQuery('ok', { retry: false })
	const bar = t.comments.get.createQuery(
		{
			id: '',
			cursor: '',
			take: 4,
			type: 'event'
		},
		{ retry: false }
	)

	const itemId = ''
</script>

<Page title="test">
	{#if $foo.isLoading}
		<span class="loading loading-spinner loading-lg bg-success" />
	{:else if $foo.isError}
		<div class="text-error text-xl font-semibold">Error:</div>
		<div class="ml-2">{$foo.error.message}</div>
	{:else if $foo.data}
		{$foo.data.message}
	{/if}
</Page>
