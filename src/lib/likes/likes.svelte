<script lang="ts">
	import Icon from '@iconify/svelte';

	import { error, fail } from '@sveltejs/kit';
	import { invalidate, invalidateAll } from '$app/navigation';
	// import { page } from '$app/stores';
	// console.log('page: ', $page);
	export let userId: string | undefined;
	if (!userId) {
		throw error(400, 'Invalid userId in like component');
	}

	export let item;

	// $: console.log('item: ', item);
	export let from: string | undefined = undefined;
	$: console.log('from: ', from);
	export let type: string;

	let likeAction: Response | undefined;
	$: if (likeAction?.ok) {
		// if (!from) {
		// 	// console.log('from: ', from);
		// 	invalidateAll();
		// }

		// console.log('from: ', from);
		// invalidate(from);
		invalidateAll();
	}

	function getUserLikedId(item) {
		const liked = item.likes.find((like) => {
			const liked = like.userId === userId;
			if (liked) return like;
		});

		return liked.id;
	}

	function checkForUserLike(item) {
		if (item.likes.some((like) => like.userId === userId)) {
			return true;
		}

		return false;
	}

	// console.log(' checkForUserLike(item): ', checkForUserLike(item));

	async function like(type: string, item, unlike = false) {
		try {
			likeAction = await fetch(
				`/api/like?likeType=${type}&itemId=${item.id}${
					unlike ? `&unlike=${getUserLikedId(item)}` : ''
				}`,

				{
					method: 'GET',
					headers: {
						'content-type': 'application/json'
					}
				}
			);
		} catch (error) {
			console.log('error: ', error);

			throw fail(400, { message: 'add like error' });
		}
	}
</script>

<div
	class="flex items-center gap-2 px-2 rounded-full"
	class:bg-accent={checkForUserLike(item)}
	class:bg-base-100={!checkForUserLike(item)}
>
	{#if checkForUserLike(item)}
		<button
			on:click={() => {
				// third prop is unlike
				like(type, item, getUserLikedId(item));
			}}
		>
			<Icon class="text-base-100" icon="mdi:thumb-up" />
		</button>
	{:else}
		<!-- can't like your own comment -->
		<button
			disabled={userId === item.userId}
			on:click={() => {
				like(type, item, false);
			}}
		>
			<Icon icon="mdi:thumb-up-outline" />
		</button>
	{/if}

	<div class="border-l-2 border-base-200 pl-2" class:text-base-100={checkForUserLike(item)}>
		{item._count.likes}
	</div>
</div>
