import { writable } from 'svelte/store'

export function columnVisibiltyStore(init) {
	const { subscribe, set, update } = writable({})

	if (init) {
		set(init)
	}

	function toggleVisibility(colName: string) {
		update((n) => {
			n[colName] = !n[colName]
			return n
		})
	}

	return {
		subscribe,
		update,
		toggleVisibility
	}
}
