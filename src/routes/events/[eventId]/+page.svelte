<script script lang="ts">
	import { page } from '$app/stores'
	import { Page } from '$components/layout'
	import Comments from '$lib/comment/comments.svelte'
	import LikeFollow from '$lib/like/like-follow.svelte'
	import Icon from '@iconify/svelte'
	import { superForm } from 'sveltekit-superforms/client'
	import type { PageData } from './$types'

	export let data: PageData
	// export let form
	$: ({ event, user } = data)
	// $: console.log('event: ', event)
	// $: console.log('user: ', user)

	let showRaces: boolean = true

	function getHref(website: string | null) {
		if (!website) return null
		return website && website.startsWith('http://') ? website : `http://${website}`
	}

	function checkForImage(imageString) {
		if (!imageString) return null
		if (
			imageString.startsWith('http://') ||
			imageString.startsWith('https://') ||
			imageString.startsWith('data:image')
		)
			return imageString
		return ''
	}

	const commentFormObj = superForm(data.commentForm)
	const deleteCommentFormObj = superForm(data.deleteCommentForm)
	// deleteForm
</script>

{#if data}
	<Page title={event?.name}>
		<div
			class="mt-18 mb-8 max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl"
		>
			<div class="md:flex">
				<div class="md:shrink-0 flex relative">
					<!-- {console.log('event?.Organization?.titleImage: ', event?.Organization?.titleImage)} -->
					{#if checkForImage(event.Venue?.burgee)}
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
							: 'https://picsum.photos/id/384/400/300/'}
						alt="Title for {event?.name}"
					/>

					<LikeFollow item={event} userId={user?.userId} type="event" />
				</div>
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
				<div class="pt-8 px-8 w-full">
					<div class="flex justify-between w-full">
						<div class="uppercase tracking-wide text-xl text-accent font-semibold">
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
							<div>-</div>
							<a
								href={getHref(event.Venue.website)}
								class="mt-1 flex gap-1 items-center text-xs leading-tight text-base-content hover:underline"
							>
								<Icon icon="gridicons:popout" />
								{event.Venue.website}
							</a>
						</div>
					{/if}

					<p class="py-2 opacity-70">
						{@html event?.description ? event?.description : 'No description provided'}
					</p>

					<div class="">
						<a href="/organization/{event.Organization?.id}" class="underline">
							{event.Organization?.name}
						</a>
						<a
							href={getHref(event?.eventwebsite)}
							class="flex items-center gap-1 text-secondary font-semibold uppercase"
						>
							<Icon icon="gridicons:popout" />
							{event?.eventwebsite}
						</a>
					</div>
				</div>
			</div>

			<!-- Tools  -->
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
							<a
								href="/events/edit/{event?.id}?from={$page.url.pathname}"
								class="btn btn-ghost p-1"
							>
								<Icon class="text-3xl text-primary" icon="material-symbols:edit-outline" />
							</a>
						</div>
					{/if}
				</div>
			</div>

			<!-- ////////////////////////////////////////////////////////////////////////////// -->

			{#if showRaces}
				{#each event.Races as race}
					<a href="/results/{race.id}">
						<div class=" p-0 m-2 mx-4 border-t text-base-content">
							<div class="w-full pt-1">
								<h1 class="text-xl font-semibold">{race.name}</h1>
							</div>
							<div class="flex justify-between">
								<div class="text-xs">
									{race.date ? race.date : ''}
									{race.time ? `- ${race.time}` : ''}
								</div>

								<div class="badge badge-accent" class:badge-error={!Number(race.sailed)}>
									{Number(race.sailed) ? 'Sailed' : 'Unsailed'}
								</div>
							</div>
						</div>
					</a>
				{/each}
			{/if}
		</div>

		<Comments item={event} type="event" {user} formObj={commentFormObj} />
	</Page>
{/if}
