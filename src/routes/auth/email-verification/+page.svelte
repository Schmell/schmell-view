<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'
	import { Page } from '$components/layout'

	export let form: ActionData
</script>

<svelte:head>
	<title>Verify your email - Schmell View</title>
</svelte:head>

<Page title="Email verification">
	<p>Your email verification link was sent to your inbox.</p>
	<h2>Resend verification link</h2>
	<form method="post" use:enhance>
		<input type="submit" value="Resend" class="btn btn-sm btn-warning" />
	</form>
	{#if form?.success}
		<p>Your verification link was resent</p>
	{/if}
</Page>
