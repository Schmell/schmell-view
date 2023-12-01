<script script lang="ts">
	import { page } from '$app/stores'
	import { Page } from '$components/layout'
	import LikeFollow from '$lib/like/like-follow.svelte'
	import Comments from '$lib/newComment/comments.svelte'
	import { isUrl } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'
	import { goto } from '$app/navigation'

	export let data: PageData
	$: ({ event, user, comments } = data)

	let showRaces: boolean = true

	function getHref(website: string | null) {
		if (!website) return null
		return (website && website.startsWith('http://')) || website.startsWith('https://')
			? website
			: `http://${website}`
	}

	//
</script>

{#if data}
	<Page title={event?.name}>
		<div
			class="mt-18 mb-8 max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl"
		>
			<div class="md:flex">
				<div class="md:shrink-0 flex relative">
					{#if !event.public}
						<div class="badge badge-error absolute right-2 top-2 shadow-md">Private</div>
						<!-- {:else}
						<div class="badge badge-success absolute right-2 top-2 shadow-md">Public</div> -->
					{/if}
					{#if isUrl(event.Venue?.burgee)}
						<img
							class="absolute z-10 left-2 top-2 rounded-full shadow-xl"
							width="60px"
							src={event.Venue?.burgee}
							alt={event.Venue?.name}
						/>
					{/if}
					<img
						class="h-48 w-full object-cover md:h-full md:w-48 rounded-br-full"
						src={event?.titleImage
							? event?.titleImage
							: event.Organization?.titleImage
							? event.Organization.titleImage
							: 'https://picsum.photos/200/400'}
						alt="Title for {event?.name}"
					/>
					<div class="absolute w-full flex justify-end bottom-0 right-4 p-2">
						<div>
							<!-- Likes and follows -->
							<LikeFollow item={event} userId={user?.userId} type="event" />
							<div class="flex justify-end text-sm">
								<span class="pr-1 flex items-center text-xs">
									{event._count.Likes}
									<Icon class="px-1 text-lg" icon="mdi:thumbs-up" />
								</span>
								/
								<span class="pr-2 pl-2 flex items-center text-xs">
									{event._count.Follows}
									<Icon class="px-1 text-lg" icon="mdi:bell-ring" />
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="pt-2 px-8 w-full">
					<div class="flex justify-end">
						{#if event.complete}
							<div class="badge badge-success shadow-md">complete</div>
						{:else}
							<div class="badge badge-warning shadow-md w-36">In progress</div>
						{/if}
					</div>
					<div class="flex justify-between w-full">
						<div class="uppercase tracking-wide text-xl text-accent font-semibold line-clamp-1">
							{@html event?.name}
						</div>
					</div>
					{#if event?.Venue}
						<div class="flex items-center gap-4">
							<a
								href={`/venue/${event?.venueId}`}
								class="mt-1 text-lg leading-tight text-base-content hover:underline"
							>
								{event.Venue.name ? event.Venue.name : 'No venue provided'}
							</a>
							{#if event.Venue.website}
								<div>-</div>
								<a
									href={getHref(event.Venue.website)}
									class="mt-1 line-clamp-1 flex gap-1 items-center text-xs leading-tight text-base-content hover:underline"
								>
									<Icon icon="gridicons:popout" />
									{event.Venue.website}
								</a>
							{/if}
						</div>
					{/if}

					<p class="py-2 opacity-70">
						{@html event?.description ? event?.description : 'No description provided'}
					</p>

					<div class="">
						<a href="/organization/{event.Organization?.id}" class="underline">
							{event.Organization?.name}
						</a>
						{#if event?.eventwebsite}
							<a
								href={getHref(event?.eventwebsite)}
								target="_blank"
								class="flex items-center gap-1 text-secondary font-semibold uppercase"
							>
								<Icon icon="gridicons:popout" />
								<div class="inline line-clamp-1">
									{event?.eventwebsite}
								</div>
							</a>
						{/if}
						<!-- Likes and follows -->
						<div class="flex justify-end text-sm">
							<span class="pr-1 flex items-center text-xs">
								{event._count.Likes}
								<Icon class="px-1 text-lg" icon="mdi:thumbs-up" />
							</span>
							/
							<span class="pr-2 pl-2 flex items-center text-xs">
								{event._count.Follows}
								<Icon class="px-1 text-lg" icon="mdi:bell-ring" />
							</span>
						</div>
					</div>
				</div>
			</div>

			<div class="px-4 pb-4 flex justify-between items-center">
				<button
					class="btn btn-ghost btn-xs"
					on:click={() => {
						showRaces = !showRaces
					}}
				>
					{showRaces ? '^ Hide Races' : '⌄ Show Races'}
				</button>
				<div>
					<div class="tooltip tooltip-top" data-tip="View Competitors">
						<a href="/comps/{event?.id}" class="btn btn-ghost p-1">
							<Icon class="text-3xl text-primary" icon="material-symbols:groups-outline-rounded" />
						</a>
					</div>

					<div class="tooltip tooltip-top" data-tip="Edit Races">
						<a href="/races/{event?.id}" class="btn btn-ghost p-1">
							<Icon class="text-3xl text-primary" icon="material-symbols:box-edit-outline" />
						</a>
					</div>

					{#if data.user?.userId === event?.publisherId}
						<div class="tooltip tooltip-top" data-tip="Edit Event">
							<!-- href="/events/{event?.id}/edit?from={$page.url.pathname}" -->
							<button
								on:click={() => {
									goto(`/events/${event?.id}/edit?from=${$page.url.pathname}`, {
										// replaceState: true,
										state: { info: 'this is info' }
									})
								}}
								class="btn btn-ghost p-1"
							>
								<Icon class="text-3xl text-primary" icon="material-symbols:edit-outline" />
							</button>
						</div>
					{/if}
				</div>
			</div>
			<!-- ////////////////////////////////////////////////////////////////////////////// -->

			{#if showRaces}
				{#await data.await.races}
					<progress class="progress progress-accent px-4 w-full" />
				{:then races}
					{#each races as race}
						<a href="/results/{race.id}">
							<div class=" p-2 px-8 border-b-4 border-l-4 rounded-lg border-base-200 m-4">
								<div class="w-full pt-1">
									<h1 class="text-xl font-semibold">{race.name}</h1>
								</div>
								<div class="flex justify-between pb-2">
									<div class="text-xs">
										{race.date ? race.date : ''}
										{race.time ? `- ${race.time}` : ''}
									</div>

									<div
										class="badge badge-success shadow-md"
										class:badge-error={!Number(race.sailed)}
									>
										{Number(race.sailed) ? 'Sailed' : 'Unsailed'}
									</div>
								</div>
							</div>
						</a>
					{/each}
				{/await}
			{/if}
			<div class="p-4 pb-12">
				<Comments
					type="event"
					item={event}
					comments={data.comments}
					{user}
					commentForm={data.commentForm}
				/>
			</div>
		</div>
	</Page>
{/if}
