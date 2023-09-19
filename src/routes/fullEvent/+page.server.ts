import type { PageServerLoad } from './$types'
import { superValidate } from 'sveltekit-superforms/server'
import { fullEventSchema } from './fullEventSchema'

export const load = (async () => {
	return {
		form: superValidate(fullEventSchema)
	}
}) satisfies PageServerLoad
