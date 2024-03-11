<script lang="ts">
	import { cn } from '$lib/utils'
	import SubNav from './SubNav.svelte'

	export let title: string | null = ''

	let className: string | undefined = undefined
	export { className as class }
</script>

<SubNav {title}><div slot="trailing"><slot name="trailing" /></div></SubNav>
<div class="absolute top-32">
	<div
		class={cn(' w-full h-full fixed  overflow-scroll scroll-smooth scrolbar-none', { className })}
	>
		<div class="relative">
			<div class="mx-4 pt-8 mb-96">
				<slot />
			</div>
		</div>
	</div>
</div>

<style>
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
	.scrolbar-none {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none;
	}
</style>
