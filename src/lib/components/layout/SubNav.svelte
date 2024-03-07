<script>
	import { flyAndScale } from '$lib/utils/transitions'
	import { Tooltip } from 'bits-ui'

	export let title
	let tip
</script>

<div class="sub-nav">
	<div>
		<Tooltip.Root open={tip}>
			<Tooltip.Trigger>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => (tip = true)}
					on:keydown={() => {}}
					class="text-3xl font-semibold select-none line-clamp-1"
				>
					{title}
				</div>
			</Tooltip.Trigger>
			<Tooltip.Content
				transition={flyAndScale}
				transitionConfig={{ y: 8, duration: 150 }}
				side="bottom"
				sideOffset={10}
				alignOffset={-45}
			>
				<div class="bg-base-300 p-2 rounded-lg">{title}</div>
			</Tooltip.Content>
		</Tooltip.Root>
	</div>

	<div class="mr-4"><slot name="trailing" /></div>
</div>

<style>
	.sub-nav {
		@apply border-base-300 bg-base-100 shadow-md;
		@apply text-primary;
		@apply flex items-center justify-between;
		@apply fixed z-10 pr-4;
		/* position: fixed;
		z-index: 10; */
		/* padding-right: 2em; */
		padding-top: 4.75em;
		padding-bottom: 0.7em;
		padding-left: 1em;
		width: 99%;
		border-width: 1px;
		border-bottom-right-radius: 4em;
	}
</style>
