<script lang="ts">
	import { dev } from '$app/environment'
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'

	export let formObj
	export let noDebug: boolean | undefined = false
	export let action: string | undefined = undefined

	const { form: debug, message, enhance } = formObj
</script>

<form method="post" {action} use:enhance {...$$restProps}>
	<div class="flex justify-end text-warning min-h-7">
		<div class="min-h-7">
			{#if $message} {$message} {/if}
		</div>
	</div>

	<slot />

	<slot name="bottomLinks" />
</form>

{#if dev && !formObj.errors}
	<div class="divider" />
	<SuperDebug label={$message} data={$debug} display={!noDebug} />
{/if}
