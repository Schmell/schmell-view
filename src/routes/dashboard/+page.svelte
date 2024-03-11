<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Page from '$lib/components/layout/Page.svelte'
	import Icon from '@iconify/svelte'
	import { Accordion } from 'bits-ui'
	import Events from './events.svelte'
	import Following from './following.svelte'
	import Likes from './likes.svelte'
	import Organizations from './organizations.svelte'

	export let data
	$: ({
		user,
		events,
		series,
		following,
		awaited,
		userStats,
		eventsCount,
		likesCount,
		organizationsCount
	} = data)

	function excludeSortSearchParams() {
		$page.url.searchParams.delete('sortBy')
		$page.url.searchParams.delete('sortOrder')
		return $page.url.searchParams.toString()
	}
</script>

<svelte:head>
	<title>Dashboard - Vite Sail</title>
</svelte:head>

<Page title="Home">
	{#if !user}
		<h1>No user found</h1>
	{:else}
		<div
			class="p-2 pl-4 w-full flex gap-4 items-center rounded-xl shadow-md border-l-4 border-b-4 border-base-300"
		>
			<div class="p-1 bg-base-200 rounded-full shadow-md">
				<img
					width="82rem"
					class="rounded-full bg-neutral-content"
					src={user.avatar}
					alt={user.username}
				/>
			</div>

			<div class="w-full">
				<h2 class="m-0 text-xl tracking-wide text-base-content font-semibold">{user.username}</h2>
				<hr class="border border-accent" />
				<div class="text-md text-base-content">{user.name}</div>
				<div class="flex justify-end">
					<div class="flex gap-1 items-center min-w-fit text-xs pr-2">
						<Icon icon="mdi:thumb-up" />
						{userStats?._count.Liked} /
						<Icon icon="mdi:bell-ring" />
						{userStats?._count.Followed}
					</div>
				</div>
			</div>
		</div>

		<Accordion.Root value={['events', 'following']} class="pt-4" multiple>
			<Accordion.Item value="events" class="py-2 text-base-content">
				<Accordion.Header class="p-2 border-b border-base-100 w-full flex items-start">
					<Accordion.Trigger class="flex w-full justify-between">
						<div>
							Your Events <span class="text-xs text-info">{eventsCount}</span> / Series
						</div>
						<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
					</Accordion.Trigger>
				</Accordion.Header>

				<Accordion.Content class="p-2">
					<Events {events} {series} {eventsCount} />
				</Accordion.Content>
			</Accordion.Item>

			<!-- Following -->
			<Accordion.Item value="following" class="py-2 text-base-content">
				<Accordion.Header class="p-2 border-b border-base-100 w-full flex items-start">
					<Accordion.Trigger class="flex w-full justify-between">
						<div>Following <span class="text-xs text-info">{data.followCount}</span></div>
						<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
					</Accordion.Trigger>
				</Accordion.Header>

				<Accordion.Content class="p-2">
					<Following {following} count={data.followCount} />
				</Accordion.Content>
			</Accordion.Item>

			<!-- Organizations -->
			<Accordion.Item value="orgs" class="py-2 text-base-content">
				<Accordion.Header class="p-2 border-b border-base-100 w-full flex items-start">
					<Accordion.Trigger
						on:click={() => {
							goto('/dashboard?orgs=1')
						}}
						class="flex w-full justify-between"
					>
						<div>
							Your Organizations <span class="text-xs text-info">{organizationsCount}</span>
						</div>
						<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
					</Accordion.Trigger>
				</Accordion.Header>

				<Accordion.Content class="p-2">
					<Organizations organizations={awaited.organizations} />
				</Accordion.Content>
			</Accordion.Item>

			<Accordion.Item value="likes" class="py-2 text-base-content">
				<Accordion.Header class="p-2 border-b border-base-100 w-full flex items-start">
					<Accordion.Trigger
						class="flex w-full justify-between"
						on:click={() => {
							goto('/dashboard?likes=1')
						}}
					>
						<div>Likes <span class="text-xs text-info">{likesCount}</span></div>
						<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
					</Accordion.Trigger>
				</Accordion.Header>

				<Accordion.Content class="p-2 pl-4">
					<Likes likes={awaited.likes} count={likesCount} />
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	{/if}
</Page>
