<script lang="ts">
	import Page from '$lib/components/layout/Page.svelte'
	import Icon from '@iconify/svelte'
	import { Accordion } from 'bits-ui'

	export let data
	$: ({ user, events, series, following, organizations, likes } = data)

	// $: console.log('events: ', events)
</script>

<Page title="Home">
	{#if !user}
		<h1>No user found</h1>
	{:else}
		<div
			class="p-2 pl-4 flex gap-4 items-center bg-base-300 rounded-xl shadow-md border-r-2 border-b-4 border-accent-focus"
		>
			<div class="p-1 bg-base-200 rounded-full shadow-md">
				<img
					class="rounded-full w-14 h-14 bg-neutral-content"
					src={user.avatar}
					alt={user.username}
				/>
			</div>
			<div>
				<h2 class="m-0">{user.username}</h2>
				<div class="text-xs text-secondary">{user.userId}</div>
			</div>
		</div>

		<Accordion.Root class="pt-4" multiple>
			<Accordion.Item value="events" class="py-2 text-base-content">
				<Accordion.Header class="p-2 border-b border-base-100 w-full flex items-start">
					<Accordion.Trigger class="flex w-full justify-between">
						<div>Your Events / Series</div>
						<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
					</Accordion.Trigger>
				</Accordion.Header>

				<Accordion.Content class="p-2">
					<div class="flex flex-col gap-2">
						{#if !events.length && !series.length}
							<div>No Events or Series</div>
						{:else}
							{#each events as event}
								<a
									href="/events/{event?.id}"
									class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-accent w-full rounded-lg shadow-xl"
								>
									<div class="capitalize w-full p-2 font-bold rounded-r-xl bg-info bg-opacity-10">
										<div class="flex justify-between">
											<div>{event.name}</div>
											<div class="flex gap-1 items-center text-xs pr-2">
												<Icon icon="mdi:thumb-up" />
												{event._count.Likes} /
												<Icon icon="material-symbols:bookmark-add-outline-rounded" />
												{event._count.Follows}
											</div>
										</div>
									</div>
									<div class="px-4">
										{@html event?.name} -
										<span class="text-xs">{@html event?.Venue?.name}</span>
										<div class="flex justify-between">
											<div>
												{event?._count.Races} of {event.Races.length} races sailed
											</div>
											<!-- Need to have a complete flag on the event -->
											{#if event._count.Races === event.Races.length || event.complete}
												<div class="badge badge-success">Complete</div>
											{:else}
												<div class="badge badge-warning">In progress</div>
											{/if}
										</div>
									</div>
									<!-- Organization -->
									<div class="flex justify-between items-end w-full px-4">
										<div>
											<div class="flex items-center text-xs gap-4">
												<div>
													{event?.Organization?.name}
												</div>
												<div class="flex items-center gap-1">
													<div class="flex items-center gap-1">
														<Icon icon="mdi:thumb-up" />
														{event._count.Likes}
													</div>
													/
													<div class="flex items-center gap-1">
														<Icon icon="mdi:bell-ring" />
														{event._count.Follows}
													</div>
												</div>
											</div>
										</div>

										<div class="text-xs opacity-40">
											{event?.createdAt?.toLocaleDateString()}
										</div>
									</div>
								</a>
							{/each}

							{#each series as event}
								<a
									href="/series/{event?.id}"
									class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"
								>
									<div
										class="capitalize w-full pl-2 font-bold rounded-r-xl bg-secondary bg-opacity-10"
									>
										{event.Organization?.name}
									</div>

									<div class="flex justify-between w-full pl-4">
										<div>
											{@html event?.name}
											<div class="text-xs opacity-40">
												{event?.createdAt?.toLocaleDateString()}
											</div>
										</div>
									</div>
								</a>
							{/each}
						{/if}
					</div>
				</Accordion.Content>
			</Accordion.Item>

			<Accordion.Item value="orgs" class="py-2 text-base-content">
				<Accordion.Header class="p-2 border-b border-base-100 w-full flex items-start">
					<Accordion.Trigger class="flex w-full justify-between">
						<div>Your Organizations</div>
						<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
					</Accordion.Trigger>
				</Accordion.Header>

				<Accordion.Content class="p-2">
					<div class="flex flex-col gap-2">
						{#if !organizations}
							<div>No Organizations</div>
						{:else}
							{#each organizations as org}
								<a
									href="/organization/{org.id}"
									class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-warning w-full rounded-lg shadow-xl"
								>
									<div
										class="capitalize w-full p-2 font-bold rounded-r-xl bg-warning bg-opacity-10"
									>
										<div class="flex justify-between">
											<div>{org.name}</div>
											<div class="flex gap-1 items-center text-xs pr-2">
												<Icon icon="mdi:thumb-up" />
												{org._count.Likes} /
												<Icon icon="material-symbols:bookmark-add-outline-rounded" />
												{org._count.Follows}
											</div>
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
										<!-- <div class="rounded-full shadow-md">
											<Like item={event} userId={user.userId} type="event" />
										</div> -->
										<!-- <div class="text-xs text-secondary">
											Likes: {org._count.Likes} / Following: {org._count.Follows}
										</div> -->
									</div>
								</a>
							{/each}
						{/if}
					</div>
				</Accordion.Content>
			</Accordion.Item>

			<Accordion.Item value="following" class="py-2 text-base-content">
				<Accordion.Header class="p-2 border-b border-base-100 w-full flex items-start">
					<Accordion.Trigger class="flex w-full justify-between">
						<div>Following</div>
						<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
					</Accordion.Trigger>
				</Accordion.Header>

				<Accordion.Content class="p-2">
					{#if !following.length}
						<div>Not Following anything</div>
					{:else}
						{#each following as follow}
							<!-- content here -->
							{#if follow.type === 'event'}
								<a
									href="/events/{follow.Event?.id}"
									class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-accent w-full rounded-lg shadow-xl"
								>
									<div class="capitalize w-full pl-2 font-bold rounded-r-xl bg-info bg-opacity-10">
										{follow.type}
									</div>
									<div class="flex justify-between w-full pl-4">
										<div>
											{@html follow.Event?.name}
											<div class="text-xs opacity-40">
												{follow.createdAt.toLocaleDateString()}
											</div>
										</div>
										<button class="pr-4">
											<Icon icon="mdi:dislike-outline" />
										</button>
									</div>
								</a>
							{/if}

							{#if follow.type === 'venue'}
								<a
									href="/venue/{follow.Venue?.id}"
									class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"
								>
									<div
										class="capitalize w-full pl-2 font-bold rounded-r-xl bg-secondary bg-opacity-10"
									>
										{follow.type}
									</div>
									<div class="flex justify-between w-full pl-4">
										<div>
											{@html follow.Venue?.name}
											<div class="text-xs opacity-40">
												{follow.createdAt.toLocaleDateString()}
											</div>
										</div>
										<button class="pr-4">
											<Icon icon="mdi:dislike-outline" />
										</button>
									</div>
								</a>
							{/if}

							{#if follow.type === 'organization'}
								<a
									href="/organization/{follow.Organization?.id}"
									class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-warning w-full rounded-lg shadow-xl"
								>
									<div
										class="capitalize w-full pl-2 font-bold rounded-r-xl bg-warning bg-opacity-10"
									>
										{follow.type}
									</div>
									<div class="flex justify-between w-full pl-4">
										<div>
											{@html follow.Organization?.name}
											<div class="text-xs opacity-40">
												{follow.createdAt.toLocaleDateString()}
											</div>
										</div>
										<button class="pr-4">
											<Icon icon="mdi:dislike-outline" />
										</button>
									</div>
								</a>
							{/if}

							{#if follow.type === 'comp'}
								<a
									href="/comp/{follow.Comp?.id}"
									class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-success w-full rounded-lg shadow-xl"
								>
									<div
										class="capitalize w-full pl-2 font-bold rounded-r-xl bg-success bg-opacity-10"
									>
										{follow.type}
									</div>
									<div class="flex justify-between w-full pl-4">
										<div>
											{@html follow.Comp?.boat ?? follow.Comp?.skipper ?? 'No Competitor name'}
											<div class="text-xs opacity-40">
												{follow.createdAt.toLocaleDateString()}
											</div>
										</div>
										<button class="pr-4">
											<Icon icon="mdi:dislike-outline" />
										</button>
									</div>
								</a>
							{/if}
						{/each}
					{/if}
				</Accordion.Content>
			</Accordion.Item>

			<Accordion.Item value="likes" class="py-2 text-base-content">
				<Accordion.Header class="p-2 border-b border-base-100 w-full flex items-start">
					<Accordion.Trigger class="flex w-full justify-between">
						<div>Likes</div>
						<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
					</Accordion.Trigger>
				</Accordion.Header>

				<Accordion.Content class="p-2 pl-4">
					{#each likes as like}
						{#if like.type === 'event'}
							<a
								href="/events/{like.Event?.id}"
								class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-accent w-full rounded-lg shadow-xl"
							>
								<div class="capitalize w-full pl-2 font-bold rounded-r-xl bg-info bg-opacity-10">
									{like.type}
								</div>
								<div class="flex justify-between w-full pl-4">
									<div>
										{@html like.Event?.name}
										<div class="text-xs opacity-40">
											{like.createdAt.toLocaleDateString()}
										</div>
									</div>
									<button class="pr-4">
										<Icon icon="mdi:dislike-outline" />
									</button>
								</div>
							</a>
						{/if}

						{#if like.type === 'venue'}
							<a
								href="/venue/{like.Venue?.id}"
								class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"
							>
								<div
									class="capitalize w-full pl-2 font-bold rounded-r-xl bg-secondary bg-opacity-10"
								>
									{like.type}
								</div>
								<div class="flex justify-between w-full pl-4">
									<div>
										{like.Venue?.name}
										<div class="text-xs opacity-40">
											{like.createdAt.toLocaleDateString()}
										</div>
									</div>
									<button class="pr-4">
										<Icon icon="mdi:dislike-outline" />
									</button>
								</div>
							</a>
						{/if}

						{#if like.type === 'organization'}
							<a
								href="/venue/{like.Organization?.id}"
								class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-warning w-full rounded-lg shadow-xl"
							>
								<div class="capitalize w-full pl-2 font-bold rounded-r-xl bg-warning bg-opacity-10">
									{like.type}
								</div>
								<div class="flex justify-between w-full pl-4">
									<div>
										{like.Organization?.name}
										<div class="text-xs opacity-40">
											{like.createdAt.toLocaleDateString()}
										</div>
									</div>
									<button class="pr-4">
										<Icon icon="mdi:dislike-outline" />
									</button>
								</div>
							</a>
						{/if}
					{/each}
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	{/if}
</Page>

<style>
	/* .item {
		@apply p-2 rounded-md bg-primary w-full flex items-start;
	} */
</style>
