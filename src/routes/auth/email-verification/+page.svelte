<script lang="ts">
	import { enhance } from '$app/forms'
	// import { getFlash } from 'sveltekit-flash-message/client'

	import type { ActionData } from './$types'
	import { page } from '$app/stores'
	import { Page } from '$components/layout'

	export let form: ActionData
	// const flash = getFlash(page)
</script>

<Page title="Email verification">
	<!-- <h1>Email verification</h1> -->
	<p>Your email verification link was sent to your inbox (i.e. console).</p>
	<h2>Resend verification link</h2>
	<form method="post" use:enhance>
		<input type="submit" value="Resend" class="btn btn-sm btn-warning" />
	</form>
	{#if form?.success}
		<p>Your verification link was resent</p>
	{/if}
</Page>
