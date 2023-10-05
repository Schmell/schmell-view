<script lang="ts">
	import Page from '$lib/components/layout/Page.svelte'
	import { formatTime } from '$lib/utils/formatters.js'
	import { capitalizeFirstLetter } from '$lib/utils/index.js'
	import Icon from '@iconify/svelte'
	import { Accordion } from 'bits-ui'

	export let data
	$: ({ user, events, following, likes } = data)
</script>

<Page title="Home">
	{#if !user}
		<h1>No user found</h1>
	{:else}
		<div class="flex gap-4 items-center bg-neutral-800 rounded-xl p-2 pl-4">
			<img
				class="rounded-full w-14 h-14 bg-neutral-content"
				src={user.avatar}
				alt={user.username}
			/>
			<div>
				<h2 class="m-0">{user.username}</h2>
				<div class="text-xs text-secondary">{user.userId}</div>
			</div>
		</div>

		<Accordion.Root class="pt-4">
			<Accordion.Item value="first" class="py-2 text-base-content">
				<Accordion.Header class="p-2 border-b border-base-100 w-full flex items-start">
					<Accordion.Trigger class="flex w-full justify-between">
						<div>Your Events</div>
						<Icon icon="material-symbols:arrow-drop-down-circle-outline" />
					</Accordion.Trigger>
				</Accordion.Header>

				<Accordion.Content class="p-2">
					<div class="flex flex-col gap-2">
						{#each events as event}
							<a
								href="/events/{event.id}"
								class="pt-2 pl-2 flex justify-between border-l-4 border-accent w-full"
							>
								<div>
									{@html event.name}
								</div>
								<a href="/Organization/{event.organizationId}" class="text-xs"
									>{event.Organization?.name}</a
								>
							</a>
						{/each}
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

				<Accordion.Content class="p-2">This is the first accordion content</Accordion.Content>
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
										{like.Event?.name}
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
		<!-- <form method="post" action="?/logout" use:enhance>
			<Button>Sign out</Button>
		</form> -->
	{/if}
</Page>

<style>
	/* .item {
		@apply p-2 rounded-md bg-primary w-full flex items-start;
	} */
</style>
