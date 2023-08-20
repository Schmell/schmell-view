<script lang="ts">
	import type { PageData } from './$types';
	import { Page } from '$components/layout/index.js';
	import { Input, Button, Form } from '$components/form/index.js';
	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';

	// export let form
	export let data: PageData;

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

	// console.log('data: ', data);
	$: ({ user } = data);
</script>

<Page title={user?.username}>
	<hgroup>
		<div class="flex justify-between items-center">
			<h3>{user?.email}</h3>
			<a class="btn btn-xs" href="/auth/change-email">change</a>
		</div>
	</hgroup>
	<Form {formObj}>
		<Input name="username" {formObj} />
		<Input name="firstname" label="First name" {formObj} />
		<Input name="lastname" label=" Last name" {formObj} />
		<div class="flex items-center gap-2 w-full max-w-lg">
			<Input name="avatar" {formObj} />
			<div class="w-14 rounded-full border-2 flex justify-center items-center border-base-100 z-10">
				<img class="z-0" src={user?.avatar} alt={user?.name} />
			</div>
		</div>

		<Button>Submit</Button>
	</Form>
</Page>
