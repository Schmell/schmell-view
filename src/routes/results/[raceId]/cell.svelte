<script lang="ts">
	import type { CellContext } from '@tanstack/svelte-table'
	import { cn } from '$lib/utils'

	let className: string | undefined = undefined
	export { className as class }

	type Result = {
		points?: string
		rank?: string
		boat?: string
		compId?: string
		skipper?: string
		code?: string
		finish?: string
		start?: string
		elapsed?: string
		corrected?: string
		[key: string]: any
	}

	export let info: CellContext<Result, any>
	export let discard = false
	export let useCode = false
	export let useLink = false

	function infoValue() {
		if (useCode) {
			return info.getValue() ? info.getValue() : info.row.original.code
		}
		return info.getValue() ?? ''
	}

	function discarded() {
		// if (discard) return true;
		if (Number(info.row.original.discard) && discard) return true
		return false
	}
</script>

<a
	href={useLink ? `/comps/comp/${info.cell.row.original.compId}` : ''}
	class={cn('p-0 m-0 flex justify-center', className)}
	class:opacity-60={discarded()}
	class:cursor-text={!useLink}
>
	{discarded() ? `(${infoValue()})` : infoValue()}
</a>
