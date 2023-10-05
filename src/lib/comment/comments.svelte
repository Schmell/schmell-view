<script>
	import Comment from './comment.svelte'
	import CommentForm from './commentForm.svelte'

	export let item
	export let user
	export let formObj
	export let type
</script>

<div class="mt-4">
	<div class="flex gap-2 justify-between items-end">
		<div class="font-semibold">Comments:</div>

		<div class="avatar-group -space-x-4">
			{#if item?.Comments}
				{#each item?.Comments as comment}
					<div class="avatar">
						<div class="w-6 bg-base-300">
							<img alt={`@${comment?.User.username}`} src={comment?.User.avatar} />
						</div>
					</div>
				{/each}
			{/if}

			<div class="avatar placeholder">
				<div class="w-6 bg-neutral-focus text-neutral-content">
					<span>+{item?._count.Comments}</span>
				</div>
			</div>
		</div>
	</div>

	<hr />
	<CommentForm action="/api/comment/?/comment" {formObj} {type} {user} itemId={item.id ?? ''} />
	{#each item.Comments as i}
		<!-- {@debug i} -->
		<Comment {formObj} {user} item={i} />
	{/each}
</div>
