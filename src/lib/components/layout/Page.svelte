<script lang="ts">
	import SubNav from './SubNav.svelte';
	import { cn } from '$lib/utils';

	export let title: string | null = '';
	let className: string | undefined = undefined;
	export { className as class };
</script>

<SubNav {title}><div slot="trailing"><slot name="trailing" /></div></SubNav>

<div class="absolute">
	<div class={cn('mb-48 w-full h-full fixed top-0 overflow-scroll', { className })}>
		<div class="mx-4 mt-36 mb-8">
			<slot />
		</div>
	</div>
</div>
