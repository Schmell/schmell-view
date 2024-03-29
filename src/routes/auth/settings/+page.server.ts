import { prisma } from '$lib/server/prisma'
import { error, fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
// import type { Lang } from '@prisma/client';

import { UserSettingsSchema } from '$lib/schemas/generated/zod'
import { superValidate } from 'sveltekit-superforms/server'
import { invalidateAll } from '$app/navigation'

export let ssr = false

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate()

	if (!session?.user) {
		throw redirect(300, '/auth/login')
	}

	// can be null
	const userSettings: any = await prisma.userSettings.findFirst({
		where: { userId: session.user.userId }
	})

	const form = await superValidate(userSettings, UserSettingsSchema)

	return { form }
}) satisfies PageServerLoad

export const actions: Actions = {
	default: async ({ locals, request, cookies, url }) => {
		const session = await locals.auth.validate()

		let newTheme = ''

		if (!(session?.user && session)) {
			throw redirect(302, '/')
		}

		const form = await superValidate(request, UserSettingsSchema)

		if (form.data.theme) {
			cookies.set('colorTheme', form.data.theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			})
			newTheme = form.data.theme
		}
		// transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)

		try {
			await prisma.userSettings.upsert({
				where: { userId: session.user.userId },
				update: {
					language: form.data.language,
					theme: form.data.theme
				},
				create: {
					language: form.data.language,
					theme: form.data.theme,
					user: {
						connect: { id: session.user.userId }
					}
				}
			})
		} catch (error) {
			console.log('error: ', error)

			return fail(400, { message: 'Fail on settings save' })
		}
		// return { newTheme };\
		// console.log('url.searchParams.get(from): ', url.searchParams.get('from'))
		throw redirect(301, `${url.searchParams.get('from')}?theme=${newTheme}`)
	}
}
