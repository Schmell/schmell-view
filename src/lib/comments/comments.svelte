<script lang="ts">
	import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query'
	import Comment from './comment.svelte'
	import CommentForm from './commentForm.svelte'
	import IntersectionObserver from '$components/IntersectionObserver.svelte'

	export let item: any
	export let userId = ''
	export let type = ''

	let take = 4

	async function getUniqueAvatars() {
		const api = '/api/comments/get/uniqueAvatars'
		return await fetch(`${api}?&type=${type}&id=${item.id}`).then((r) => r.json())
	}
	const uniqueUsers = createQuery({
		queryKey: ['uniqueUsers'],
		queryFn: getUniqueAvatars
	})

	async function getCount() {
		const api = '/api/comments/count'
		return await fetch(`${api}?&type=${type}&id=${item.id}`).then((r) => r.json())
	}
	const count = createQuery({
		queryKey: ['count'],
		queryFn: getCount
	})

	async function getInfiniteComments({ pageParam }) {
		const api = '/api/comments/get/paginate'
		return await fetch(`${api}?take=${take}&cursor=${pageParam}&type=${type}&id=${item.id}`).then(
			(r) => r.json()
		)
	}
	const query = createInfiniteQuery({
		queryKey: ['comments'],
		queryFn: ({ pageParam }) => getInfiniteComments({ pageParam }),
		initialPageParam: '',
		getNextPageParam: (lastPage, allPages) => {
			let currentCommentsCount = 0
			allPages.forEach((page) => (currentCommentsCount += page.comments.length))
			if (currentCommentsCount >= lastPage.count) {
				return undefined
			}
			return lastPage.comments[lastPage.comments.length - 1].id
		}
	})
</script>

<div class="p-4 w-full">
	<div class="flex gap-2 justify-between items-end">
		<div class="font-semibold">Comments:</div>

		<div class="avatar-group -space-x-4">
			{#if $uniqueUsers.isSuccess}
				{#each $uniqueUsers.data as user}
					<div class="avatar">
						<div class="w-6 bg-base-300">
							<img alt={user.User.username} src={user.User.avatar} />
						</div>
					</div>
				{/each}
			{/if}

			<div class="avatar placeholder">
				<div class:text-xs={$count.data >= 10} class="w-6 bg-base-100 text-neutral-content">
					+{$count.data}
				</div>
			</div>
		</div>
	</div>

	<hr />

	<CommentForm {type} {userId} itemId={item.id ?? ''} />

	<div class="pt-4">
		{#if $query.isSuccess}
			{#each $query.data.pages as page}
				{#each page.comments as item}
					<Comment {userId} {item} />
				{/each}
			{/each}
		{/if}
		{#if $query.isLoading}
			<progress class="progress w-full" />
		{/if}
	</div>

	<!--  -->
	{#if $query.hasNextPage}
		<IntersectionObserver let:intersecting top={400}>
			{#if intersecting}
				<div class="opacity-0">
					{$query.fetchNextPage()}
				</div>
			{/if}
		</IntersectionObserver>
	{/if}
</div>
