<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { LikeFollowCount } from '$lib/like'
	import Icon from '@iconify/svelte'
	import { Pagination } from 'bits-ui'

	export let organizations
	export let count

	let currentPage
	let pageSize
	let scrollDiv

	function excludePaginationSearchParams() {
		$page.url.searchParams.delete('orgsSkip')
		$page.url.searchParams.delete('orgsTake')
		return $page.url.searchParams.toString()
	}
</script>

<div class="flex flex-col gap-2">
	{#await organizations}
		<progress class="progress w-full" />
	{:then organizations}
		{#if !organizations.length}
			<div class="text-sm">You have no Organizations yet</div>
			<a href="/organization/edit" class="btn btn-primary rounded-full"> Add organization </a>
		{:else}
			{#each organizations as org}
				<a
					href="/organization/{org.id}"
					class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-warning w-full rounded-lg shadow-xl"
				>
					<div class="capitalize w-full p-2 font-bold rounded-t-xl bg-warning bg-opacity-10">
						<div class="flex justify-between">
							<div>{org.name}</div>
							<!-- <div class="flex gap-1 items-center text-xs pr-2">
								<Icon icon="mdi:thumb-up" />
								{org._count.Likes} /
								<Icon icon="material-symbols:bookmark-add-outline-rounded" />
								{org._count.Follows}
							</div> -->
							<LikeFollowCount count={org?._count} />
						</div>
					</div>

					<div class="flex justify-between items-end w-full px-4">
						<div>
							<div class="pb-4">
								{@html org.description}
							</div>
							<div class="text-sm">
								{org._count.Series} Series / {org._count.Events} Events
							</div>
							<div class="text-xs opacity-40">
								{org.createdAt?.toLocaleDateString()}
							</div>
						</div>
					</div>
				</a>
			{/each}
		{/if}
	{/await}
</div>
{#if count > 5}
	<div class="flex justify-center">
		<Pagination.Root
			count={count ? count : 0}
			page={currentPage}
			perPage={pageSize}
			let:pages
			let:range
		>
			<div class="flex items-center">
				<Pagination.PrevButton
					class="mr-2 inline-flex items-center justify-center text-xl text-base-content rounded-sm bg-transparent hover:bg-base-200 active:scale-98 disabled:cursor-not-allowed disabled:text-neutral hover:disabled:bg-transparent"
					on:click={() => {
						currentPage = currentPage - 1
						goto(
							`/dashboard?orgsTake=${pageSize}&orgsSkip=${
								pageSize * currentPage
							}&${excludePaginationSearchParams()}`
						)

						// now more than ever need to anchor the <Page> to the content window
						scrollDiv.scrollIntoView({ block: 'start' })
					}}
				>
					<Icon icon="mdi:menu-left" />
				</Pagination.PrevButton>
				<div class="flex items-center join">
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<div class="text-sm font-medium text-base-content join-item">...</div>
						{:else}
							<Pagination.Page
								{page}
								class="inline-flex size-6 items-center justify-center rounded-lg bg-base-300 text-md font-medium hover:bg-base-100  join-item active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-transparent data-[selected]:bg-foreground data-[selected]:text-background"
								on:click={() => {
									goto(
										`/dashboard?orgsTake=${pageSize}&orgsSkip=${
											pageSize * (page.value - 1)
										}&${excludePaginationSearchParams()}`
									)
									currentPage = page.value
									scrollDiv.scrollIntoView({ block: 'start' })
								}}
							>
								{page.value}
							</Pagination.Page>
						{/if}
					{/each}
				</div>
				<Pagination.NextButton
					class="ml-2 inline-flex size-10 items-center justify-center text-xl text-base-content rounded-lg bg-transparent hover:bg-base-100 active:scale-98 disabled:cursor-not-allowed disabled:text-muted-foreground hover:disabled:bg-transparent"
					on:click={() => {
						goto(
							`/dashboard?orgsTake=${pageSize}&orgsSkip=${
								pageSize * currentPage
							}&${excludePaginationSearchParams()}`
						)
						scrollDiv.scrollIntoView({ block: 'start' })
					}}
				>
					<Icon icon="mdi:menu-right" />
				</Pagination.NextButton>
			</div>
			<p class="text-center text-sm text-base-content">
				Showing {range.start} - {range.end}
			</p>
		</Pagination.Root>
	</div>
{/if}
