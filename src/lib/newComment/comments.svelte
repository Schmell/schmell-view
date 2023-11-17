<script lang="ts">
	import Comment from './comment.svelte'
	import CommentForm from './commentForm.svelte'

	export let comments
	export let item
	export let user
	export let commentForm
	export let type: string

	// $: console.log('item: ', item._count.Comments)

	function uniqueAvatars(): Set<string> {
		const array = comments?.map((comment) => {
			return comment.User?.avatar
		})
		return new Set(array)
	}

	let nextCommentsLoading = false
	let newBatch = []
	$: pageComments = [...comments, ...newBatch]

	async function getNextComments() {
		nextCommentsLoading = true
		const cursor = pageComments.at(-1)?.id
		const response = await fetch(
			`/api/newComment?take=4&cursor=${cursor}&whereType=eventId&whereId=${item.id}`
		)
		newBatch = await response.json()
		nextCommentsLoading = false
	}
	//
</script>

<div class="mt-4">
	<div class="flex gap-2 justify-between items-end">
		<div class="font-semibold">Comments:</div>

		<div class="avatar-group -space-x-4">
			{#if comments}
				{#each uniqueAvatars() as avatar}
					<div class="avatar">
						<div class="w-6 bg-base-300">
							<img alt="" src={avatar} />
						</div>
					</div>
				{/each}
			{/if}

			<div class="avatar placeholder">
				<div class="w-6 bg-neutral-focus text-neutral-content">
					<span class:text-xs={item._count.Comments >= 10}>
						+{item._count.Comments}
					</span>
				</div>
			</div>
		</div>
	</div>

	<hr />

	<CommentForm action="/api/comment/?/comment" {commentForm} {type} {user} itemId={item.id ?? ''} />
	<div>
		{#each pageComments as i}
			<Comment {user} item={i} />
		{/each}
		<!-- I don't know why this doesnt work -->
		<!-- <InfiniteScroll
			hasMore={true}
			threshold={100}
			on:loadMore={async () => {
				console.log('loadMore')
				await getNextComments()
			}}
		/> -->
	</div>

	<!--  -->
	{#if item._count.Comments > 4}
		<div class="py-4">
			<button
				on:click={() => {
					getNextComments()
				}}
				class="btn btn-outline btn-sm w-full"
				disabled={nextCommentsLoading}
			>
				{#if nextCommentsLoading}
					<span class="loading loading-dots loading-md" />
				{:else}
					See more
				{/if}
			</button>
		</div>
	{/if}
	<!-- item._count.Comments > pageComments.length -->
</div>
