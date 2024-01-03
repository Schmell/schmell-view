<script lang="ts">
	import { page } from '$app/stores'
	import { Page } from '$components/layout'
	import LikeFollow from '$lib/like/like-follow.svelte'
	import Comments from '$lib/newComment/comments.svelte'
	import { getHref } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'

	export let data: PageData

	$: ({ org, user } = data)

	// const getHref = (org: Organization | undefined) => {
	// 	if (!org) return null
	// 	return org?.website && org.website.startsWith('http://')
	// 		? org.website
	// 		: `http://${org?.website}`
	// }

	// const commentFormObj = superForm(data.commentForm)
</script>

<Page title={org?.name}>
	{#if !org}
		<div>No Organization provided</div>
	{:else}
		<div class="max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
			<div class="md:flex">
				<div class="relative">
					{#if org.logo}
						<div class="absolute z-10 top-1 left-1 w-10">
							<img src={org.logo} alt={org.name} />
						</div>
					{/if}

					<img
						class="h-48 w-full object-cover md:h-full md:w-48 rounded-br-full"
						src={org.titleImage ? org.titleImage : 'https://picsum.photos/id/384/400/300/'}
						alt="Title image for {org.name}"
					/>
					<!-- Likes and Follows -->
					<div class="right-4 bottom-0 absolute">
						<LikeFollow item={org} userId={user?.userId} type="organization" />
					</div>
				</div>
				<div class="pt-8 pb-4 px-8">
					<div class="uppercase tracking-wide text-2xl text-accent font-semibold">
						{@html org.name}
					</div>
					{#if org.email}
						<a
							href="mailto:{org.email}"
							class="block mt-1 text-lg leading-tight font-medium text-base-content hover:underline"
						>
							<Icon icon="mdi:email-outline" class="inline" />
							{org.email}
						</a>
					{/if}
					<p class="mt-2 p-4">
						{@html org.description ? org.description : ' '}
					</p>
					{#if org.website}
						<a href={getHref(org.website)} class="text-secondary">
							<Icon icon="mdi:link" class="inline" />
							{org.website}
						</a>
					{/if}
				</div>
			</div>
			<div class="px-4 flex flex-col">
				<a href="/">
					<Icon icon="clarity:organization-line" class="inline" />
					View Series
				</a>
				<a href="/events?whereType=organizationId&whereId={org.id}&title={org.name} Events">
					<Icon icon="mdi:calendar-blank-outline" class="inline" />
					View Events
				</a>
				<a href="/">
					<Icon icon="mdi:map-marker" class="inline" />
					View Venues
				</a>
			</div>
			<!-- Tools -->
			<div class="px-4 pb-4 flex justify-end">
				<div class="tooltip tooltip-top" data-tip="View Events">
					<a
						href="/events?whereType=organizationId&whereId={org.id}&title={org.name} Events"
						class="btn btn-ghost p-1"
					>
						<Icon class="text-3xl text-primary" icon="material-symbols:preview" />
					</a>
				</div>

				{#if user?.userId === org.ownerId}
					<div class="tooltip tooltip-top" data-tip="Edit Organization">
						<a
							data-sveltekit-replacestate={true}
							href="/organization/{org.id}/edit?from=/organization/{org.id}&{$page.url.searchParams.toString()}"
							class="btn btn-ghost p-1"
						>
							<Icon class="text-3xl  text-primary" icon="material-symbols:edit-outline" />
						</a>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<Comments
		item={org}
		type="organization"
		user={data.user}
		commentForm={data.commentForm}
		comments={org?.Comments}
	/>
</Page>
