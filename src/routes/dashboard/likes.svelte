<script lang="ts">
	import { LikeButton } from '$lib/like'
	import Icon from '@iconify/svelte'
	import IntersectionObserver from '$components/IntersectionObserver.svelte'
	import { goto } from '$app/navigation'
	import type { Like, Event, Venue, Organization, Comment } from '@prisma/client'
	import { svelog } from '$lib/utils'

	interface ILikes extends Promise<Partial<Like[]>> {
		id: string
		type: string
		createdAt: Date
		Comment: any // could make special comment type but who really cares
		Event: Event
		Venue: Venue
		Organization: Organization
		[key: string]: any
	}
	export let likes: any
	export let count: number
	console.log(count)
</script>

{#await likes}
	<progress class="progress w-full" />
{:then likes}
	{#if !likes.length}
		<div class="text-sm">You have not liked anything yet</div>
	{:else}
		{#each likes as like}
			{#if like.type === 'event'}
				<div
					class="relative p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-accent w-full rounded-lg shadow-xl"
				>
					<a href="/events/{like.Event?.id}">
						<div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-info bg-opacity-10">
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
						<LikeButton class="text-base-content mr-3 " type="event" item={like.Event} />
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
							<LikeButton item={like.Comment} type="comment" class="text-base-content" />
						</div>
					</div>
				</div>
			{/if}

			{#if like.type === 'venue'}
				<div
					class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"
				>
					<a href="/venue/{like.Venue?.id}">
						<div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-secondary bg-opacity-10">
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
							<LikeButton item={like.Venue} type="venue" class="text-base-content" />
						</div>
					</div>
				</div>
			{/if}

			{#if like.type === 'organization'}
				<div
					class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-warning w-full rounded-lg shadow-xl"
				>
					<a href="/organization/{like.Organization?.id}">
						<div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-warning bg-opacity-10">
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
							<LikeButton type="organization" item={like.Organization} class="text-base-content" />
						</div>
					</div>
				</div>
			{/if}
		{/each}
		<!-- svelte-ignore missing-declaration -->
		{#if likes.length - 1 < count}
			{svelog('length: ', likes.length)}
			{svelog('Count: ', `${count}`)}

			<IntersectionObserver let:intersecting top={400}>
				{#if intersecting}
					<div class="opacity-0">
						{goto(`/dashboard?likes=1&likeCursor=${likes.at(-1)?.id}`)}
					</div>
				{/if}
			</IntersectionObserver>
		{/if}
	{/if}
{/await}
