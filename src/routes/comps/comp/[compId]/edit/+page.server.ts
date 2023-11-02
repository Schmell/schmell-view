import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad } from './$types'
import { compSchema } from './schema'

export const load = (async ({ locals, params, url }) => {
	const session = locals.auth.validate()
	if (!session) throw redirect(307, `/auth/login?from=${url.pathname}`)

	async function getComp() {
		try {
			return await prisma.comp.findUniqueOrThrow({
				where: { id: params.compId }
			})
		} catch (error: any) {
			console.log('error: ', error)
			throw error(500, { message: `edit event error: ${error}` })
		}
	}
	// console.log('getComp(): ', await getComp())
	return {
		form: await superValidate(await getComp(), compSchema)
	}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ locals, request, params, url }) => {
		const session = locals.auth.validate()
		if (!session) throw redirect(307, `/auth/login?from=${url.pathname}`)

		const form = await superValidate(request, compSchema)

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			await prisma.comp.update({
				where: { id: params.compId },
				data: { ...form.data }
			})
		} catch (error) {
			console.log('error: ', error)
			return fail(500, { form })
		}
		// console.log(url.searchParams.get('from'))
		throw redirect(307, `${url.searchParams.get('from')}`)
		// return { form }
	}
}
