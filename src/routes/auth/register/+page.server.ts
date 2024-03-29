import { sendEmailVerificationLink } from '$lib/server/email'
import { auth } from '$lib/server/lucia'
import { prisma } from '$lib/server/prisma'
import { generateEmailVerificationToken } from '$lib/server/token'
import { capitalizeFirstLetter } from '$lib/utils'
import { Prisma } from '@prisma/client'
import { fail } from '@sveltejs/kit'
import { LuciaError } from 'lucia'
import { redirect } from 'sveltekit-flash-message/server'
import { message, setError, superValidate } from 'sveltekit-superforms/server'
import type { Actions, PageServerLoad } from './$types'
import { emailRegisterSchema } from './emailRegisterSchema'

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth.validate()
	if (session) {
		if (!session.user.emailVerified) throw redirect('/email-verification', {type:'error', message:'Verify your email'}, event)
		throw redirect(302, '/')
	}
	const form = await superValidate(emailRegisterSchema)

	return {
		session,
		form
	}
}

export const actions: Actions = {
	default: async (event) => {
		const { request, locals } = event

		const form = await superValidate(request, emailRegisterSchema)

		const exists = await prisma.user.findUnique({
			where: { email: form.data.email },
			select: { id: true }
		})
		// console.log('exists: ', exists);
		if (exists)
			throw redirect(
				'/auth/login',
				{ type: 'error', message: 'Email already exists - try to login' },
				event
			)

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email', // auth method
					providerUserId: form.data.email.toLowerCase(), // unique id when using "email" auth method
					password: form.data.password // hashed by Lucia
				},
				attributes: {
					email: form.data.email.toLowerCase(),
					username: form.data.username,
					name: `${form.data.firstname} ${form.data.lastname}`,
					firstname: form.data.firstname,
					lastname: form.data.lastname,
					avatar: form.data.avatar,
					// set verified to false on register
					email_verified: Number(false)
				}
			})

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			})

			// set session cookie
			locals.auth.setSession(session)

			const token = await generateEmailVerificationToken(user.userId)

			await sendEmailVerificationLink(form.data.email.toLowerCase(), token)
			//
		} catch (e: any) {
			//
			if (e instanceof LuciaError) {
				console.log('LuciaError: ', e)

				if (e.message === 'AUTH_INVALID_PASSWORD' || e.message === 'AUTH_INVALID_KEY_ID') {
					// this of course could be no user or bad password
					// reset both as to not give away to much to the client
					setError(form, 'email', '')
					setError(form, 'password', '')
					form.data.password = ''

					return message(form, 'Invalid Credentials', {
						status: 403
					})
				}

				form.valid = false

				return message(form, e.message, {
					status: 400
				})
			}

			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log('e.code: ', e.code)

				// Unique constraint violation
				if (e.code === 'P2002') {
					// @ts-ignore
					const propName = e.meta?.target[0]
					form.valid = false
					form.errors[propName] = `${capitalizeFirstLetter(propName)} is already registered`

					return fail(400, {
						form
					})
				}
				// Can't reach database server at
				if (e.code === 'P1001') {
					console.log(' Cant reach database server at: ', e.message)
					return fail(511, {
						message: e.message
					})
				}
			}

			if (e instanceof Prisma.PrismaClientValidationError) {
				console.log('PrismaClientValidationError: ', e)
				return fail(511, {
					message: e.message
				})
			}

			console.log('Unknown Error: ', e)
			return fail(500, {
				message: 'Unknown Error occured'
			})
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(
			301,
			'/auth/email-verification',
			{
				type: 'success',
				message: 'Check email for response'
			},
			event
		)
	}
}
