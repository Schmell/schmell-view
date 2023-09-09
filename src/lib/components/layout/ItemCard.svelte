<script lang="ts">
	import { goto } from '$app/navigation'

	export let title: string | null
	export let href: string | null

	let more = false
	//
</script>

<!-- in:fade={{ duration: 1000 }} out:fade={{ duration: 750 }} -->
<div class="item-card mb-4 snap-center">
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

	<div class="pt-2 pl-4 mb-4 relative" class:line-clamp-3={!more}>
		<slot />
		{#if !more}
			<button
				on:click={() => {
					more = !more
				}}
				class="btn btn-xs bg-base-100 text-accent-content shadow-md absolute bottom-0 right-0 mr-2"
				>read more</button
			>
		{:else}
			<button
				on:click={() => {
					more = !more
				}}
				class="btn btn-xs absolute bottom-0 right-0 mr-2">less</button
			>
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
		/* padding-top: 0.5em;
		padding-left: 1em; */
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
