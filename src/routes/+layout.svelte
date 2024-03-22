<script lang="ts">
	import { page } from '$app/stores'
	import { clickOutside } from '$lib/utils'
	import Icon from '@iconify/svelte'
	import { slide } from 'svelte/transition'
	import { getFlash } from 'sveltekit-flash-message/client'
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
	// import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'
	import '../app.css'
	import { browser } from '$app/environment'
	import { onNavigate } from '$app/navigation'
	import { DropdownMenu, Tooltip } from 'bits-ui'
	import { flyAndScale } from '$lib/utils/transitions'
	import Avatar from '$components/layout/avatar.svelte'
	import { Toaster, toast } from 'svelte-sonner'

	export let data

	let open = false

	function handleClickOutside() {
		open = false
	}

	const toggleOpen = () => (open = !open)

	const flash = getFlash(page) as any

	$: if ($flash) {
		toast[$flash.type]($flash.message, {
			description: $flash.description,
			action: $flash.action
		})
	}

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	})

	onNavigate((navigation) => {
		// @ts-ignore
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			// @ts-ignore
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<QueryClientProvider client={queryClient}>
	<Toaster
		theme="dark"
		closeButton
		toastOptions={{
			unstyled: true,
			classes: {
				actionButton: 'bg-base-100',
				cancelButton: 'bg-error',
				closeButton: 'text-error',
				toast: 'flex items-center gap-2 bg-base-300 p-4 rounded-lg xl:max-w-full',
				success: 'bg-success text-success-content',
				error: 'bg-error text-error-content',
				warning: 'bg-warning text-warning-content',
				info: 'bg-info text-info-content',
				description: 'text-base-content'
			}
		}}
	/>

	<div class="fixed top-0 z-20 w-full">
		<nav class="navbar border-base-300 text-secondary-content">
			<button
				aria-label="open dialog"
				on:click={() => {
					toggleOpen()
				}}
				class="btn-ghost btn hover:bg-transparent"
			>
				<label class="swap swap-rotate" for="menu">
					<!-- this hidden checkbox controls the state -->
					<input name="menu" id="menu" type="checkbox" />
					<Icon class="swap-off text-4xl text-primary-content opacity-90" icon="mdi:menu" />
					<Icon class="swap-on text-4xl text-primary-content opacity-90" icon="mdi:close" />
				</label>
			</button>

			<div class="user-nav">
				<!--  -->
				{#if data.user}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<!--  -->
							<Avatar user={data.user} />
							<!--  -->
						</DropdownMenu.Trigger>
						<DropdownMenu.Content
							class="w-full max-w-[8em] z-20 rounded-xl text-base-content border-base-300 bg-base-100 px-2 py-2.5 shadow-lg"
							transition={flyAndScale}
							sideOffset={4}
							alignOffset={-34}
						>
							<DropdownMenu.Item class="font-semibold hover:bg-base-200 p-2 rounded-lg">
								<a href="/auth/profile?from={$page.url.pathname}">Profile</a>
							</DropdownMenu.Item>
							<DropdownMenu.Item class="font-semibold hover:bg-base-200 p-2 rounded-lg">
								<a href="/auth/settings?from={$page.url.pathname}">Settings</a>
							</DropdownMenu.Item>
							<DropdownMenu.Separator class="divider m-0 p-0" />
							<DropdownMenu.Item class="font-semibold hover:bg-base-200 p-2 rounded-lg">
								<form method="POST">
									<button formaction="/?/logout" type="submit">Logout</button>
								</form>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<a href="/auth/login" class="btn btn-primary btn-xs uppercase rounded-full shadow-lg">
						Login
					</a>
				{/if}
			</div>
		</nav>

		{#if open}
			<section
				use:clickOutside
				on:click_outside={handleClickOutside}
				class="disclosure-panel absolute"
				transition:slide
			>
				<ul class="link-list">
					<a href="/series" on:click={toggleOpen}> <Icon icon="mdi:award" /> Series </a>
					<a href="/events" on:click={toggleOpen}>
						<Icon icon="material-symbols:calendar-month" /> Events
					</a>
					<a href="/organization" on:click={toggleOpen}>
						<Icon icon="ic:outline-people-alt" /> Organizations
					</a>
					<a href="/community" on:click={toggleOpen}>
						<Icon icon="fluent:people-community-28-filled" /> Community
					</a>
					<a href="/news" on:click={toggleOpen}>
						<Icon icon="material-symbols:breaking-news-alt-1-outline" /> News
					</a>
					<a href="/import" on:click={toggleOpen}>
						<Icon icon="material-symbols:upload-rounded" /> Import
					</a>
				</ul>
			</section>
		{/if}
	</div>
	<main class="relative">
		<slot />
	</main>

	<footer class="shadow relative">
		{#if $flash}
			<div
				class="w-full flex justify-between items-center absolute bottom-16"
				class:bg-success={$flash.type === 'success'}
				class:bg-error={$flash.type == 'error'}
			>
				<div
					id="flashMessage"
					class="p-2 text-lg font-semibold w-full z-10"
					class:text-error-content={$flash.type == 'error'}
					class:text-success-content={$flash.type === 'success'}
				>
					{$flash.message}
				</div>
				<button
					aria-label="close flash message"
					class="pr-4"
					class:text-error-content={$flash.type == 'error'}
					class:text-success-content={$flash.type === 'success'}
					on:click={() => {
						flash.set(undefined)
					}}
				>
					<Icon icon="mdi:close" width="24" />
				</button>
			</div>
		{/if}

		<div class="btm-nav text-base-content">
			<!-- Home -->
			<a href="/" aria-label="Home">
				<Icon icon="mdi:home-import-outline" width="24" />
			</a>

			<a href="/" aria-label="page action">
				<Icon icon="material-symbols:circle-outline" width="34" />
			</a>

			<button aria-label="footer menu">
				<Icon icon="mdi:menu" width="24" />
			</button>
		</div>
	</footer>
	<!-- <SvelteQueryDevtools /> -->
</QueryClientProvider>

<style>
	main {
		@apply bg-base-200;
		width: 100%;
		height: 100vh;
		position: absolute;
		overflow: scroll;
		scrollbar-width: none;
		scrollbar-color: rgb(56, 56, 56, 0.25) rgb(56, 56, 56, 0);
	}

	.shadow {
		box-shadow: inset 2px 0 10px hsla(0, 0%, 8%, 0.147);
	}

	footer {
		@apply bg-primary text-base-200;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 2em;
		position: fixed;
		bottom: 0;
		border-top-left-radius: 2em;
	}

	.navbar {
		@apply bg-primary shadow-md;
		display: flex;
		justify-content: space-between;
		padding-inline-start: 0em;
		padding-inline-end: 2em;
		border-bottom-right-radius: 3em;
		border-bottom-width: 0.25em;
	}

	.disclosure-panel {
		@apply bg-base-100 shadow-lg;
		@apply border-base-300;
		z-index: 10;
		padding-bottom: 3em;
		padding-top: 0.25em;
		padding-right: 0.5em;
		border-right-width: 0.25em;
		border-bottom-right-radius: 3em;
	}

	.link-list > a {
		@apply flex w-full gap-2 items-center px-4 py-2 text-left text-xl;
	}

	.link-list > a:hover {
		@apply bg-base-300;
	}

	.user-nav {
		display: flex;
		gap: 0.5em;
		align-items: center;
	}
</style>
