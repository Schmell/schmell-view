<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	import { Form, Input, Button } from '$components/form/index.js';
	import { Page } from '$components/layout/index.js';

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

<Page title="Reset password">
	<Form {formObj}>
		<Input name="password" type="password" {formObj} />
		<Button>Submit</Button>
	</Form>
</Page>
