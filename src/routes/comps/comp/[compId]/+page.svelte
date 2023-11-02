<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import Page from '$lib/components/layout/Page.svelte'
	import { addOrdinalsuffix } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'

	export let data: PageData
	export let form
	// $: console.log('form: ', form)
	$: ({ comp } = data)

	let my_modal_2
	let showRaces: boolean = false

	const getHref = (uri: string) => {
		if (!uri) return null
		if (uri.startsWith('http://') || uri.startsWith('https://')) {
			return uri
		}
		return `http://${uri}`
	}
</script>

{#if comp}
	<Page title={comp?.boat}>
		<div class="max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
			<div class="md:flex">
				<div class="md:shrink-0 relative">
					<img
						class="h-48 w-full object-cover md:h-full md:w-48 rounded-br-full"
						src={comp?.image ? comp?.image : 'https://picsum.photos/id/384/400/300/'}
						alt="Title for {comp?.boat}"
					/>
					<div class="flex items-center absolute right-2 bottom-2">
						<button class="btn btn-secondary btn-sm absolute right-10 bottom-0 rounded-full">
							Claim
						</button>

						<button
							on:click={my_modal_2.showModal()}
							class="btn btn-xs btn-ghost absolute right-3 bottom-4 rounded-full"
						>
							<Icon icon="material-symbols:info-outline" width="20" />
						</button>
					</div>
				</div>
				<dialog class="modal" bind:this={my_modal_2}>
					<div class="modal-box">
						<h3 class="font-bold text-lg">Claim your vessel</h3>
						<p class="py-4">
							If this is your boat/vessel this button will send a request to the publisher of the
							event and they can connect this boat to your profile
						</p>
						<div class="modal-action m-0">
							<form method="dialog">
								<button class="btn">close</button>
							</form>
						</div>
					</div>
					<form method="dialog" class="modal-backdrop">
						<button>close</button>
					</form>
				</dialog>
				<div class="pt-8 pb-4 px-8">
					<div class="uppercase tracking-wide text-2xl text-accent font-semibold">
						{@html comp?.boat ?? comp.sailno}
					</div>
					{#if comp.skipper}
						<div class="flex gap-4 justify-between items-center">
							<a href="/" class="text-secondary block">{comp?.skipper} </a>
							<div class="font-semibold text-lg">{comp.club ?? ''}</div>
						</div>
					{/if}
					<div class="grid grid-cols-2">
						{#if comp.club}
							<div>
								<span class="text-xs text-primary">Club: </span>
								<span>
									{comp?.club}
								</span>
							</div>
						{/if}
						{#if comp.sailno}
							<div>
								<span class="text-xs text-primary">Sail No: </span>
								<span>
									{comp?.sailno}
								</span>
							</div>
						{/if}
						{#if comp.rest?.class}
							<div class="">
								<span class="text-xs text-primary">Class: </span>
								<a href="https://sailboatdata.com/?keyword={comp?.rest.class}" target="_blank">
									{comp?.rest.class}
								</a>
							</div>
						{/if}
						{#if comp.fleet ?? comp.division}
							<div class="">
								<span class="text-xs text-primary">Fleet: </span>
								<span>
									{comp?.fleet}
								</span>
								{#if comp.division}
									- <span>{comp.division}</span>
								{/if}
							</div>
						{/if}
						{#if comp.rating}
							<div class="">
								<span class="text-xs text-primary">Rating: </span>
								<span>{comp.rating}</span>
							</div>
						{/if}
					</div>

					<p class="py-6 px-2 text-lg shadow-lg border-r-4 border-accent rounded-lg">
						{comp.description ?? 'No description provided'}
					</p>
					<div class="py-2 text-xs text-secondary flex justify-end">
						{comp.createdAt?.toLocaleDateString()}
					</div>
				</div>
			</div>

			<div class="pl-2">
				<form method="post" action="?/getEvents" use:enhance>
					<button
						class="btn btn-ghost btn-xs"
						on:click={() => {
							showRaces = !showRaces
						}}
					>
						{showRaces ? '^ Hide Races' : '⌄ Show Races'}
					</button>
				</form>
			</div>

			<!-- ////////////////////////////////////////// -->
			{#if showRaces}
				<div>
					{#await form?.compEvents}
						<div class="mt-8 loading loading-spinner loading-md" />
					{:then}
						{#if form?.compEvents}
							{#each form.compEvents.Events as event}
								{#if event}
									<h1
										class="mx-3 mt-4 p-4 border-r-4 border-r-secondary bg-gradient-to-r from-base-100 to-base-200 rounded-lg shadow-xl"
									>
										<div class="flex justify-between items-center">
											<div class="text-xl font-semibold">{event.name}</div>
											{#if event.eventwebsite}
												<a
													href={getHref(event?.eventwebsite)}
													target="_blank"
													class="text-xs text-accent flex gap-1 items-center"
												>
													<Icon icon="mdi:open-in-new" />{event.eventwebsite}
												</a>
											{/if}
										</div>
									</h1>
									<!-- <hr class="" /> -->
									<div class="p-4">
										{#each event.Races as race}
											<div class=" mx-4 mb-4 border-l-4 border-accent shadow-xl rounded-lg">
												<div
													class="px-4 py-2 bg-accent-focus text-lg font-semibold w-full rounded-t-lg"
												>
													<h2 class="opacity-100">
														{race.name}
													</h2>
												</div>
												<div class="my-4 p-4 shadow-xl rounded-lg">
													{#if race.Results[0].points || race.Results[0].code}
														<div class="">
															{#if race.Results[0].points}
																<div class="text-xl">
																	{addOrdinalsuffix(
																		Number(race.Results[0].points) < 1
																			? 1
																			: Number(race.Results[0].points)
																	)}
																	<span class=" text-xs"> place</span>
																</div>
																<div>
																	{race.Results[0].points}
																	<span class="text-xs">points</span>
																</div>
															{:else if race.Results[0].code}
																<span>{race.Results[0].code} </span>
															{/if}
														</div>
													{:else}
														<span>Did not Compete</span>
														<span class="text-xs">(DNC)</span>
													{/if}
													{#if race.Results[0].corrected}
														<div>
															<span> {race.Results[0].corrected} </span>
															<span class="text-xs"> corrected time</span>
														</div>
													{/if}
													{#if race.Results[0].elasped}
														<div>
															<span> {race.Results[0].elasped} </span>
															<span class="text-xs"> elaped time</span>
														</div>
													{/if}
													{#if race.Results[0].elapsedWin}
														<div>
															<span> {race.Results[0].elapsedWin} </span>
															<span class="text-xs"> behind first place</span>
														</div>
													{/if}
													{#if race.Results[0].ratingWin}
														<div>
															<span class="text-xs">Rating needed to win</span>
															<span> {race.Results[0].ratingWin} </span>
															<span class="text-xs">
																(+{Math.round(
																	Number(race.Results[0].ratingWin) - Number(comp.rating)
																)})
															</span>
														</div>
													{/if}
													<div class="text-xs text-secondary flex justify-end">
														<div>{race.date ?? ''}</div>
													</div>
												</div>
											</div>
										{/each}
									</div>
								{/if}
							{/each}
						{/if}
					{/await}
				</div>
			{/if}

			<!-- Tools -->
			<div class="px-4 pb-4 flex justify-end">
				<!-- need to make a  -->
				<div class="tooltip tooltip-top" data-tip="View Races">
					<a
						href="/races?whereType=compId&whereId={comp.id}&title={comp.boat ??
							comp.skipper ??
							comp.sailno} Races"
						class="btn btn-ghost p-1"
					>
						<Icon class="text-3xl text-primary" icon="material-symbols:preview" />
					</a>
				</div>
				<div class="tooltip tooltip-top" data-tip="Edit Event">
					<a href="/comps/comp/{comp?.id}/edit?from={$page.url.pathname}" class="btn btn-ghost p-1">
						<Icon class="text-3xl  text-primary" icon="mdi:pencil-outline" />
					</a>
				</div>
			</div>
		</div>
	</Page>
{:else}
	<div>Loading...</div>
{/if}
