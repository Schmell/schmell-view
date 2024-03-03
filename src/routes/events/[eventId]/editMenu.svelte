<script lang="ts">
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { flyAndScale } from '$lib/utils/transitions'
	import Icon from '@iconify/svelte'
	import type { Event } from '@prisma/client'
	import { DropdownMenu } from 'bits-ui'
	export let event: Partial<Event>
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="h-[2em] w-[2em] inline-flex items-center justify-center rounded-full text-sm font-medium text-base-content hover:bg-base-200"
	>
		<Icon class="text-xl" icon="mdi:dots-vertical" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content
		class="w-full max-w-[12em] rounded-xl border-2 border-base-300 bg-base-100 p-1 shadow-md"
		transition={flyAndScale}
		sideOffset={8}
	>
		<DropdownMenu.Item
			class="flex items-center gap-2 rounded-md p-2 hover:bg-base-200 focus:outline-none focus:ring ring:border-base-300  "
		>
			<a href="/comps/{event?.id}" class="flex gap-2 items-center">
				<Icon class="text-lg text-primary" icon="material-symbols:groups-outline-rounded" />
				<div class="flex justify-between">
					<span class="text-md text-base-content">Competitors</span>
					<kbd class="sr-only">c</kbd>
				</div>
			</a>
		</DropdownMenu.Item>

		<DropdownMenu.Item
			class="flex items-center gap-2 rounded-md p-2 hover:bg-base-200 focus:outline-none focus:ring ring:border-base-300  "
		>
			<a href="/races/{event?.id}" class="flex gap-2 items-center">
				<Icon class="text-lg text-primary" icon="material-symbols:box-outline" />
				<span class="text-md text-base-content">Races</span>
				<kbd class="sr-only">r</kbd>
			</a>
		</DropdownMenu.Item>

		{#if $page.data.user?.userId === event?.publisherId}
			<DropdownMenu.Item
				class="flex items-center gap-2 rounded-md p-2 hover:bg-base-200 focus:outline-none focus:ring ring:border-base-300  "
			>
				<button
					class="flex gap-2 items-center"
					on:click={() => goto(`/events/${event?.id}/edit?from=${$page.url.pathname}`)}
				>
					<Icon class="text-lg text-primary" icon="material-symbols:edit-outline" />
					Edit event
				</button>
				<kbd class="sr-only">e</kbd>
			</DropdownMenu.Item>

			<DropdownMenu.Item
				class="flex items-center gap-2 rounded-md p-2 hover:bg-base-200 focus:outline-none focus:ring ring:border-base-300  "
			>
				<!--  -->
				<form method="post" use:enhance>
					<button
						class="flex gap-2 items-center"
						formaction="?/deleteEvent&itemId={event.id}&from={$page.url
							.pathname}&{$page.url.searchParams.toString()}"
					>
						<Icon class="text-lg text-error" icon="mdi:trash-outline" />
						<span class="text-error">Delete event</span>
					</button>
				</form>
				<kbd class="sr-only">d</kbd>
			</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
