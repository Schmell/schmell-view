import type { PageServerLoad, Actions } from './$types'
import { auth } from '$lib/server/lucia'
import { fail } from '@sveltejs/kit'
import { redirect } from 'sveltekit-flash-message/server'
import { message, setError, superValidate } from 'sveltekit-superforms/server'
import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { capitalizeFirstLetter } from '$lib/utils'
import { LuciaError } from 'lucia'

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth.validate()
	if (session) {
		if (!session.user.emailVerified) {
			throw redirect(
				302,
				'/email-verification',
				{ type: 'error', message: 'Email is not verified' },
				event
			)
		}
		// need to change this to dashboard as home page cannot be a login page
		throw redirect(302, '/dashboard')
	}

	const form = await superValidate(emailLoginSchema)
	return { form }
}

const emailLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(12)
})

export const actions: Actions = {
	default: async (event) => {
		//
		const form = await superValidate(event.request, emailLoginSchema)

		if (!form.valid) fail(400, { form })

		try {
			// find user by key // and validate password
			const key = await auth.useKey('email', form.data.email.toLowerCase(), form.data.password)
			const user = await auth.getUser(key.userId)
			// console.log(user)

			// I think that having an unapproved model
			if (!user.emailVerified) {
				throw redirect(
					'/auth/emal-verification',
					{ type: 'error', message: 'Email verification has not been recieved' },
					event
				)
			}

			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			})

			event.locals.auth.setSession(session) // set session cookie
		} catch (e: any) {
			if (e instanceof LuciaError) {
				console.log('LuciaError: ', e)
				// Check email and password or throw
				if (e.message === 'AUTH_INVALID_PASSWORD' || e.message === 'AUTH_INVALID_KEY_ID') {
					setError(form, 'email', '')
					setError(form, 'password', '')
					form.data.password = ''

					return message(form, 'Invalid Credentials', {
						status: 403
					})
				}

				form.valid = false
				form.message = e.message

				return fail(500, {
					form
				})
			}

			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log('prisma known error: ', form)
				// Unique constraint violation
				if (e.code === 'P2002') {
					//@ts-ignore
					const propName = e.meta?.target[0]

					form.valid = false
					console.log('form.data[propName]: ', form.data[propName])

					form.errors[propName] = `${capitalizeFirstLetter(propName)} is already registered`

					return fail(400, {
						form
					})
				}

				// Can't reach database server
				if (e.code === 'P1001') {
					console.log(' Cant reach database server: ', e.message)
					return fail(503, {
						message: e.message
					})
				}
			}
		}
		// redirect to profile page
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, '/events')
	}
}
