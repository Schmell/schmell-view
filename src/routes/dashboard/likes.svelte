<script lang="ts">
	import { LikeButton } from '$lib/like'
	import Icon from '@iconify/svelte'
	import IntersectionObserver from '$components/IntersectionObserver.svelte'
	import { goto } from '$app/navigation'
	import type { Like, Event, Venue, Organization, Comment } from '@prisma/client'
	import { svelog } from '$lib/utils'
	import { Combobox } from 'bits-ui'
	import { flyAndScale } from '$lib/utils/transitions'
	import { page } from '$app/stores'

	interface ILikes extends Promise<Partial<Like[]>> {
		id: string
		type: string
		createdAt: Date
		Comment: any // could make special comment type but who really cares
		Event: Event
		Venue: Venue
		Organization: Organization
		[key: string]: any
	}
	export let likes: any
	export let count: number

	const filterItems = [
		{ value: 'series', label: 'Series' },
		{ value: 'events', label: 'Events' },
		{ value: 'organizations', label: 'Organizations' },
		{ value: 'venues', label: 'Venues' },
		{ value: 'comments', label: 'Comments' }
	]

	let inputValue = ''
	$: console.log(inputValue)
	$: switch (inputValue) {
		case 'Series':
			goto(`/dashboard?likes=1&filterLikes=series`)
			break
		case 'Events':
			goto(`/dashboard?likes=1&filterLikes=events`)
			break
		case 'Organizations':
			goto(`/dashboard?likes=1&filterLikes=orgs`)
			break
		case 'Venues':
			goto(`/dashboard?likes=1&filterLikes=venues`)
			break
		case 'Comments':
			goto(`/dashboard?likes=1&filterLikes=comments`)
			break
		default:
		// code block
	}
</script>

<Combobox.Root items={filterItems} bind:inputValue>
	<div class="relative w-80 mb-4">
		<Combobox.Input
			class="flex input rounded-lg w-full text-sm transition-colors placeholder:text-foreground-alt/50 "
			placeholder="Select a filter"
			aria-label="Filter Items"
		/>
		<Icon
			class="text-3xl font-bold text-info text-opacity-30 absolute right-2 top-2"
			icon="ph:caret-up-down"
		/>
	</div>

	<Combobox.Content
		class="w-full rounded-xl border border-base-300 bg-base-100 px-1 py-3 shadow-xl"
		transition={flyAndScale}
		sideOffset={8}
	>
		{#each filterItems as item (item.value)}
			<Combobox.Item
				class="flex h-10 w-full select-none items-center rounded-button py-3 pl-5 pr-1.5 text-sm capitalize outline-none transition-all duration-75 data-[highlighted]:bg-base-200"
				value={item.value}
				label={item.label}
			>
				{item.label}
				<Combobox.ItemIndicator class="ml-auto" asChild={false}>
					<Icon icon="mdi:check" />
				</Combobox.ItemIndicator>
			</Combobox.Item>
		{:else}
			<span class="block px-5 py-2 text-sm text-muted-foreground"> No results found </span>
		{/each}
	</Combobox.Content>
	<Combobox.HiddenInput name="filterBy" />
</Combobox.Root>

{#await likes}
	<progress class="progress w-full" />
{:then likes}
	{#if !likes.length}
		<div class="text-sm">You have not liked anything yet</div>
	{:else}
		{#each likes as like}
			{#if like.type === 'event'}
				<div
					class="relative p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-accent w-full rounded-lg shadow-xl"
				>
					<a href="/events/{like.Event?.id}">
						<div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-info bg-opacity-10">
							{like.type}
						</div>
					</a>
					<div class="flex justify-between w-full pl-4">
						<a href="/events/{like.Event?.id}">
							<div>
								{@html like.Event?.name}
								<div class="text-xs opacity-40">
									{like.createdAt.toLocaleDateString()}
								</div>
							</div>
						</a>
						<LikeButton class="text-base-content mr-3 " type="event" item={like.Event} />
					</div>
				</div>
			{/if}

			{#if like.type === 'comment'}
				<div
					class="p-0 pb-2 flex flex-col gap-4 mb-4 border-l-4 border-success w-full rounded-lg shadow-xl"
				>
					<div
						class="flex justify-between w-full pl-2 py-2 pr-4 rounded-t-xl bg-success bg-opacity-10"
					>
						<div class="capitalize tracking-wide font-bold">
							{like.Comment?.type}
							{like.type}
						</div>
						<div>
							{#if like.Comment?.type === 'venue'}
								{like.Comment.Venue?.name}
							{/if}
							{#if like.Comment?.type === 'event'}
								{like.Comment.Event?.name}
							{/if}
							{#if like.Comment?.type === 'organization'}
								{like.Comment.Organization?.name}
							{/if}
							{#if like.Comment?.type === 'Comp'}
								{like.Comment.Comp?.boat ?? like.Comment.Comp?.skipper}
							{/if}
							{#if like.Comment?.type === 'User'}
								{like.Comment.User?.name}
							{/if}
						</div>
					</div>

					<div class="flex justify-between w-full pl-4">
						<div>
							{@html like.Comment?.comment}
							<div class="text-xs">
								{like.Comment?.User.username}
							</div>
							<div class="text-xs opacity-40">
								{like.createdAt.toLocaleDateString()}
							</div>
						</div>

						<div class="pr-4 flex gap-2">
							<LikeButton item={like.Comment} type="comment" class="text-base-content" />
						</div>
					</div>
				</div>
			{/if}

			{#if like.type === 'venue'}
				<div
					class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"
				>
					<a href="/venue/{like.Venue?.id}">
						<div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-secondary bg-opacity-10">
							{like.type}
						</div>
					</a>
					<div class="flex justify-between w-full pl-4">
						<a href="/venue/{like.Venue?.id}">
							<div>
								{like.Venue?.name}
								<div class="text-xs opacity-40">
									{like.createdAt.toLocaleDateString()}
								</div>
							</div>
						</a>
						<div class="pr-4">
							<LikeButton item={like.Venue} type="venue" class="text-base-content" />
						</div>
					</div>
				</div>
			{/if}

			{#if like.type === 'organization'}
				<div
					class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-warning w-full rounded-lg shadow-xl"
				>
					<a href="/organization/{like.Organization?.id}">
						<div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-warning bg-opacity-10">
							{like.type}
						</div>
					</a>
					<div class="flex justify-between w-full pl-4">
						<a href="/organization/{like.Organization?.id}">
							<div class="flex items-center gap-2">
								<Icon icon="clarity:organization-line" />
								{like.Organization?.name}
								<div class="text-xs opacity-40">
									{like.createdAt.toLocaleDateString()}
								</div>
							</div>
						</a>
						<div class="pr-4">
							<LikeButton type="organization" item={like.Organization} class="text-base-content" />
						</div>
					</div>
				</div>
			{/if}
		{/each}
		<!-- svelte-ignore missing-declaration -->
		{#if likes.length - 1 < count}
			<IntersectionObserver let:intersecting top={400}>
				{#if intersecting}
					<div class="opacity-0">
						{goto(`/dashboard?likes=1&likeCursor=${likes.at(-1)?.id}`)}
					</div>
				{/if}
			</IntersectionObserver>
		{/if}
	{/if}
{/await}
