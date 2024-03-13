<script script lang="ts">
	import { Page } from '$components/layout'
	import Comments from '$lib/comments/comments.svelte'
	import LikeFollow from '$lib/like/like-follow.svelte'
	import { getHref, isUrl, svelog } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import { Avatar, Tooltip } from 'bits-ui'
	import type { PageData } from './$types'
	import EditMenu from './editMenu.svelte'
	import { flyAndScale } from '$lib/utils/transitions'
	import { ScrollArea } from 'bits-ui'
	import Progress from '$components/progress.svelte'
	import StatusBadge from '$components/statusBadge.svelte'

	export let data: PageData
	$: ({ event, user, awaited } = data)
	$: userId = user?.userId

	let showRaces = false
	let progressTip
	//
</script>

<svelte:head>
	<title>{event?.name ?? 'No Event'} - Schmell View</title>
</svelte:head>

{#if data}
	<Page title={event?.name}>
		<div
			class="mt-18 mb-8 max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl"
		>
			<div class="md:flex">
				<div class="md:shrink-0 flex relative">
					<div class="flex absolute top-2 right-2">
						{#if !event.public}
							<div class="badge badge-error shadow-md">Private</div>
						{:else}
							<div class="badge badge-success shadow-md">Public</div>
						{/if}
					</div>
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
						alt="Title for {event?.name}"
						src={event?.titleImage
							? event?.titleImage
							: event.Organization?.titleImage
							? event.Organization.titleImage
							: 'https://picsum.photos/id/147/200/400'}
					/>
					<div class="absolute w-full flex justify-end bottom-2 right-2 p-2">
						<div>
							<LikeFollow item={event} type="event" />
							<!-- Count thing -->
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
				<div class="pt-4 px-8 w-full">
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
					</div>
				</div>
				<div class="pb-2 pr-6">
					<!--  -->
					<StatusBadge status={event.complete ? 'success' : 'warning'}>
						{event.complete ? 'Complete' : 'In progress'}
					</StatusBadge>
				</div>
			</div>

			<div class="px-4 pb-4 flex justify-between items-center">
				<button class="btn btn-ghost btn-xs uppercase" on:click={() => (showRaces = !showRaces)}>
					{showRaces ? '^ Hide Races' : '⌄ Show Races'}
				</button>

				<div>
					<div class="flex items-center justify-center">
						<EditMenu {event} />

						<!-- User Avatar -->
						<Tooltip.Root openDelay={1000}>
							<Tooltip.Trigger>
								<a href="/user/{event.publisherId}" class="btn btn-ghost rounded-full m-0 p-0">
									<Avatar.Root class="avatar w-8 bg-base-content bg-opacity-30 rounded-full ">
										<Avatar.Image
											class=" rounded-full"
											alt={event.Publisher?.username}
											src={event.Publisher?.avatar}
										/>
										<Avatar.Fallback />
									</Avatar.Root>
								</a>
							</Tooltip.Trigger>
							<Tooltip.Content
								transition={flyAndScale}
								transitionConfig={{ y: 8, duration: 150 }}
								side="left"
								sideOffset={8}
							>
								<div class="p-2 bg-base-300 rounded-lg">{user?.username}</div>
							</Tooltip.Content>
						</Tooltip.Root>
					</div>
				</div>
			</div>
		</div>

		<!-- NEW RACES VIEW ///////////////////////////////////////////////// -->
		{#if showRaces}
			<ScrollArea.Root class="">
				<ScrollArea.Viewport class=" max-h-36 w-full">
					<ScrollArea.Content>
						<div class="flex gap-8 p-4 w-full shadow-xl overflow-scroll min-h-36">
							{#await awaited.races}
								<progress class="progress progress-accent px-4 w-full" />
							{:then races}
								{#each races as race}
									<a href="/results/{race.id}" class="relative">
										<div
											class="border-opacity-50 border-l-2 border-b-2 border-accent rounded-lg rounded-tl-lg rounded-tr-[3em] overflow-hidden min-w-36 max-w-42"
										>
											<div class="shadow-lg bg-base-100 p-2 pl-4">
												{race.name}
											</div>

											<div
												class="badge badge-success shadow-md absolute -right-2 top-2 z-10"
												class:badge-error={!Number(race.sailed)}
											>
												{#if Number(race.sailed)}
													<Icon icon="mdi:check" />
												{:else}
													<Icon icon="mdi:minus-circle-off-outline" />
												{/if}
											</div>

											<div class="flex justify-between items-center p-2 pb-4 px-4">
												<div class="">{race.date ?? 'TBD'}</div>
											</div>
											<div class="text-accent text-xs p-1 flex justify-end">
												{race.updatedAt?.toLocaleDateString()}
											</div>
										</div>
									</a>
								{/each}
							{/await}
						</div>
					</ScrollArea.Content>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar
					orientation="horizontal"
					class="flex select-none rounded-full border-l border-l-orange-50  p-1 w-3 bg-orange-50"
				>
					<ScrollArea.Thumb class=" flex-1 rounded-full bg-orange-500 opacity-40" />
				</ScrollArea.Scrollbar>
				<ScrollArea.Corner />
			</ScrollArea.Root>
		{/if}

		<div class="max-w-xl m-auto flex justify-center">
			<Comments type="event" item={event} {userId} />
		</div>
	</Page>
{/if}
