<script lang="ts">
	import Icon from '@iconify/svelte'

	export let organizations
</script>

<div class="flex flex-col gap-2">
	{#await organizations}
		<progress class="progress w-full" />
	{:then organizations}
		{#if !organizations.length}
			<div class="text-sm">You have no Organizations yet</div>
			<a href="/organization/edit" class="btn btn-primary rounded-full"> Add organization </a>
		{:else}
			{#each organizations as org}
				<a
					href="/organization/{org.id}"
					class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-warning w-full rounded-lg shadow-xl"
				>
					<div class="capitalize w-full p-2 font-bold rounded-t-xl bg-warning bg-opacity-10">
						<div class="flex justify-between">
							<div>{org.name}</div>
							<div class="flex gap-1 items-center text-xs pr-2">
								<Icon icon="mdi:thumb-up" />
								{org._count.Likes} /
								<Icon icon="material-symbols:bookmark-add-outline-rounded" />
								{org._count.Follows}
							</div>
						</div>
					</div>

					<div class="flex justify-between items-end w-full px-4">
						<div>
							<div class="pb-4">
								{@html org.description}
							</div>
							<div class="text-sm">
								{org._count.Series} Series / {org._count.Events} Events
							</div>
							<div class="text-xs opacity-40">
								{org.createdAt?.toLocaleDateString()}
							</div>
						</div>
					</div>
				</a>
			{/each}
		{/if}
	{/await}
</div>
