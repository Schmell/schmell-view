<script lang="ts">
	import { Page } from '$components/layout'
	import Icon from '@iconify/svelte'
	import type { Organization } from '@prisma/client'
	import type { PageData } from './$types'
	import Like from '$lib/like/like.svelte'
	import LikeFollow from '$lib/like/like-follow.svelte'

	export let data: PageData
	// console.log('data: ', data);
	$: ({ org, user } = data)

	const getHref = (org: Organization | undefined) => {
		if (!org) return null
		return org?.website && org.website.startsWith('http://')
			? org.website
			: `http://${org?.website}`
	}
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
					<LikeFollow item={org} userId={user?.userId} type="organization" />
				</div>
				<div class="pt-8 pb-4 px-8">
					<div class="uppercase tracking-wide text-sm text-accent font-semibold">
						{@html org.name}
					</div>
					<a
						href={getHref(org)}
						class="block mt-1 text-lg leading-tight font-medium text-base-content hover:underline"
					>
						{org?.email}
					</a>
					<p class="mt-2 text-base-content">
						{@html org.description ? org.description : 'No description provided'}
					</p>
					<a href={getHref(org)} class="text-secondary"> {org.website} </a>
				</div>
			</div>
			<!-- Tools -->
			<div class="px-4 pb-4 flex justify-end">
				<div class="tooltip tooltip-top" data-tip="View Events">
					<a href="/events?whereType=organizationId&whereId={org.id}" class="btn btn-ghost p-1">
						<Icon class="text-3xl text-primary" icon="material-symbols:preview" />
					</a>
				</div>

				{#if user?.userId === org.ownerId}
					<div class="tooltip tooltip-top" data-tip="Edit Organization">
						<a
							href="/organization/edit/{org.id}?from=/organization/view/{org.id}"
							class="btn btn-ghost p-1"
						>
							<Icon class="text-3xl  text-primary" icon="material-symbols:edit-outline" />
						</a>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</Page>
