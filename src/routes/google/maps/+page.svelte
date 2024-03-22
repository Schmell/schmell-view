<script lang="ts">
	import { onMount } from 'svelte'
	import { Loader } from '@googlemaps/js-api-loader'
	import { Page } from '$components/layout'
	import { PUBLIC_GOOGLE_MAPSAPI_KEY } from '$env/static/public'

	let autocomplete
	let address: google.maps.places.PlaceResult
	let autoAddress
	let photo
	$: console.log('photo: ', photo)
	let service
	let mapDiv: HTMLDivElement

	let searched
	$: console.log('searched: ', searched)
	const options = {
		// componentRestrictions: { country: 'ca' }
		// fields: ['formatted_address', 'address_components']
	}
	let map: google.maps.Map
	onMount(async () => {
		let output: google.maps.places.PlaceResult[]

		const loader = new Loader({
			apiKey: PUBLIC_GOOGLE_MAPSAPI_KEY,
			version: 'weekly'
		})

		const { Autocomplete, Photo, PlacesService, Place } = await loader.importLibrary('places')
		const auto = new Autocomplete(autocomplete, options)
		auto.addListener('place_changed', onPlaceChanged)

		const pl = new PlacesService(service)
		pl.textSearch({ query: 'Lake shore' }, getTextSearch)

		function getTextSearch(
			results: google.maps.places.PlaceResult[] | null,
			status: google.maps.places.PlacesServiceStatus,
			pages: google.maps.places.PlaceSearchPagination | null
		) {
			// console.log(result)
			if (status == 'OK' && results) {
				output = results.map((res) => {
					// F#@#% google utc_offset
					return {
						place_id: res.place_id,
						address_components: res.address_components,
						formatted_address: res.formatted_address,
						photos: res.photos,
						formatted_phone_number: res.formatted_phone_number,
						adr_address: res.adr_address,
						reviews: res.reviews
					}
				})
			}

			console.log('results: ', output.length, output)

			// photo = new Photo()
			// photo.getUri(output.photos[0].html_attributions)
			// searched = e
		}
		// console.log('autoAddress: ', autoAddress)
		async function onPlaceChanged() {
			address = auto.getPlace()

			// console.log('address: ', address.)
			if (address.address_components) {
				autoAddress = address.address_components.map((comp) => {
					return { [comp.types[0]]: comp.long_name }
				})
			}

			if (output[0] && output[0].place_id) {
				const placeOptions = { id: output[0].place_id }
				const place = new Place(placeOptions)

				console.log(place.toJSON())
				const loc = await place.fetchFields({ fields: ['location', 'displayName'] })
				const location = loc.place.toJSON() as {
					id: string
					location: google.maps.LatLng
					displayName: string
				}
				console.log(location)

				const { Map } = await loader.importLibrary('maps')
				map = new Map(mapDiv, {
					zoom: 10,
					center: location.location,
					mapId: 'DEMO_MAP_ID'
				})

				// there is a list of listeners
				map.addListener('click', toggleBounce)

				const { AdvancedMarkerElement, Marker, PinElement } = await loader.importLibrary('marker')
				// The marker, positioned at Uluru
				const marker = new Marker({
					map: map,
					animation: google.maps.Animation.DROP,
					position: location.location,
					title: location.displayName
				})

				function toggleBounce() {
					if (marker.getAnimation() !== null) {
						marker.setAnimation(null)
					} else {
						marker.setAnimation(google.maps.Animation.BOUNCE)
					}
				}
			}
		}
	})
</script>

<Page title="drive">
	<div class="flex border border-success h-96 w-96" bind:this={mapDiv} />
	<div class="flex border border-success mb-4" bind:this={service} />

	<input
		class="input w-full mb-4"
		name="autocomplete"
		autocomplete="off"
		bind:this={autocomplete}
	/>
	{#if address}
		<div>
			{@html address.adr_address}
		</div>
	{/if}
	{#if address}
		<a href={address.url} target="_blank" class="btn btn-primary">Google it</a>
	{/if}

	<!-- <pre>{JSON.stringify(address, null, 2)}</pre> -->
</Page>

<!-- <div class=" h-full w-full"> -->

<!-- </div> -->

<style>
</style>
