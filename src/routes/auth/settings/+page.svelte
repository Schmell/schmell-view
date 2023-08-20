<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { Button, Form, Select } from '$components/form/index.js';
	import { Page } from '$components/layout/index.js';
	import { themes } from '$lib/utils';
	import { Lang } from '@prisma/client';

	export let data: PageData;

	// $: console.log('data: ', data);

	const formObj = superForm(data.form);
	const { form } = formObj;
	console.log('form: ', $form.theme);

	$: if ($form.theme) {
		document.documentElement.setAttribute('data-theme', $form.theme);
	}

	// let oldTheme = '';
	// if (oldTheme !== data.form.theme && data.form.theme) {
	// 	document.documentElement.setAttribute('data-theme', data.form.theme);
	// 	oldTheme = data.form.theme;
	// }
</script>

<Page title="User Settings">
	<Form {formObj}>
		<Select name="language" {formObj} items={Object.values(Lang)} />
		<Select name="theme" {formObj} items={themes} />
		<Button class="mt-6">Submit</Button>
	</Form>
</Page>
