<script lang="ts">
	import { Form, Button } from '$components/form/index.js';
	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	import SuperForm from '$components/form/superForm.svelte';
	import { Page } from '$components/layout';

	export let data;

	// const formObj = superForm(data.form, {
	// 	autoFocusOnError: true,
	// 	flashMessage: {
	// 		module: flashModule,
	// 		onError: ({ result, message }) => {
	// 			const errorMessage = result.error.message;
	// 			message.set({ type: 'error', message: errorMessage });
	// 		}
	// 	},

	// 	syncFlashMessage: true
	// });
</script>

<Page title="Link Accounts">
	<SuperForm let:Button let:Input let:Textarea let:formObj formData={data.form}>
		<Input name="name" {formObj} />
		<Button>Submit</Button>
	</SuperForm>
</Page>

<!-- {#if data.field === 'email'}
	<h1>Link your accounts</h1>

	<p>A user with the assoicated email is alreay registered.</p>
	<p>Would you like to link these accounts together</p>
	<Form {formObj}>
		<Button class="btn btn-primary w-full max-w-md">Send verification email</Button>
	</Form>
{/if}
{#if data.field === 'username'}
	<h1>Username already exists</h1>
{/if} -->
