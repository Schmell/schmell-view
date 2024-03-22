<script lang="ts">
	import { page } from '$app/stores'
	import Page from '$lib/components/layout/Page.svelte'
	import LikeFollow from '$lib/like/like-follow.svelte'
	import Comments from '$lib/comments/comments.svelte'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'
	import type { Address } from '@prisma/client'
	import { PUBLIC_GOOGLE_MAPSAPI_KEY } from '$env/static/public'

	export let data: PageData
	$: ({ venue, user } = data)

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

	function getMapImage(address: Address) {
		const concatedAddress = [...Object.values(address)].join(' ')
		const encodedAddress = encodeURIComponent(concatedAddress)
		const apikey = PUBLIC_GOOGLE_MAPSAPI_KEY

		return `https://maps.googleapis.com/maps/api/staticmap?zoom=14&size=600x200&markers=color:blue%7C${encodedAddress}&key=${apikey}`
	}

	// const commentFormObj = superForm(data.commentForm)
</script>

<svelte:head>
	<title>{venue.name ? venue.name : 'Venue'} - Vite Sail</title>
	<script>
		window.initMap = function ready() {
			app.$set({ ready: true })
		}
	</script>
</svelte:head>

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
		<div class="relative pb-0">
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
			<div class="absolute -bottom-3 right-0">
				<LikeFollow type="venue" item={venue} />
			</div>
		</div>
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
		<div>
			<div class="flex gap-2 items-center pt-4 text-md font-bold uppercase">
				<Icon icon="gridicons:popout" />
				<a href={getHref(venue.website)}>{venue.website ? venue.website : 'no website provided'}</a>
			</div>
			<div class="flex gap-2 items-center pt-4 text-md font-bold uppercase">
				<Icon icon="mdi:eye-arrow-right-outline" />
				<a href="/events?whereType=venueId&whereId={venue.id}&title={venue.name} events">
					View events
				</a>
			</div>
		</div>

		<!-- Publisher -->
		<div class="flex gap-2 items-center">
			<div class="avatar">
				<div class="w-8 rounded-full shadow-lg">
					<a href="/user/{venue.Publisher?.id}">
						<img alt={venue.Publisher?.username} src={venue.Publisher?.avatar} />
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="flex gap-2 w-full mt-4 max-w-md justify-between relative">
		<div class="w-full">
			<!-- <div class="text-sm grid grid-cols-2 gap-2"> -->
			<div class="mb-4">
				<h3 class="m-0">Contacts:</h3>
				<div class="divider mt-0" />
				<!-- Need to link the email from sailwave -->
				{#each venue.Contacts as contact}
					<div class="text-lg font-semibold">{contact.label}</div>
					<ul class="pl-2">
						{#if contact.email}
							<li>
								<a href="mailto:{contact.email}" class="flex gap-2 items-center">
									<Icon icon="mdi:email" />
									{contact.email}
								</a>
							</li>
						{/if}
						{#if contact.phone}
							<li>
								<a href="tel:{contact.phone}" class="flex gap-2 items-center">
									<Icon icon="mdi:phone" />
									{contact.phone}
								</a>
							</li>
						{/if}
					</ul>
				{/each}
			</div>
			<div>
				{#each venue.Addresses as address}
					<div class="card card-compact w-full max-w-md bg-base-100 shadow-xl mb-8">
						<div class="card-body">
							<h2 class="card-title">{address.label}</h2>
							<div class="pl-2 pr-4 pb-4">
								{#if address.po}
									<div>PO Box: {address.po}</div>
								{/if}
								<div>{address.street},</div>
								<span>{address.city},</span>
								<span>{address.state},</span>
								<span>{address.country},</span>
								<span>{address.code}</span>
							</div>
						</div>
						<figure>
							<img alt={address.label} src={getMapImage(address)} />
						</figure>
					</div>
				{/each}
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
	<!-- <Comments item={venue} type="venue" user={data.user} formObj={commentFormObj} /> -->
	<Comments item={venue} type="venue" userId={data.user?.userId} />
</Page>
