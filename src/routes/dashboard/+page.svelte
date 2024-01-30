<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Page from '$lib/components/layout/Page.svelte'
	import FollowButton from '$lib/follow/follow-button.svelte'
	import { LikeButton } from '$lib/like/index.js'
	import Icon from '@iconify/svelte'
	import { Accordion } from 'bits-ui'

	export let data
	$: ({ user, events, series, following, organizations, likes, userStats } = data)
</script>

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
		{#if !organizations.length}
			<!-- Open the modal using ID.showModal() method -->
			<!-- <button class="btn" on:click="my_modal_5.showModal()">open modal</button> -->
			<dialog id="my_modal_5" open={true} class="modal sm:modal-middle">
				<div class="modal-box">
					<h3 class="font-bold text-lg">Hello!</h3>
					<p class="py-4">Press ESC key or click the button below to close</p>
					<div class="modal-action">
						<form method="dialog">
							<!-- if there is a button in form, it will close the modal -->
							<a
								href="/organization/new/edit?from={$page.url.pathname}{$page.url.search}"
								class="btn btn-primary w-full">Create Organization</a
							>
						</form>
					</div>
				</div>
			</dialog>
		{:else}
			<Accordion.Root value={['events', 'following']} class="pt-4" multiple>
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
								<div class="text-sm">You have no Events or Series yet!</div>
								<a href="/events/createEvent" class="btn btn-primary rounded-full">Add event</a>
							{:else}
								{#each events as event}
									<a
										href="/events/{event?.id}"
										class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-accent w-full rounded-lg shadow-xl"
									>
										<div class="capitalize w-full p-2 font-bold rounded-t-xl bg-info bg-opacity-10">
											<div class="flex justify-between">
												<div class="line-clamp-1">{event.name}</div>
												<div class="flex gap-1 items-center min-w-fit text-xs pr-2">
													<Icon icon="mdi:thumb-up" />
													{event._count.Likes} /
													<Icon icon="mdi:bell-ring" />
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
													<div class="badge badge-success">
														<Icon icon="mdi:check" />
														<!-- complete -->
													</div>
												{:else}
													<div class="badge badge-warning">
														<Icon icon="material-symbols:progress-activity" />
													</div>
												{/if}
											</div>
										</div>
										<!-- Organization -->
										<div class="flex justify-between items-end w-full px-4">
											<div>
												<div class="flex items-center text-xs gap-4">
													<div class="flex items-center gap-2">
														<Icon icon="clarity:organization-line" />
														{event?.Organization?.name}
													</div>
													<div class="flex items-center gap-1">
														<div class="flex items-center gap-1 min-w-fit">
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

								{#each series as ser}
									<a
										href="/series/{ser?.id}"
										class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"
									>
										<div
											class="capitalize w-full p-2 font-bold rounded-t-xl bg-secondary bg-opacity-10"
										>
											<div class="flex justify-between">
												<div class="line-clamp-1">{ser.name}</div>
												<div class="flex gap-1 items-center min-w-fit text-xs pr-2">
													<Icon icon="mdi:thumb-up" />
													{ser._count.Likes} /
													<Icon icon="mdi:bell-ring" />
													{ser._count.Follows}
												</div>
											</div>
										</div>
										<div class="p-2 px-4">
											{@html ser.description}
										</div>

										<a
											href="/organization/{ser.Organization?.id}"
											class="flex justify-between w-full px-4"
										>
											<div class="flex gap-2 items-center text-xs">
												<Icon icon="clarity:organization-line" />
												{ser.Organization?.name}
											</div>
											<div class="text-xs opacity-40">
												{ser?.createdAt?.toLocaleDateString()}
											</div>
										</a>
									</a>
								{/each}
							{/if}
						</div>
					</Accordion.Content>
				</Accordion.Item>

				<!-- Following -->
				<Accordion.Item value="following" class="py-2 text-base-content">
					<Accordion.Header class="p-2 border-b border-base-100 w-full flex items-start">
						<Accordion.Trigger class="flex w-full justify-between">
							<div>Following</div>
							<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
						</Accordion.Trigger>
					</Accordion.Header>

					<Accordion.Content class="p-2">
						{#if !following.length}
							<div class="text-sm">You are not Following anything yet</div>
						{:else}
							{#each following as follow}
								{#if follow.type === 'event'}
									<a
										href="/events/{follow.Event?.id}"
										class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-accent w-full rounded-lg shadow-xl"
									>
										<a href="/events/{follow.Event?.id}">
											<div
												class="capitalize w-full pl-2 font-bold rounded-t-xl bg-info bg-opacity-10"
											>
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
												<FollowButton type="event" item={follow.Event} userId={user.userId} />
											</div>
										</div>
									</a>
								{/if}

								{#if follow.type === 'venue'}
									<div
										class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"
									>
										<a href="/venue/{follow.Venue?.id}">
											<div
												class="capitalize w-full pl-2 font-bold rounded-t-xl bg-secondary bg-opacity-10"
											>
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
												<FollowButton item={follow.Venue} type="venue" userId={user.userId} />
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
											<div
												class="capitalize w-full pl-2 font-bold rounded-t-xl bg-warning bg-opacity-10"
											>
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
												<FollowButton
													item={follow.Organization}
													type="organization"
													userId={user.userId}
												/>
											</div>
										</div>
									</div>
								{/if}

								{#if follow.type === 'comp'}
									<div
										class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-success w-full rounded-lg shadow-xl"
									>
										<a href="/comp/{follow.Comp?.id}">
											<div
												class="capitalize w-full pl-2 font-bold rounded-t-xl bg-success bg-opacity-10"
											>
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
												<FollowButton item={follow.Comp} type="comp" userId={user.userId} />
											</div>
										</div>
									</div>
								{/if}
							{/each}
						{/if}
					</Accordion.Content>
				</Accordion.Item>

				<!-- Organizations -->
				<Accordion.Item value="orgs" class="py-2 text-base-content">
					<Accordion.Header class="p-2 border-b border-base-100 w-full flex items-start">
						<Accordion.Trigger class="flex w-full justify-between">
							<div>Your Organizations</div>
							<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
						</Accordion.Trigger>
					</Accordion.Header>

					<Accordion.Content class="p-2">
						<div class="flex flex-col gap-2">
							{#if !organizations.length}
								<div class="text-sm">You have no Organizations yet</div>
								<a href="/organization/edit" class="btn btn-primary rounded-full">
									Add organization
								</a>
							{:else}
								{#each organizations as org}
									<a
										href="/organization/{org.id}"
										class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-warning w-full rounded-lg shadow-xl"
									>
										<div
											class="capitalize w-full p-2 font-bold rounded-t-xl bg-warning bg-opacity-10"
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
										</div>
									</a>
								{/each}
							{/if}
						</div>
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
							<div>Likes</div>
							<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
						</Accordion.Trigger>
					</Accordion.Header>

					<Accordion.Content class="p-2 pl-4">
						{#if !likes.length}
							<div class="text-sm">You have not liked anything yet</div>
						{:else}
							{#each likes as like}
								{#if like.type === 'event'}
									<div
										class="relative p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-accent w-full rounded-lg shadow-xl"
									>
										<a href="/events/{like.Event?.id}">
											<div
												class="capitalize w-full pl-2 font-bold rounded-t-xl bg-info bg-opacity-10"
											>
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
											<LikeButton
												class="text-base-content mr-3 "
												type="event"
												item={like.Event}
												userId={user.userId}
											/>
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
												<LikeButton
													item={like.Comment}
													type="comment"
													userId={user.userId}
													class="text-base-content"
												/>
											</div>
										</div>
									</div>
								{/if}

								{#if like.type === 'venue'}
									<div
										class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"
									>
										<a href="/venue/{like.Venue?.id}">
											<div
												class="capitalize w-full pl-2 font-bold rounded-t-xl bg-secondary bg-opacity-10"
											>
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
												<LikeButton
													item={like.Venue}
													type="venue"
													userId={user.userId}
													class="text-base-content"
												/>
											</div>
										</div>
									</div>
								{/if}

								{#if like.type === 'organization'}
									<div
										class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-warning w-full rounded-lg shadow-xl"
									>
										<a href="/organization/{like.Organization?.id}">
											<div
												class="capitalize w-full pl-2 font-bold rounded-t-xl bg-warning bg-opacity-10"
											>
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
												<LikeButton
													type="organization"
													item={like.Organization}
													userId={user.userId}
													class="text-base-content"
												/>
											</div>
										</div>
									</div>
								{/if}
							{/each}
						{/if}
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		{/if}
	{/if}
</Page>
