<script lang="ts">
	import { page } from '$app/stores'
	import { Form } from '$components/form'
	import Like from '$lib/like/like.svelte'
	import { formatDateTime } from '$lib/utils/formatters'
	import Icon from '@iconify/svelte'

	export let formObj
	export let item
	export let user
</script>

<div class="flex items-start gap-2">
	<div class="avatar">
		<div class="w-8 h-8 rounded-full">
			<img alt={item.User.username} src={item.User.avatar} />
		</div>
	</div>

	<div class="flex gap-2 py-2 items-end w-full justify-between pr-4">
		<div class="w-full">
			<div class="font-semibold">
				<a href="/user/{item.User.id}">{`@${item.User.username}`}</a>
			</div>
			<div>{@html item.comment}</div>
			<div class="text-xs text-accent">
				{formatDateTime(item?.createdAt ?? new Date())}
			</div>
		</div>
		{#if user.userId === item.User?.id || user?.userId === item.publisherId}
			<div class="dropdown dropdown-end pb-1">
				<!--svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="-1"> <Icon icon="mdi:dots-vertical" /> </label>

				<ul
					tabindex="-1"
					class="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<!-- <li><a href="/events/{item?.id}?editComment={item.id}"> Edit </a></li> -->
					<li><a href="{$page.url.pathname}?editComment={item.id}"> Edit </a></li>

					<Form action="/api/comment/?/delete" {formObj}>
						<li>
							<input type="hidden" name="id" value={item.id} />
							<button class="text-error"> Delete </button>
						</li>
					</Form>
				</ul>
			</div>
		{/if}

		<div class="flex flex-col gap-4 justify-between relative">
			<Like userId={user?.userId} type="comment" {item} />
		</div>
	</div>
</div>
