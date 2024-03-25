<script lang="ts">
	import { enhance } from '$app/forms'
	import { Page } from '$components/layout'
	import { PUBLIC_GOOGLE_MAPSAPI_KEY } from '$env/static/public'
	import Calendar from '@event-calendar/core'
	import TimeGrid from '@event-calendar/time-grid'

	export let data
	$: ({ files } = data)
	$: calendars = data.calendars.items
	let showPre = false
	let endpoint = ''
	let fileId = '1DJlHHZzjIqarEUFhK-DU39xzWrlQwKch'
	// $: if(fileId){
	// 	$doc.refetch()
	// }

	function getEndpoint() {
		return `https://www.googleapis.com/drive/v3/files?key=${PUBLIC_GOOGLE_MAPSAPI_KEY}`
	}
	function getParams() {
		return `fields=name,starred,shared,permissions(kind,type,role)`
	}

	// GET https://www.googleapis.com/drive/v3/files/FILE_ID?fields=name,starred,shared,permissions(kind,type,role)
	// const doc = createQuery({
	// 	queryKey: ['doc'],
	// 	queryFn: async () => {
	// 		return await fetch(getEndpoint(), {
	// 			mode: 'no-cors',
	// 			referrer: 'http://localhost:5173',
	// 			referrerPolicy: 'origin'
	// 		}).then((r) => r.json())
	// 	},
	// 	retry: false
	// })
	// $: console.log($doc.data)

	function onSignIn(googleUser) {
		var profile = googleUser.getBasicProfile()
		console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
		console.log('Name: ' + profile.getName())
		console.log('Image URL: ' + profile.getImageUrl())
		console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
	}

	let calMap = {}
	if (data.cal) {
		calMap = data.cal?.map((e) => {
			const start = new Date(e.start?.dateTime! ?? e.start?.date!)
			const end = new Date(e.end?.dateTime! ?? e.end?.date!)
			return {
				id: e.id,
				allDay: true,
				start,
				end,
				title: e.summary
			}
		})
		console.log(calMap)
	}

	let plugins = [TimeGrid]
	let options = {
		view: 'timeGridWeek',
		events: [calMap]
	}
</script>

<svelte:head>
	<!-- <script src="https://apis.google.com/js/platform.js" async defer></script>
	<meta
		name="google-signin-client_id"
		content="452734179712-81lqp4vvk2dro44m46l75m46getia1ur.apps.googleusercontent.com"
	/> -->
</svelte:head>

<Page title="Drive2">
	<Calendar {plugins} {options} />
	{#if data.cal && showPre}
		<div />
		<pre>{JSON.stringify(data.cal, null, 2)}</pre>
	{/if}
	<div>
		<div>
			{#each data.calendars.items as item}
				<a
					href="/google/drive2?id={item.id}"
					class="w-full block p-4 pl-8 px-4 rounded-full my-2"
					style="background-color: {item.backgroundColor}; color: {item.foregroundColor}"
				>
					<div class="text-xl">{item.summary}</div>
					<div class="text-xs">{item.description}</div>
				</a>
			{/each}
		</div>
	</div>
	<pre>{JSON.stringify(data.calendars.items, null, 2)}</pre>
	<!-- 
		{
      kind: 'calendar#calendarListEntry',
      etag: '"1427515203958000"',
      id: 'p#weather@group.v.calendar.google.com',
      summary: 'Weather',
      description: 
        'Daily weather forecast for your location',
      timeZone: 'America/Toronto',
      colorId: '15',
      backgroundColor: '#9fc6e7',
      foregroundColor: '#000000',
      selected: true,
      accessRole: 'reader',
      defaultReminders: [],
      conferenceProperties: {
        allowedConferenceSolutionTypes: [ 'hangoutsMeet' ]
      }
    },
	 -->
	<!-- <div class="g-signin2" style="" data-onsuccess="onSignIn" /> -->
	{#if files}
		{#each files as item}
			<!-- content here -->
			<div class="p-1 flex items-center gap-1">
				<img src={item.iconLink} alt={item.mimeType} />
				<a href={item.webContentLink}>{item.name}</a>
				<!-- <button
					on:click={() => {
						fileId = item.id
						$doc.refetch()
					}}>{item.name}</button
				> -->
			</div>
		{/each}
	{/if}
	<div class="my-4">
		<form action="?/upload" method="post" enctype="multipart/form-data" use:enhance>
			<input
				type="file"
				class="file-input file-input-bordered file-input-primary w-full max-w-xs"
				name="file"
			/>
			<button class="btn btn-primary mt-4 block w-full max-w-xs">Upload</button>
		</form>
	</div>

	<button class="btn btn-link" on:click={() => (showPre = !showPre)}>Show Json</button>
	{#if showPre}
		<!-- content here -->
		<pre class="text-xs">{JSON.stringify(files, null, 2)}</pre>
	{/if}
</Page>
