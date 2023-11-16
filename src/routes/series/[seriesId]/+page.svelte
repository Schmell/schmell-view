<script lang="ts">
	import type { PageData } from './$types'
	import { Page, ItemCard } from '$components/layout'
	import Comments from '$lib/comment/comments.svelte'
	import { page } from '$app/stores'
	import LikeFollow from '$lib/like/like-follow.svelte'
	import { getHref } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import { superForm } from 'sveltekit-superforms/client'

	export let data: PageData

	let showEvents = true

	// commentFormObj
	const commentFormObj = superForm(data.commentForm)
</script>

<Page title="Series">
	{#await data.series}
		<div>Loading...</div>
	{:then series}
		{#if series}
			<div
				class="mt-18 mb-8 max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl"
			>
				<div class="md:flex">
					<div class="md:shrink-0 flex relative">
						<img
							class="h-48 w-full object-cover md:h-full md:w-48 rounded-br-full"
							src={series?.titleImage
								? series?.titleImage
								: series?.Organization?.titleImage
								? series?.Organization.titleImage
								: 'https://picsum.photos/id/384/400/300/'}
							alt="Title for {series?.name}"
						/>
						<div class="absolute w-full flex justify-end bottom-0 right-4 p-2">
							<div>
								<LikeFollow item={series} userId={data.user?.userId} type="event" />
								<!-- Likes and follows -->
								<div class="flex justify-end text-sm">
									<span class="pr-1 flex items-center text-xs">
										{series?._count.Likes}
										<Icon class="px-1 text-lg" icon="mdi:thumbs-up" />
									</span>
									/
									<span class="pr-2 pl-2 flex items-center text-xs">
										{series?._count.Follows}
										<Icon class="px-1 text-lg" icon="mdi:bell-ring" />
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="pt-8 px-8 w-full">
						<div class="flex justify-between w-full">
							<div class="uppercase tracking-wide text-xl text-accent font-semibold line-clamp-1">
								{@html series?.name}
							</div>
						</div>

						<p class="py-2 opacity-70">
							{@html series?.description ? series?.description : 'No description provided'}
						</p>

						<div class="">
							<a href="/organization/{series?.Organization?.id}" class="underline">
								{series?.Organization?.name}
							</a>
							{#if series?.website}
								<a
									href={getHref(series?.website)}
									target="_blank"
									class="flex items-center gap-1 text-secondary font-semibold uppercase"
								>
									<Icon icon="gridicons:popout" />
									<div class="inline line-clamp-1">
										{series?.website}
									</div>
								</a>
							{/if}
							<!-- Likes and follows -->
							<!-- <div class="flex justify-end text-sm">
							<span class="pr-1 flex items-center text-xs">
								{series?._count.Likes}
								<Icon class="px-1 text-lg" icon="mdi:thumbs-up" />
							</span>
							/
							<span class="pr-2 pl-2 flex items-center text-xs">
								{series?._count.Follows}
								<Icon class="px-1 text-lg" icon="mdi:bell-ring" />
							</span>
						</div> -->
						</div>
					</div>

					<!-- Tools  -->
					<div class="px-4 pb-4 flex justify-between items-center">
						<button
							class="btn btn-ghost btn-xs"
							on:click={() => {
								showEvents = !showEvents
							}}
						>
							{showEvents ? '^ Hide Events' : '⌄ Show Events'}
						</button>
						<div>
							<div class="tooltip tooltip-top" data-tip="Edit Races">
								<a href="/races/{series?.id}" class="btn btn-ghost p-1">
									<Icon class="text-3xl text-primary" icon="material-symbols:box-edit-outline" />
								</a>
							</div>

							{#if data.user?.userId === series?.publisherId}
								<div class="tooltip tooltip-top" data-tip="Edit Event">
									<a
										data-sveltekit-replacestate={true}
										href="/series/{series?.id}/edit?from={$page.url.pathname}"
										class="btn btn-ghost p-1"
									>
										<Icon class="text-3xl text-primary" icon="material-symbols:edit-outline" />
									</a>
								</div>
							{/if}
						</div>
					</div>
				</div>

				{#if showEvents}
					{#each series?.Events as event}
						<a href="/events/{event.id}">
							<div class=" p-0 m-2 mx-4 border-t text-base-content">
								<div class="w-full pt-1">
									<h1 class="text-xl font-semibold">{event.name}</h1>
								</div>
								<div class="flex justify-between">
									<div class="text-xs">
										{event.createdAt?.toLocaleDateString()}
									</div>

									<div
										class="badge badge-xs badge-success text-success-content shadow-md p-3"
										class:badge-warning={!event.complete}
									>
										{#if event.complete}
											<Icon icon="mdi:check" />
										{:else}
											<Icon icon="material-symbols:progress-activity-sharp" />
										{/if}
									</div>
								</div>
							</div>
						</a>
					{/each}
				{/if}
				<div class="p-2">
					<Comments item={series} type="series" user={data.user} formObj={commentFormObj} />
				</div>
			</div>
		{/if}
		<!-- {/if} -->
	{/await}
</Page>
