import type { PageServerLoad } from './$types'

// export const ssr = false

export const load = (async () => {
	return {
		title: 'test'
	}
}) satisfies PageServerLoad
