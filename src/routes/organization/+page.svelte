<script lang="ts">
	import { Page, ItemCard } from '$components/layout'
	import { formatDateTime } from '$lib/utils/formatters'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'
	import { page } from '$app/stores'
	import { getHref } from '$lib/utils'

	export let data: PageData

	$: ({ orgs, user } = data)
	$: console.log('orgs: ', orgs)
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
				<div>{@html org.description ?? 'No description provided'}</div>
				<a
					href={getHref(org.website)}
					target="_blank"
					class="pt-2 flex items-center gap-1 text-sm font-semibold text-secondary"
				>
					<Icon icon="clarity:pop-out-line" class="inline" /><span>{org.website}</span>
				</a>
				<div slot="top-right" class="text-xs">
					<a href="/user/{org.Owner?.id}">
						@{org.Owner?.username}
					</a>
				</div>

				<div slot="bottom-left">
					{#if org.createdAt}
						<div class="text-xs text-base-content m-2 ml-2">{org.createdAt.toLocaleString()}</div>
					{/if}
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
