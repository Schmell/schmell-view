<script lang="ts">
	import { goto } from '$app/navigation'
	import { afterUpdate } from 'svelte'
	import { cn } from '$lib/utils'

	export let title: string | null
	export let href: string | null

	let _class: string | undefined = undefined
	export { _class as class }

	let more = false

	let needMore
	let slot: HTMLDivElement
	//
	afterUpdate(() => {
		needMore =
			slot &&
			((slot.innerHTML.length < 140 && slot.innerText.length < 140) ||
				['undefined', 'null'].includes(slot.innerText))
	})
</script>

<div class={cn('item-card mb-4 snap-center', _class)}>
	<header class="min-h-12 flex items-center bg-base-200 rounded-tl-xl shadow-md">
		<button
			class="pl-4"
			class:smaller={title && title.length >= 28}
			on:keyup
			on:click={() => {
				goto(`${href}`)
			}}
		>
			{@html title}
		</button>
		<div class="pr-4 py-3">
			<slot name="top-right" />
		</div>
	</header>

	<hr class="border-base-content opacity-25" />

	<div class="hidden" bind:this={slot}><slot /></div>
	<div
		class="pt-2 pl-4 mb-6 relative min-h-8 bg-gradient-to-r from-base-100 to-base-200"
		class:line-clamp-3={!more}
	>
		<slot />
	</div>
	<div class="relative">
		{#if !more && !needMore}
			<button
				on:click={() => {
					more = !more
				}}
				class="btn btn-xs bg-opacity-80 z-10 shadow-md absolute -bottom-1 right-0 mr-2"
			>
				read more
			</button>
		{:else if !needMore}
			<button
				on:click={() => {
					more = !more
				}}
				class="btn btn-xs absolute -bottom-1 right-0 mr-2"
			>
				less
			</button>
		{/if}
	</div>

	<hr class="border-base-content opacity-25" />
	<div class="pr-4 pb-2 text-neutral-content flex justify-between realtive">
		<div>
			<slot name="bottom-left" />
		</div>
		<div>
			<slot name="bottom-right" />
		</div>
	</div>
</div>

<style>
	.smaller {
		@apply text-xl;
	}

	.item-card {
		@apply bg-base-100 shadow-md;
		@apply border-x-base-300 border-t-base-100 border-b-base-300;
		min-height: 8em;
		border-width: 1px;
		border-bottom-right-radius: 2em;
		border-top-left-radius: 1em;
		border-bottom-width: 0.25em;
		border-top-width: 1px;
		border-left-width: 1px;
	}

	.item-card > header {
		@apply flex justify-between pb-0 text-xl font-semibold;
		cursor: pointer;
		user-select: none;
	}
</style>
