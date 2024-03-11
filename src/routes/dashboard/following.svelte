<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { FollowButton } from '$lib/follow'
	import Icon from '@iconify/svelte'
	import { Pagination } from 'bits-ui'

	export let following
	export let count = 0

	let pageSize = 5
	let scrollDiv: HTMLDivElement
	let currentPage = 1

	function excludePaginationSearchParams() {
		$page.url.searchParams.delete('followSkip')
		$page.url.searchParams.delete('followTake')
		return $page.url.searchParams.toString()
	}
</script>

{#if !following.length}
	<div class="text-sm">You are not Following anything yet</div>
{:else}
	<div bind:this={scrollDiv} />
	{#each following as follow}
		{#if follow.type === 'event'}
			<a
				href="/events/{follow.Event?.id}"
				class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-accent w-full rounded-lg shadow-xl"
			>
				<a href="/events/{follow.Event?.id}">
					<div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-info bg-opacity-10">
						{follow.type}
					</div>
				</a>
				<div class="flex justify-between w-full pl-4">
					<a href="/events/{follow.Event?.id}">
						<div>
							{@html follow.Event?.name}
							<div class="text-xs opacity-40">
								{follow.createdAt.toLocaleDateString()}
							</div>
						</div>
					</a>
					<div class="pr-4">
						<FollowButton type="event" item={follow.Event} />
					</div>
				</div>
			</a>
		{/if}

		{#if follow.type === 'venue'}
			<div
				class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"
			>
				<a href="/venue/{follow.Venue?.id}">
					<div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-secondary bg-opacity-10">
						{follow.type}
					</div>
				</a>
				<div class="flex justify-between w-full pl-4">
					<a href="/venue/{follow.Venue?.id}">
						<div>
							{@html follow.Venue?.name}
							<div class="text-xs opacity-40">
								{follow.createdAt.toLocaleDateString()}
							</div>
						</div>
					</a>
					<div class="pr-4">
						<FollowButton item={follow.Venue} type="venue" />
					</div>
				</div>
			</div>
		{/if}

		<!-- follow orgs -->
		{#if follow.type === 'organization'}
			<div
				class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-warning w-full rounded-lg shadow-xl"
			>
				<a href="/organization/{follow.Organization?.id}">
					<div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-warning bg-opacity-10">
						{follow.type}
					</div>
				</a>

				<div class="flex justify-between w-full pl-4">
					<a href="/organization/{follow.Organization?.id}">
						<div>
							{@html follow.Organization?.name}
							<div class="text-xs opacity-40">
								{follow.createdAt.toLocaleDateString()}
							</div>
						</div>
					</a>

					<div class="pr-4">
						<FollowButton item={follow.Organization} type="organization" />
					</div>
				</div>
			</div>
		{/if}

		{#if follow.type === 'comp'}
			<div
				class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-success w-full rounded-lg shadow-xl"
			>
				<a href="/comp/{follow.Comp?.id}">
					<div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-success bg-opacity-10">
						{follow.type}
					</div>
				</a>

				<div class="flex justify-between w-full pl-4">
					<a href="/comp/{follow.Comp?.id}">
						<div>
							{@html follow.Comp?.boat ?? follow.Comp?.skipper ?? 'No Competitor name'}
							<div class="text-xs opacity-40">
								{follow.createdAt.toLocaleDateString()}
							</div>
						</div>
					</a>

					<div class="pr-4">
						<FollowButton item={follow.Comp} type="comp" />
					</div>
				</div>
			</div>
		{/if}
	{/each}
{/if}

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
