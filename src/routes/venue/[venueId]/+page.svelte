<script lang="ts">
	import { page } from '$app/stores'
	import Page from '$lib/components/layout/Page.svelte'
	import Like from '$lib/like/like.svelte'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'
	import { Accordion, Collapsible } from 'bits-ui'

	export let data: PageData
	$: ({ venue } = data)
	// $: console.log('venue: ', venue)

	let showRaces = false

	let showEvents = false

	function getHref(website: string | null) {
		if (!website) return null
		return website && website.startsWith('http://') ? website : `http://${website}`
	}

	function checkForImage(imageString) {
		if (imageString.startsWith('http://') || imageString.startsWith('data:image'))
			return imageString
		return ''
	}

	// const commentFormObj = superForm(data.commentForm)
</script>

<Page title={venue.name}>
	<div>
		<div class="relative">
			{#if checkForImage(venue.burgee)}
				<img
					class="absolute z-10 left-[-6px] top-[-10px] rounded-full shadow-xl"
					width="60px"
					src={venue.burgee}
					alt={venue.name}
				/>
			{/if}
			<div class=" rounded-tr-xl rounded-tl-xl rounded-bl-xl rounded-br-full">
				<img
					class="pl-2 rounded-xl rounded-br-full"
					class:blur-sm={!venue.titleImage}
					src={venue.titleImage
						? venue.titleImage
						: 'https://cork.org/wp-content/uploads/2011/06/POHBirdsEyeView.jpg'}
					alt={venue.name}
				/>
			</div>
			<div class="absolute right-0 bottom-0 z-10 bg-base-100 p-2 rounded-full shadow-lg">
				<Like type="venue" item={venue} userId={data.user?.userId} />
			</div>
		</div>
		{#if venue.description}
			<div
				class="mt-4 p-4 text-lg bg-base-300 border-base-300 border-b-2 border-l-2 rounded-xl shadow-lg"
			>
				{@html venue.description}
			</div>
		{/if}

		<div class="flex justify-between items-center">
			<div class="flex gap-2 items-center pt-4 text-md font-bold">
				<Icon icon="gridicons:popout" />
				<a href={getHref(venue.website)}>{venue.website ? venue.website : 'no website provided'}</a>
			</div>

			<!-- Publisher -->
			<div class="flex gap-2 items-center">
				<div class="avatar">
					<div class="w-8 rounded-full">
						<img alt={venue.Publisher?.username} src={venue.Publisher?.avatar} />
					</div>
				</div>
				<!-- <div>{venue.Publisher?.name}</div> -->
			</div>
		</div>
		<div class="divider" />

		<div class="flex gap-2 w-full max-w-md justify-between pt-4 relative">
			<div class="w-full">
				<div class="text-sm w-full flex gap-2 justify-between">
					<!--  -->
					<!-- <div>
						<Accordion.Root>
							<Accordion.Item>
							  <Accordion.Header>
								<Accordion.Trigger />
							  </Accordion.Header>
							  <Accordion.Content />
							</Accordion.Item>
						  </Accordion.Root>
					</div> -->
					<!--  -->
					<div class="">
						{#each venue.Addresses as address, i}
							<Collapsible.Root
								open={!(i > 0)}
								onOpenChange={(e) => {
									console.log('e: ', e)
								}}
							>
								<Collapsible.Trigger
									name={address.id}
									class="flex gap-2 w-full justify-between items-center"
								>
									<div class="text-lg">
										{address.name}
									</div>
									<Icon icon="mdi:chevron-down" />
								</Collapsible.Trigger>
								<Collapsible.Content class="pb-2 pt-1">
									<div class="text-xs">
										<p>{address.street ?? ''},</p>
										<span>{address.city}, </span>
										<span>{address.state}, </span>
										<p>{address.code}</p>
									</div>
								</Collapsible.Content>
							</Collapsible.Root>
						{/each}
					</div>

					<div>
						<h2 class="text-lg">Contact:</h2>
						{#if venue.email}
							<p>{venue.email}</p>
						{/if}
						{#if venue.phone}
							<p>{venue.phone}</p>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<div class="flex w-full max-w-md justify-end">
			{#if !showEvents}
				<div class="tooltip tooltip-top" data-tip="Show Events">
					<button
						on:click={() => {
							showEvents = true
						}}
						class="btn btn-ghost p-1"
					>
						<Icon class="text-3xl text-primary" icon="material-symbols:preview-outline" />
					</button>
				</div>
			{:else if showEvents}
				<div class="tooltip tooltip-top" data-tip="Hide Events">
					<button
						on:click={() => {
							showEvents = false
						}}
						class="btn btn-ghost p-1"
					>
						<Icon class="text-3xl text-primary" icon="material-symbols:preview-off" />
					</button>
				</div>
			{/if}

			{#if data.user?.userId === venue?.publisherId}
				<div class="tooltip tooltip-top" data-tip="Edit Venue">
					<a href="/venue/{venue.id}/edit/?from={$page.url.pathname}" class="btn btn-ghost p-1">
						<Icon class="text-3xl text-primary" icon="material-symbols:edit-outline" />
					</a>
				</div>
			{/if}
		</div>

		{#if showEvents}
			<div class="divider" />

			<h1 class="text-3xl font-semibold pb-4">Events:</h1>

			<div class="flex gap-4 flex-col">
				{#each venue.Events as event}
					<div
						class="mt-18 mb-8 max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl"
					>
						<div class="md:flex">
							<div class="md:shrink-0">
								<!-- {console.log('event?.Organization?.titleImage: ', event?.Organization?.titleImage)} -->
								<img
									class="h-48 w-full object-cover md:h-full md:w-48 rounded-br-full"
									src={event?.titleImage
										? event?.titleImage
										: event.Organization?.titleImage
										? event.Organization.titleImage
										: 'https://picsum.photos/id/384/400/300/'}
									alt="Title for {event?.name}"
								/>
							</div>

							<div class="pt-8 px-8 w-full">
								<div class="flex justify-between w-full">
									<div class="uppercase tracking-wide text-xl text-accent font-semibold">
										{@html event?.name}
									</div>

									<div class="max-h-2">
										<Like userId={data.user?.userId} type="event" item={event} />
									</div>
								</div>

								{#if venue}
									<div class="flex items-center gap-4">
										<a
											href={`/venue/${event?.venueId}`}
											class="mt-1 text-lg leading-tight text-base-content hover:underline"
										>
											{venue.name ? venue.name : 'No venue provided'}
										</a>

										<div>-</div>

										<a
											href={getHref(venue.website)}
											class="mt-1 text-xs leading-tight text-base-content hover:underline"
										>
											{venue.website}
										</a>
									</div>
								{/if}

								<p class="mt-2 opacity-70">
									{event?.description ? event?.description : 'No description provided'}
								</p>

								<a href={getHref(event?.eventwebsite)} class="text-secondary"
									>{event?.eventwebsite}
								</a>
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
										<Icon
											class="text-3xl text-primary"
											icon="material-symbols:groups-outline-rounded"
										/>
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
						<!-- </div> -->
						<!-- <Comments item={event} type="event" user={data.user} formObj={commentFormObj} /> -->
					</div>
				{/each}
			</div>
		{/if}
	</div>
</Page>
