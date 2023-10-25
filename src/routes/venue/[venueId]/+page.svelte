<script lang="ts">
	import { page } from '$app/stores'
	import Page from '$lib/components/layout/Page.svelte'
	import Like from '$lib/like/like.svelte'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'
	import { Accordion, Collapsible } from 'bits-ui'
	import Comments from '$lib/comment/comments.svelte'
	import { superForm } from 'sveltekit-superforms/client'
	import LikeFollow from '$lib/like/like-follow.svelte'

	export let data: PageData
	$: ({ venue, user } = data)
	// $: console.log('venue: ', venue)

	let showRaces = false

	let showEvents = false

	function getHref(website: string | null) {
		if (!website) return null
		return website && website.startsWith('http://') ? website : `http://${website}`
	}

	function checkForImage(imageString: string | null) {
		if (!imageString) return null
		if (
			imageString.startsWith('http://') ||
			imageString.startsWith('https://') ||
			imageString.startsWith('data:image')
		)
			return imageString
		return ''
	}

	const commentFormObj = superForm(data.commentForm)

	$: console.log('$page.url.searchParams: ', $page.url.searchParams)
</script>

<Page title={venue.name}>
	<div class="relative w-full">
		{#if checkForImage(venue.burgee)}
			<img
				class="absolute z-10 -left-2 -top-2 rounded-full shadow-xl"
				width="60px"
				src={venue.burgee}
				alt={venue.name}
			/>
		{/if}
		<div class="w-full rounded-tr-xl rounded-tl-xl rounded-bl-xl rounded-br-full">
			<img
				class="pl-2 rounded-xl w-full"
				class:blur-sm={!venue.titleImage}
				src={venue.titleImage
					? venue.titleImage
					: 'https://cork.org/wp-content/uploads/2011/06/POHBirdsEyeView.jpg'}
				alt={venue.name}
			/>
		</div>

		<LikeFollow type="venue" item={venue} userId={user?.userId} />
	</div>

	{#if venue.description}
		<div
			class="mt-8 p-4 relative text-lg bg-base-300 border-base-300 border-b-2 border-l-2 rounded-xl shadow-lg"
		>
			<div
				class="absolute uppercase drop-shadow-md line-clamp-1 -top-4 -left-0 tracking-wide text-xl text-accent font-semibold"
			>
				{@html venue.name}
			</div>
			{@html venue.description}
		</div>
	{/if}

	<!-- Links -->
	<div class="py-2 flex justify-between items-center">
		<div class="flex gap-2 items-center pt-4 text-md font-bold uppercase">
			<Icon icon="gridicons:popout" />
			<a href={getHref(venue.website)}>{venue.website ? venue.website : 'no website provided'}</a>
		</div>

		<!-- Publisher -->
		<div class="flex gap-2 items-center">
			<div class="avatar">
				<div class="w-8 rounded-full bg-base-content shadow-lg">
					<img alt={venue.Publisher?.username} src={venue.Publisher?.avatar} />
				</div>
			</div>
			<!-- <div>{venue.Publisher?.name}</div> -->
		</div>
	</div>

	<div class="divider" />

	<div class="flex gap-2 w-full max-w-md justify-between relative">
		<div class="w-full">
			<div class="text-sm w-full flex gap-2 justify-between">
				<!--  -->
				<div>
					<Accordion.Root>
						{#each venue.Addresses as address}
							<Accordion.Item value={address.label}>
								<Accordion.Header>
									<Accordion.Trigger class="flex gap-2 w-full justify-between items-center">
										<div class="text-lg">
											{address.label}
										</div>
										<Icon icon="mdi:chevron-down" />
									</Accordion.Trigger>
								</Accordion.Header>
								<Accordion.Content class="pb-2 pt-1">
									<div class="text-xs">
										<p>{address.street ?? ''},</p>
										<span>{address.city}, </span>
										<span>{address.state}, </span>
										<p>{address.code}</p>
									</div>
								</Accordion.Content>
							</Accordion.Item>
						{/each}
					</Accordion.Root>
				</div>

				<div>
					<div class="text-lg">Contact:</div>
					{#if venue.email}
						<div class="flex gap-1 items-center">
							<Icon icon="material-symbols:content-copy" />
							<a href="mailto:{venue.email}">{venue.email}</a>
						</div>
					{/if}
					{#if venue.phone}
						<p>{venue.phone}</p>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Tools  -->
	<div class="flex justify-end">
		{#if data.user?.userId === venue?.publisherId}
			<div class="tooltip tooltip-top" data-tip="Edit Event">
				<a
					data-sveltekit-replacestate={true}
					href="/venue/{venue?.id}/edit?from={$page.url.pathname}&{$page.url.searchParams}"
					class="btn btn-ghost p-1"
				>
					<Icon class="text-3xl text-primary" icon="material-symbols:edit-outline" />
				</a>
			</div>
		{/if}
	</div>
	<Comments item={venue} type="venue" user={data.user} formObj={commentFormObj} />
</Page>
