<script lang="ts">
	import { enhance } from '$app/forms';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { dev } from '$app/environment';
	import * as formItems from '$components/form';
	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	// console.log('formItems: ', formItems);
	export let formData;
	export let noDebug: boolean | undefined = false;

	export const formObj = superForm(formData, {
		autoFocusOnError: true,
		flashMessage: {
			module: flashModule,
			onError: ({ result, message }) => {
				const errorMessage = result.error.message;
				message.set({ type: 'error', message: errorMessage });
			}
		},

		syncFlashMessage: true
	});
	const { form: debug, message } = formObj;
</script>

<form method="post" use:enhance>
	<div class="flex justify-end text-warning min-h-7">
		<div class="min-h-7">
			{#if $message} {$message} {/if}
		</div>
	</div>

	<slot {...formItems} {formObj} />

	<slot name="bottomLinks" />
</form>

{#if dev && !formObj.errors}
	<div class="divider" />
	<SuperDebug label={$message} data={$debug} display={!noDebug} />
{/if}
