<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import LikeCount from '$lib/like/like-count.svelte'
	import { formatDateTime } from '$lib/utils/formatters'
	import Icon from '@iconify/svelte'
	import type { User } from 'lucia'

	export let item
	export let user: User
</script>

<div class="flex items-start gap-2">
	<div class="avatar pt-1">
		<div class="w-8 h-8 rounded-full">
			<img alt={item.User.username} src={item.User.avatar} />
		</div>
	</div>

	<div class="flex gap-2 py-2 items-end w-full justify-between pr-4">
		<div class="w-full">
			<div class="font-bold pb-2">
				<a href="/user/{item.User.id}">{`@${item.User.username}`}</a>
			</div>
			<div>{@html item.comment}</div>
			<div class="text-xs text-accent">
				{formatDateTime(item?.createdAt ?? new Date())}
			</div>
		</div>
		{#if user.userId === item.User?.id || user?.userId === item.publisherId}
			<div class="dropdown dropdown-top dropdown-end pb-1">
				<!--svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="-1"> <Icon icon="mdi:dots-vertical" /> </label>

				<div tabindex="-1" class="dropdown-content menu shadow-lg bg-base-200 rounded-box w-24">
					<a href="{$page.url.pathname}?editComment={item.id}" class="btn btn-xs"> Edit </a>
					<!-- <button
						on:click={() => {
							goto(`${$page.url.pathname}?editComment=${item.id}`)
						}}
						class="btn btn-xs p-1 place-content-start"
					>
						Edit
					</button> -->

					<form method="post" action="/api/comment/?/delete" use:enhance>
						<input type="hidden" name="id" value={item.id} />
						<button class="btn btn-xs w-full text-error"> Delete </button>
					</form>
				</div>
			</div>
		{/if}

		<div class="flex flex-col gap-4 justify-between relative">
			<LikeCount userId={user?.userId} type="comment" {item} />
		</div>
	</div>
</div>
