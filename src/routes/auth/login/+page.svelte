<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
	import * as flashModule from 'sveltekit-flash-message/client'
	import Icon from '@iconify/svelte'
	import { Form, Input, Button } from '$components/form/index.js'
	import { Page } from '$components/layout'

	export let data

	const formObj = superForm(data.form, {
		autoFocusOnError: true,
		flashMessage: {
			module: flashModule,
			onError: ({ result, message }) => {
				const errorMessage = result.error.message
				message.set({ type: 'error', message: errorMessage })
			}
		},
		syncFlashMessage: true
	})
</script>

<svelte:head>
	<title>Login - Schmell View</title>
</svelte:head>

<Page title="Login">
	<p class="m-0">Don't have an account? <a href="/auth/register"> Register </a></p>
	<Form {formObj}>
		<Input name="email" type="email" autofill="off" {formObj} />
		<Input name="password" type="password" {formObj} />
		<Button>submit</Button>
		<div slot="bottomLinks" class="mt-1">
			<a href="/auth/password-reset">Reset password</a>
			<!-- <a href="/signup">Create an account</a> -->
			<div class="flex flex-col gap-1">
				<a class="btn btn-ghost uppercase" href="/auth/login/github">
					<Icon icon="fa6-brands:github" /> Sign in with Github
				</a>
				<a class="btn btn-ghost uppercase" href="/auth/login/google">
					<Icon icon="devicon:google" /> Sign in with Google
				</a>
				<a class="btn btn-ghost uppercase" href="/auth/login/discord">
					<Icon icon="skill-icons:discord" /> Sign in with Discord
				</a>
				<a class="btn btn-ghost uppercase btn-disabled" href="/auth/login/facebook">
					<Icon icon="devicon:facebook" /> Sign in with facebook
				</a>
			</div>
		</div>
	</Form>
</Page>
