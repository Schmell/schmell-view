<script lang="ts">
	import { Form, Input, Button } from '$components/form/index.js';
	import { Page } from '$components/layout/index.js';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const formObj = superForm(data.form);
</script>

<svelte:head>
	<title>Reset Password - Svelte-way</title>
</svelte:head>
<Page title="Reset password">
	<Form {formObj}>
		<Input name="email" {formObj} />
		<Button>Submit</Button>
		<div slot="bottomLinks"><a href="/auth/login">Sign in</a></div>
	</Form>
</Page>
