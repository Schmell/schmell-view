<script lang="ts">
	import { page } from '$app/stores'
	import { clickOutside } from '$lib/utils'
	import toast, { Toaster } from 'svelte-french-toast'
	import Icon from '@iconify/svelte'
	import { slide } from 'svelte/transition'
	import '../app.css'
	import { getFlash } from 'sveltekit-flash-message/client'

	export let data
	$: ({ user } = data)

	let open = false

	function handleClickOutside() {
		open = false
	}

	const toggleOpen = () => (open = !open)

	const flash = getFlash(page)

	// 	import { getFlash } from 'sveltekit-flash-message';
	// import { page } from '$app/stores';

	// const flash = getFlash(page);

	flash.subscribe(($flash) => {
		if (!$flash) return

		if ($flash.type == 'success') {
			toast.success($flash.message, {
				icon: '✅',
				position: 'bottom-center',
				className: 'mb-96 z-10 absolute'
			})
		}

		if ($flash.type == 'error') {
			toast.error($flash.message, {
				icon: '❌'
			})
		}
	})
</script>

<!-- <div> -->
<div class="fixed top-0 z-20 w-full">
	<nav class="navbar border-base-300 text-secondary-content">
		<button
			on:click={() => {
				toggleOpen()
			}}
			class="btn-ghost btn hover:bg-transparent"
		>
			<label class="swap swap-rotate">
				<!-- this hidden checkbox controls the state -->
				<input type="checkbox" />
				<Icon class="swap-off text-4xl text-primary-content opacity-90" icon="mdi:menu" />
				<Icon class="swap-on text-4xl text-primary-content opacity-90" icon="mdi:close" />
			</label>
		</button>

		<div class="user-nav">
			<!--  -->
			{#if data.user}
				<div
					class="dropdown-end dropdown avatar rounded-full border-2 border-neutral-content bg-black bg-opacity-20 drop-shadow-lg focus:bg-base-100"
				>
					<div tabindex="-1" class="w-10 rounded-full select-none">
						<img src={user?.avatar} alt={user?.name} />
					</div>
					<ul
						tabindex="-1"
						class=" dropdown-content menu rounded-box w-52 bg-base-100 p-2 text-base-content drop-shadow-lg"
					>
						<li><a href="/auth/profile?from={$page.url.pathname}">Profile</a></li>
						<li><a href="/auth/settings?from={$page.url.pathname}">Settings</a></li>
						<!-- <li><a href="/auth/account">Account</a></li> -->
						<li><div class="divider m-0 p-0" /></li>
						<li>
							<form method="POST">
								<button formaction="/?/logout" type="submit">Logout</button>
							</form>
						</li>
					</ul>
				</div>
			{:else}
				<a href="/auth/login" class="btn btn-primary btn-xs rounded-full shadow-lg">Login</a>
			{/if}
		</div>
	</nav>

	{#if open}
		<!--  -->
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
<main>
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
		<a href="/">
			<Icon icon="mdi:home-import-outline" width="24" />
		</a>

		<a href="/">
			<Icon icon="material-symbols:circle-outline" width="34" />
		</a>

		<button>
			<Icon icon="mdi:menu" width="24" />
		</button>
	</div>
</footer>

<!-- </div> -->

<style>
	main {
		@apply bg-base-200;
		width: 100%;
		height: 100vh;
		position: absolute;
	}

	.shadow {
		box-shadow: inset 2px 0 10px hsla(0, 0%, 8%, 0.575);
	}

	footer {
		@apply bg-primary-focus text-base-200;
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
		@apply bg-primary-focus shadow-md;
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
