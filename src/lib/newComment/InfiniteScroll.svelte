<script lang="ts">
	import { onDestroy, createEventDispatcher } from 'svelte'

	export let threshold = 0
	export let horizontal: boolean | undefined = false
	export let elementScroll: EventTarget | undefined = undefined
	export let hasMore = true

	const dispatch = createEventDispatcher()
	let isLoadMore = false
	let component

	$: {
		if (component || elementScroll) {
			const element = elementScroll ? elementScroll : component
			element.addEventListener('scroll', onScroll)
			element.addEventListener('resize', onScroll)
		}
	}

	const onScroll = ({ target }) => {
		console.log('target: ', target)
		//
		const offset = horizontal
			? target.scrollWidth - target.clientWidth - target.scrollLeft
			: target.scrollHeight - target.clientHeight - target.scrollTop

		console.log('offset: ', offset)

		if (offset <= threshold) {
			if (!isLoadMore && hasMore) {
				dispatch('loadMore')
			}
			isLoadMore = true
		} else {
			isLoadMore = false
		}
	}

	onDestroy(() => {
		if (component || elementScroll) {
			const element = elementScroll ? elementScroll : component.parentNode

			element.removeEventListener('scroll', null)
			element.removeEventListener('resize', null)
		}
	})
</script>

<div bind:this={component} class="p-2 bg-slate-200">hey</div>
