<script lang="ts">
	import { enhance } from '$app/forms';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { dev } from '$app/environment';

	export let formObj;
	export let noDebug: boolean | undefined = false;

	const { form: debug, message } = formObj;
</script>

<form method="post" use:enhance>
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
