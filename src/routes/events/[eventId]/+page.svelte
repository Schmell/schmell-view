<script script lang="ts">
	import Icon from '@iconify/svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	import { Page } from '$components/layout';
	import { Input, Button, Form, Hidden } from '$components/form';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { formatDateTime } from '$lib/utils/formatters';

	export let data: PageData;
	export let form;

	$: ({ event, comments } = data);

	// $: console.log('comments: ', comments)
	// $: console.log('event: ', event)
	//
	function getHref(website) {
		return website && website.startsWith('http://') ? website : `http://${website}`;
	}

	function checkForUserLike(comment) {
		if (comment.likes.some((like) => like.userId === data.user?.userId)) {
			return true;
		}
		return false;
	}

	// function makeExternalHref(url: string){
	// 	if(url.startsWith('http')) return url
	// 	url.

	// }

	const commentFormObj = superForm(data.commentForm);
	const { form: commentForm } = commentFormObj;

	//
</script>

{#if data}
	<Page title={event?.name}>
		<div
			class="mt-18 max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl"
		>
			<div class="md:flex">
				<div class="md:shrink-0">
					<img
						class="h-48 w-full object-cover md:h-full md:w-48 rounded-br-full"
						src={event?.titleImage ? event?.titleImage : 'https://picsum.photos/id/384/400/300/'}
						alt="Title for {event?.name}"
					/>
				</div>

				<div class="pt-8 pb-4 px-8">
					<div class="uppercase tracking-wide text-sm text-accent font-semibold">
						{@html event?.name}
					</div>
					{#if event?.Venue}
						<div class="flex items-center gap-4">
							<a
								href={`/venue/${event?.venueId}`}
								class="mt-1 text-lg leading-tight font-medium text-base-content hover:underline"
							>
								{event.Venue.name ? event.Venue.name : 'No venue provided'}
							</a>
							<div>-</div>
							<a
								href={getHref(event.Venue.website)}
								class="mt-1 text-xs leading-tight font-medium text-base-content hover:underline"
							>
								{event.Venue.website}
							</a>
						</div>
					{/if}

					<p class="mt-2 text-base-content">
						{event?.description ? event?.description : 'No description provided'}
					</p>

					<a href={getHref(event?.eventwebsite)} class="text-secondary">{event?.eventwebsite} </a>
				</div>
			</div>

			<div class="px-4 pb-4 flex justify-end">
				<div class="tooltip tooltip-top" data-tip="View Competitors">
					<a href="/comps/{event?.id}" class="btn btn-ghost p-1">
						<Icon class="text-3xl text-primary" icon="material-symbols:groups-outline-rounded" />
					</a>
				</div>

				<div class="tooltip tooltip-top" data-tip="View Races">
					<a href="/races/{event?.id}" class="btn btn-ghost p-1">
						<Icon class="text-3xl text-primary" icon="material-symbols:preview" />
					</a>
				</div>

				{#if data.user?.userId === event?.publisherId}
					<div class="tooltip tooltip-top" data-tip="Edit Event">
						<a href="/events/edit/{event?.id}?from={$page.url.pathname}" class="btn btn-ghost p-1">
							<Icon class="text-3xl text-primary" icon="material-symbols:edit-outline" />
						</a>
					</div>
				{/if}
			</div>
		</div>

		<div class="mt-4">
			<div class="flex gap-2 justify-between">
				<div class="font-semibold">Comments:</div>

				<div class="avatar-group -space-x-4">
					{#if event?.comments}
						{#each event?.comments as comment}
							<div class="avatar">
								<div class="w-6 bg-base-300">
									<img alt={`@${comment?.User.username}`} src={comment?.User.avatar} />
								</div>
							</div>
						{/each}
					{/if}

					<div class="avatar placeholder">
						<div class="w-6 bg-neutral-focus text-neutral-content">
							<span>+{event?._count.comments}</span>
						</div>
					</div>
				</div>
			</div>

			<div class="divider" />

			{#if comments}
				{#each comments as comment}
					<div class="flex items-start gap-2">
						<div class="avatar pt-4">
							<div class="w-8 h-8 rounded-full">
								<img alt={comment.User.username} src={comment.User.avatar} />
							</div>
						</div>

						<div class="flex gap-2 py-2 items-end w-full justify-between pr-4">
							<div class="w-full">
								<div class="font-semibold">
									<a href="/user/{comment.User.id}">{`@${comment.User.username}`}</a>
								</div>
								<div>{@html comment.comment}</div>
								<div class="text-xs text-accent">
									{formatDateTime(comment?.createdAt ?? new Date())}
								</div>
							</div>
							{#if data.user?.userId === comment.userId}
								<div class="dropdown dropdown-end pb-1">
									<!--svelte-ignore a11y-label-has-associated-control -->
									<label tabindex="-1"> <Icon icon="mdi:dots-vertical" /> </label>

									<ul
										tabindex="-1"
										class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
									>
										<li><a href="/events/{event?.id}?editComment={comment.id}"> Edit </a></li>
										<li>
											<button formaction="?/deleteComment" class="text-error"> Delete </button>
										</li>
									</ul>
								</div>
							{/if}
							<div class="flex flex-col gap-4 justify-between relative">
								<!-- like component -->
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

											<div
												class=" border-l-2 border-base-200 pl-2"
												class:text-base-100={checkForUserLike(comment)}
											>
												{comment._count.likes}
											</div>
										</div>
									</form>
								</div>
								<!-- like component -->
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Comment form -->
		<Form action="?/comment" formObj={commentFormObj}>
			<Input formObj={commentFormObj} name="comment" label="Add a comment" />
			<input type="hidden" name="id" value={$commentForm.id ? $commentForm.id : 'new'} />
			<Hidden name="type" formObj={commentFormObj} />
			<!-- <div>commentId: {$commentForm}</div> -->
			<Button type="submit">Submit</Button>
			<!-- <Picker /> -->
		</Form>
	</Page>
{/if}
