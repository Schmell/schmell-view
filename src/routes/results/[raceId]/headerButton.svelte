<script lang="ts">
	import type { CellContext } from '@tanstack/svelte-table'
	import { cn } from '$lib/utils'
	import Icon from '@iconify/svelte'

	// let className: string | undefined = undefined
	// export { className as class }
	type Result = {
		points?: string
		rank?: string
		boat?: string
		skipper?: string
		code?: string
		finish?: string
		start?: string
		elapsed?: string
		corrected?: string
		[key: string]: any
	}

	export let info: CellContext<Result, any>
	$: console.log('info: ', info)
	export let onClick: () => void
</script>

<button on:click={onClick}>
	<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
</button>
