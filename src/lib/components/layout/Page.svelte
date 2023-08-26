<script lang="ts">
	import SubNav from './SubNav.svelte';
	import { cn } from '$lib/utils';
	import { getFlash } from 'sveltekit-flash-message/client';
	import { page } from '$app/stores';

	export let title: string | null = '';
	const flash = getFlash(page);
	// $: console.log('flash: ', $flash);
	let className: string | undefined = undefined;
	export { className as class };
</script>

<SubNav {title}><div slot="trailing"><slot name="trailing" /></div></SubNav>

<div class="absolute">
	<div class={cn(' w-full h-full fixed top-0 overflow-scroll', { className })}>
		<!-- {#if $flash}
			<div class=" absolute mt-32 flex justify-between w-full">
				<div
					id="flashMessage"
					class=" w-full rounded-br-3xl z-10"
					class:bg-error={$flash.type !== 'success'}
				>
					{$flash.message}
				</div>
				<div class="relative w-[4rem]" />
			</div>
		{/if} -->
		<div class="mt-36">
			{#if $flash}
				<div class="flex justify-between w-full">
					<div
						id="flashMessage"
						class=" p-2 w-full rounded-br-full z-10 text-error-content"
						class:bg-error={$flash.type !== 'success'}
					>
						{$flash.message}
					</div>
					<div class="relative w-[2.75rem]" />
				</div>
			{/if}
			<div class="mx-4 mb-24">
				<slot />
			</div>
		</div>
	</div>
</div>
