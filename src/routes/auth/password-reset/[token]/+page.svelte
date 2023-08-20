<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	import { Form, Input } from '$components/form/index.js';
	import Button from '$components/old-form-deleteMe/Button.svelte';

	export let data;

	const formObj = superForm(data.form, {
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
</script>

<h1 class="m-0">Reset password</h1>
<Form {formObj}>
	<Input name="password" type="password" {formObj} />
	<Button>Submit</Button>
</Form>
