<script lang="ts">
	import { enhance } from '$app/forms'
	import Button from '$components/form/button.svelte'
	import Page from '$components/layout/Page.svelte'

	export let data
	$: ({ comp, user } = data)
</script>

<Page title="Add competitor">
	<div>
		{#if comp}
			<div>
				{comp.boat ?? comp.skipper ?? comp.sailno}
			</div>
			<form method="post" action="?/addCompToUser" use:enhance>
				<input name="compId" value={comp.id} type="hidden" />
				<input name="userId" value={user?.userId} type="hidden" />
				<Button>Add to User</Button>
			</form>
		{/if}
	</div>
</Page>
