<script lang="ts">
	import { Page } from '$components/layout'
	import { page } from '$app/stores'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'

	export let data: PageData
	$: console.log(data.selectedUser)
</script>

<Page title={data.selectedUser?.username}>
	{#if data.selectedUser}
		{@const u = data.selectedUser}
		<div class="card w-full max-w-md bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="card-title">{u.username}</div>
				<div>
					<div>Name:</div>
					<div class="text-lg pl-2">{u.name}</div>
				</div>
				<div>
					<a
						href="/events?whereType=publisherId&whereId={u.id}&title={u.username} Events&from={$page
							.url.pathname}"
						class="flex gap-2 items-center"
					>
						<span>View Events</span>
						<Icon icon="mdi:link" />
					</a>
					<a href="/events?" class="flex gap-2 items-center">
						<span>View Organizations</span>
						<Icon icon="mdi:link" />
					</a>
					<a href="/events?" class="flex gap-2 items-center">
						<span>View Venues</span>
						<Icon icon="mdi:link" />
					</a>
				</div>
			</div>
			<figure class=" max-h-60">
				<img alt={u.username} src={u.avatar} class="avatar" />
			</figure>
		</div>
	{/if}
</Page>
