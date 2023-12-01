import { superValidate } from 'sveltekit-superforms/client'
import type { PageServerLoad } from './$types'
import { schema } from './schema'
import { fail } from '@sveltejs/kit'

export const load = (async (event) => {
	const { locals, url, params } = event
	const form = superValidate(schema)

	return { form }
}) satisfies PageServerLoad

export const actions = {
	default: async ({ locals, request, params, url }) => {
		const form = await superValidate(request, schema)
		console.log('form: ', form)
		if (!form.valid) {
			return fail(400, { form })
		}

		return { form }
	}
}
