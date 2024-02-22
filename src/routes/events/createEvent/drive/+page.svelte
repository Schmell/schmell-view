<script lang="ts">
	import { goto } from '$app/navigation'
	import { Page } from '$components/layout'
	import { PUBLIC_CALLBACK_HOST } from '$env/static/public'

	// import type { PageData } from './$types'
	// export let data: PageData

	let authorize_button: HTMLButtonElement
	let signout_button: HTMLButtonElement
	let content: HTMLDivElement

	let authed: string = ''

	// is this better than writing a type
	let tokenClient: {
		callback: (response) => void
		requestAccessToken: ({ prompt }) => void
	} = {
		callback: () => {},
		requestAccessToken: () => {}
	}

	let accessToken: string | null = ''
	let pickerInited = false
	let gisInited = false
	let files: { id: string; name: string }[] = []

	// Authorization scopes required by the API; multiple scopes can be
	// included, separated by spaces.
	const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly'

	const CLIENT_ID = '452734179712-81lqp4vvk2dro44m46l75m46getia1ur.apps.googleusercontent.com'

	const API_KEY = 'AIzaSyDPg9g2OV2M9JKm9KqydqRvgWFFtb914J8'

	const APP_ID = 452734179712

	function handleAuthClick() {
		tokenClient.callback = (response) => {
			if (response.error !== undefined) {
				throw response
			}
			if (authed) {
				accessToken = authed
			} else {
				accessToken = response.access_token
				authed = response.access_token
			}
			signout_button.style.visibility = 'visible'
			authorize_button.innerText = 'Refresh'
			createPicker()
		}

		if (accessToken === null) {
			// Prompt the user to select a Google Account and ask for consent to share their data
			// when establishing a new session.
			// tokenClient.requestAccessToken({ prompt: 'consent' })
			tokenClient.requestAccessToken({ prompt: '' })
		} else {
			// Skip display of account chooser and consent dialog for an existing session.
			tokenClient.requestAccessToken({ prompt: '' })
		}
	}

	/**
	 * Callback after api.js is loaded.
	 */
	function gapiLoaded() {
		gapi.load('client:picker', initializePicker)
	}

	/**
	 * Callback after the API client is loaded. Loads the
	 * discovery doc to initialize the API.
	 */
	async function initializePicker() {
		await gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest')
		pickerInited = true
		maybeEnableButtons()
	}

	/**
	 * Callback after Google Identity Services are loaded.
	 */
	function gisLoaded() {
		// console.log(this)
		tokenClient = google.accounts.oauth2.initTokenClient({
			client_id: CLIENT_ID,
			scope: SCOPES,
			callback: '' // defined later
		})
		gisInited = true
		maybeEnableButtons()
	}

	/**
	 * Enables user interaction after all libraries are loaded.
	 */
	function maybeEnableButtons() {
		if (pickerInited && gisInited) {
			authorize_button.style.visibility = 'visible'
		}
	}

	/**
	 *  Create and render a Picker object for searching images.
	 */
	function createPicker() {
		const view = new google.picker.View(google.picker.ViewId.DOCS)

		view.setQuery('*.blw')

		const picker = new google.picker.PickerBuilder()
			.enableFeature(google.picker.Feature.NAV_HIDDEN)
			// .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
			.setDeveloperKey(API_KEY)
			.setAppId(APP_ID)
			.setOAuthToken(accessToken)
			.addView(view)
			.addView(new google.picker.DocsUploadView())
			.setCallback(pickerCallback)
			.build()

		picker.setVisible(true)
	}

	/**
	 * Displays the file details of the user's selection.
	 * @param {Object} data - Containers the user selection from the picker
	 * @param {*} data.action
	 */
	async function pickerCallback(data: any) {
		// console.log(data)
		if (data.action === google.picker.Action.PICKED) {
			const document = data[google.picker.Response.DOCUMENTS][0]
			const fileId = document[google.picker.Document.ID]
			const { result } = await gapi.client.drive.files.get({
				fileId: fileId,
				fields: 'webContentLink'
			})
			goto(result.webContentLink)
		}
	}

	/**
	 * Handle Auth action
	 */
	async function handleAuth() {
		const f = await fetch(`${PUBLIC_CALLBACK_HOST}/api/drive?list=1`)
		files = await f.json()
	}

	async function handleDownload(file: { id: any; name: any }) {
		const fetched = await fetch(`${PUBLIC_CALLBACK_HOST}/api/drive?fileId=${file.id}`)
		// const blob = await fetched.blob()
		// const f = await fetched.json()
		console.log(fetched)
		// goto(fetched.json())
		// downloadBlob(blob, file.name)
	}

	function downloadBlob(blob: Blob, name = 'file.blw') {
		// Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
		const blobUrl = URL.createObjectURL(blob)
		// Create a link element
		const link = document.createElement('a')
		// Set link's href to point to the Blob URL
		link.href = blobUrl
		link.download = name
		// Append link to the body
		document.body.appendChild(link)
		// Dispatch click event on the link
		// This is necessary as link.click() does not work on the latest firefox
		link.dispatchEvent(
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
				view: window
			})
		)
		// Remove link from body
		document.body.removeChild(link)
	}
</script>

<svelte:head>
	<script src="https://apis.google.com/js/api.js" on:load={gapiLoaded}></script>
	<script src="https://accounts.google.com/gsi/client" on:load={gisLoaded}></script>
</svelte:head>

<Page title="Google Drive">
	<button class="btn btn-outline" bind:this={authorize_button} on:click={handleAuthClick}>
		Authorize button
	</button>
	<button class="btn btn-outline" on:click={handleAuth}> Download </button>
	<button class="btn btn-outline" bind:this={signout_button} on:click={() => {}}> Sign out </button>
	<div>
		{#each files as file}
			<div class="p-2">
				<button on:click={() => handleDownload(file)} class="btn btn-secondary">
					{file.name}
				</button>
			</div>
		{/each}
	</div>
	<div bind:this={content} />
</Page>
