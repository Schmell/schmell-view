<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { LikeFollowCount } from '$lib/like'
	import Icon from '@iconify/svelte'
	import { Pagination } from 'bits-ui'

	export let series
	export let count

	let currentPage
	let pageSize
	let scrollDiv

	function excludePaginationSearchParams() {
		$page.url.searchParams.delete('seriesSkip')
		$page.url.searchParams.delete('seriesTake')
		return $page.url.searchParams.toString()
	}
</script>

{#if !series.length}
	<div class="flex flex-col gap-2 justify-center">
		<div class="text-sm m-auto">You have no Series yet!</div>
		<a href="/series/new/edit" class="btn btn-primary">
			<Icon icon="mdi:add" class="text-xl border border-base-300 shadow-lg rounded-full" /> Add series</a
		>
	</div>
{:else}
	{#each series as ser}
		<a
			href="/series/{ser.id}"
			class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"
		>
			<div class="capitalize w-full p-2 font-bold rounded-t-xl bg-secondary bg-opacity-10">
				<div class="flex justify-between">
					<div class="line-clamp-1">{ser.name}</div>
					<!--  -->
					<LikeFollowCount count={ser._count} />
				</div>
			</div>
			<div class="p-2 px-4">
				{@html ser.description}
			</div>

			<a href="/organization/{ser.Organization.id}" class="flex justify-between w-full px-4">
				<div class="flex gap-2 items-center text-xs">
					<Icon icon="clarity:organization-line" />
					{ser.Organization.name}
				</div>
				<div class="text-xs opacity-40">
					{ser.createdAt.toLocaleDateString()}
				</div>
			</a>
		</a>
	{/each}

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
								`/dashboard?followTake=${pageSize}&followSkip=${
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
											`/dashboard?followTake=${pageSize}&followSkip=${
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
								`/dashboard?followTake=${pageSize}&followSkip=${
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
{/if}
