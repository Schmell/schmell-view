<script>
	import { flyAndScale } from '$lib/utils/transitions'
	import Icon from '@iconify/svelte'

	import { Tooltip } from 'bits-ui'
	export let status = 'success'
	// export let statusText = { success: 'Complete', error: 'Info', waring: 'In progress' }

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
				class:badge-success={status === 'success'}
				class:badge-warning={status === 'warning'}
				class:badge-error={status === 'error'}
			>
				{#if status === 'success'}
					<Icon icon="mdi:check" />
				{:else if status === 'warning'}
					<Icon icon="material-symbols:progress-activity-sharp" />
				{:else if status === 'error'}
					<Icon icon="mdi:error" />
				{:else}
					<Icon icon="material-symbols:info-outline" />
				{/if}
			</button>
		</Tooltip.Trigger>
		<Tooltip.Content
			transition={flyAndScale}
			transitionConfig={{ y: 8, duration: 150 }}
			side="left"
			sideOffset={8}
		>
			<div class="p-2 bg-base-300 rounded-lg">
				<slot />
			</div>
		</Tooltip.Content>
	</Tooltip.Root>
</div>
<!-- ///////////////////////////////////////////////// -->
