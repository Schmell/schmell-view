<script>
	import Comment from './comment.svelte'
	import CommentForm from './commentForm.svelte'

	export let item
	export let user
	export let formObj
	export let type

	function uniqueAvatars() {
		const array = item.Comments.map((comment) => {
			return comment.User.avatar
		})
		return new Set(array)
	}
</script>

<div class="mt-4">
	<div class="flex gap-2 justify-between items-end">
		<div class="font-semibold">Comments:</div>

		<div class="avatar-group -space-x-4">
			{#if item?.Comments}
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
					<span class:text-xs={item?._count.Comments >= 10}>
						+{item?._count.Comments}
					</span>
				</div>
			</div>
		</div>
	</div>

	<hr />
	<CommentForm action="/api/comment/?/comment" {formObj} {type} {user} itemId={item.id ?? ''} />
	{#each item.Comments as i}
		<Comment {formObj} {user} item={i} />
	{/each}
</div>
