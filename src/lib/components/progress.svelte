<script>
	import { flyAndScale } from '$lib/utils/transitions'
	import Icon from '@iconify/svelte'

	import { Tooltip } from 'bits-ui'
	export let item

	let tip
</script>

<!-- eventProgress //////////////////////////////////////////////////////////////////////////////   -->
<div class="flex justify-end">
	<!-- {#if item.complete} -->
	<Tooltip.Root open={tip} openDelay={1000}>
		<Tooltip.Trigger>
			<button
				on:click={() => (tip = true)}
				class="badge shadow-lg"
				class:badge-success={item.complete}
				class:badge-warning={!item.complete}
			>
				{#if item.complete}
					<Icon icon="mdi:check" />
				{:else}
					<Icon icon="material-symbols:progress-activity-sharp" />
				{/if}
			</button>
		</Tooltip.Trigger>
		<Tooltip.Content
			transition={flyAndScale}
			transitionConfig={{ y: 8, duration: 150 }}
			side="left"
			sideOffset={8}
		>
			<div class="p-2 bg-base-300 rounded-lg">{item.complete ? 'complete' : 'In progress'}</div>
		</Tooltip.Content>
	</Tooltip.Root>
</div>
<!-- ///////////////////////////////////////////////// -->
