<script lang="ts">
	import { cn } from '$lib/utils'

	export let type: 'submit' | 'button' | 'reset' = 'submit'
	export let position: string | undefined = undefined
	let className: string | undefined = undefined
	export { className as class }

	// $: console.log('restProps: ', $$restProps)
</script>

{#if position === 'float'}
	<button
		{type}
		class={cn(
			'btn btn-primary uppercase mt-4 shadow-lg px-10 rounded-full fixed bottom-24 right-8',
			className
		)}
		on:click
		{...$$restProps}
	>
		<slot />
	</button>
{:else}
	<button
		{type}
		class={cn(
			'btn btn-primary uppercase mt-4 shadow-lg px-10 w-full max-w-md rounded-br-3xl',
			className
		)}
		on:click
		{...$$restProps}
	>
		<slot />
	</button>
{/if}
