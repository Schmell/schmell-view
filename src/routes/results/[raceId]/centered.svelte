<script lang="ts">
	import type { CellContext } from '@tanstack/svelte-table';

	type Result = {
		points?: string;
		rank?: string;
		boat?: string;
		skipper?: string;
		code?: string;
		finish?: string;
		start?: string;
		elapsed?: string;
		corrected?: string;
		[key: string]: any;
	};

	export let info: CellContext<Result, any>;
	export let discard = true;

	function infoValue() {
		return info.getValue() ? info.getValue() : info.row.original.code ?? 'DNC';
	}

	function discarded() {
		if (!discard) return false;
		if (Number(info.row.original.discard)) return true;
		return false;
	}
</script>

<div class="flex justify-center p-0 m-0" class:opacity-60={discarded() || infoValue() === 'DNC'}>
	{discarded() ? `(${infoValue()})` : infoValue()}
</div>
