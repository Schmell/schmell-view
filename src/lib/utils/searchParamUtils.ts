import { page } from '$app/stores'
let p
page.subscribe((store) => {
	p = store
})

export function excludePaginationSearchParams() {
	// May have to provide a
	if (p.url.searchParams.get('skip')) {
		p.url.searchParams.delete('skip')
	}
	if (p.url.searchParams.get('take')) {
		p.url.searchParams.delete('take')
	}
	return p.url.searchParams.toString()
}

export function excludeSortSearchParams() {
	p.url.searchParams.delete('sortBy')
	p.url.searchParams.delete('sortOrder')
	return p.url.searchParams.toString()
}

export function excludeWhereSearchParams() {
	p.url.searchParams.delete('whereType')
	p.url.searchParams.delete('whereId')
	return p.url.searchParams.toString()
}
