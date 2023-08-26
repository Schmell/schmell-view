<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';

	export let data;

	function checkForUserLike(comment) {
		if (comment.likes.some((like) => like.userId === data.user?.userId)) {
			return true;
		}
		return false;
	}
</script>

<div>
	<form action="?/like" method="post" use:enhance>
		<input type="hidden" name="eventId" value={event?.id} />

		<input type="hidden" name="commentId" value={comment.id} />

		<input type="hidden" name="likeId" value={form?.id} />

		<div
			class="flex items-center gap-2 px-2 rounded-full"
			class:bg-accent={checkForUserLike(comment)}
			class:bg-base-100={!checkForUserLike(comment)}
		>
			{#if checkForUserLike(comment)}
				<button formaction="?/unlike">
					<Icon class="text-base-100" icon="mdi:thumb-up" />
				</button>
			{:else}
				<!-- can't like your own comment -->
				<button disabled={data.user?.userId === comment.userId}>
					<Icon icon="mdi:thumb-up-outline" />
				</button>
			{/if}

			<div class=" border-l-2 border-base-200 pl-2" class:text-base-100={checkForUserLike(comment)}>
				{comment._count.likes}
			</div>
		</div>
	</form>
</div>
