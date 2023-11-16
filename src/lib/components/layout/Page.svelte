<script lang="ts">
	import { cn } from '$lib/utils'
	import SubNav from './SubNav.svelte'

	export let title: string | null = ''

	let className: string | undefined = undefined
	export { className as class }
</script>

<SubNav {title}><div slot="trailing"><slot name="trailing" /></div></SubNav>

<div>
	<div class={cn(' w-full h-full fixed top-0 overflow-scroll', { className })}>
		<div class="mt-32 relative">
			<div class="mx-4 mb-24">
				<slot />
			</div>
		</div>
	</div>
</div>
