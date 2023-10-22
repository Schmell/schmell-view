<script lang="ts">
	import { Page, ItemCard } from '$components/layout'
	import { formatDateTime } from '$lib/utils/formatters'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'
	import { page } from '$app/stores'

	export let data: PageData

	$: ({ orgs, user } = data)
	// $: console.log('orgs: ', orgs);
</script>

<Page title="All Organizations">
	<div slot="trailing">
		{#if user}
			<a href="/organization/new/edit?from={$page.url.pathname}">
				<Icon icon="material-symbols:add-circle" width="24" />
			</a>
		{/if}
	</div>
	{#if !orgs.length}
		<div>No Organizations available yet</div>
	{:else}
		{#each orgs as org}
			<ItemCard title={org.name} href="/organization/{org.id}">
				<div>{org.description ?? 'No description provided'}</div>
				<div>{org.website}</div>

				<div slot="bottom-left">
					{#if org.createdAt}
						<div class="text-xs m-2 ml-2">{formatDateTime(org.createdAt)}</div>
					{/if}
				</div>
				<div slot="top-right" class="text-xs">
					<a href="/">
						@{org.Owner?.username}
					</a>
				</div>

				<div slot="bottom-right" class="flex justify-end text-primary">
					<!-- Edit should only show when current user is owner -->
					{#if data.user?.userId === org?.ownerId}
						<div class="tooltip tooltip-top" data-tip="Organization Edit">
							<a
								data-sveltekit-replacestate
								href="/organization/{org?.id}/edit?from={$page.url.pathname}"
								class="btn btn-ghost"
							>
								<Icon icon="material-symbols:edit-outline" width="24" />
							</a>
						</div>
					{/if}
				</div>
			</ItemCard>
		{/each}
	{/if}
</Page>
