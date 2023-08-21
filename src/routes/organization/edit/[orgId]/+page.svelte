<script lang="ts">
	import { Form, Button, Input, Textarea } from '$components/form';
	import { Page } from '$components/layout';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const formObj = superForm(data.form);
	const { form } = formObj;
</script>

<Page title={$form.name === 'New Organization' ? 'Add a new Organization' : 'Edit Organization'}>
	<Form {formObj}>
		<Input name="name" {formObj} />
		<Textarea name="description" rows={4} {formObj} />
		<Input name="website" {formObj} />
		<Input name="email" {formObj} />
		<Button>Submit</Button>
	</Form>
</Page>
