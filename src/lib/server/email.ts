import { createTransporter } from '$lib/emails/createTransporter'
import { CALLBACK_HOST } from '$env/static/private'
import { dev } from '$app/environment'
import { render } from 'svelte-email'
import RequestMerge from '$lib/emailTemplates/requestMerge.svelte'
import DenialEmail from '$lib/emailTemplates/denialEmail.svelte'
import ClaimCompEmail from '$lib/emailTemplates/claimCompEmail.svelte'
import { error } from '@sveltejs/kit'
import type Mail from 'nodemailer/lib/mailer'


async function sendEmail(emailOptions: Mail.Options) {
	const emailTransporter = await createTransporter()
	return await emailTransporter.sendMail(emailOptions)
}

function emailCallback(event){
console.log('email callback: ', event );
}

export async function sendClaimCompEmail({
	publisherEmail,
	requesterEmail,
	toMergeId,
	userId,
	compName
}) {
	const allowUrl = `${CALLBACK_HOST}/comps/${toMergeId}/merge?allow=true&userId=${userId} `
	const cancelUrl = `${CALLBACK_HOST}/comps/${toMergeId}/merge?allow=false&pe=${publisherEmail}&re=${requesterEmail}`

	const emailHtml = render({
		template: ClaimCompEmail,
		props: {
			requesterEmail,
			allowUrl,
			cancelUrl,
			compName
		}
	})

	const options = {
		from: 'do_not_reply@vitesail.com',
		to: publisherEmail,
		subject: `Vite Sail - A User wants to claim Competitor`,
		html: emailHtml
	}

		const sent = await sendEmail(options)
		// if(sent.rejected){
		// 	error(500, {message: 'sent email rejected'})
		// }
		if (sent.accepted){
			console.log( sent.response );
			return {
				status: 'ok',
				response: sent.response
			}
		}
		
	
}

export async function sendDenialEmail({ type, publisherEmail, requesterEmail }) {
	const emailHtml = render({
		template: DenialEmail,
		props: {
			type,
			publisherEmail
		}
	})

	const options = {
		from: 'do_not_reply@vitesail.com',
		to: requesterEmail,
		subject: `Vite Sail - Your request to merge ${type} was denied`,
		html: emailHtml
	}

	try {
		sendEmail(options)
		return { status: 'ok' }
	} catch (error) {
		console.log('send Merge request error: ', error)
		return { status: 'error' }
	}
}

export async function sendMergeRequest({
	publisherEmail,
	requesterEmail,
	venueId,
	toMergeId,
	type
}) {
	const allowUrl = `${CALLBACK_HOST}/venue/${toMergeId}/merge?allow=true&toMergeId=${venueId} `
	const cancelUrl = `${CALLBACK_HOST}/venue/${toMergeId}/merge?allow=false&pe=${publisherEmail}&re=${requesterEmail}`

	const emailHtml = render({
		template: RequestMerge,
		props: {
			type,
			allowUrl,
			cancelUrl,
			requesterEmail
		}
	})

	const options = {
		from: 'do_not_reply@vitesail.com',
		to: publisherEmail,
		subject: `Vite Sail - A request to merge with your ${type}`,
		html: emailHtml
	}

	try {
		sendEmail(options)
		return { status: 'ok' }
	} catch (error) {
		console.log('send Merge request error: ', error)
		return { status: 'error' }
	}
}

export async function sendEmailVerificationLink(email: string, token: string) {
	const url = `${CALLBACK_HOST}/auth/email-verification/${token} `

	const message = {
		from: 'sheldon.street@gmail.com',
		to: email,
		subject: 'Verify your password',
		text: 'Svelte-way would like you to verify the password you just used',
		html: `<p>Verify your account by clicking the link below</p> <a href=${url}>${url}</a>`
	}

		const sent  = await sendEmail(message)

		// if(sent.rejected){
		// 	// error(500, {message: 'sent email rejected'})
		// 	console.log('sent.rejected: ', sent.response );
		// }
		// if (sent.accepted){
		// 	console.log('sent.accepted: ',  sent.response );
		// 	return {
		// 		status: 'ok',
		// 		response: sent.response
		// 	}
		// }


	if (dev) console.log(`Your email verification link: ${url}`)
}

export async function sendPasswordResetLink(email: string, token: string) {
	const url = `${CALLBACK_HOST}/auth/password-reset/${token}`

	const message = {
		from: '',
		to: email,
		subject: 'Reset your password',
		text: 'You have requested to reset your password for the svelte-way app',
		html: `<p>Verify your account by clicking the link below</p> <a href=${url}>${url}</a>`
	}

	try {
		sendEmail(message)

		if (dev) console.log(`Your password reset link: ${url}`)

		return {
			success: true,
			message: ''
		}
	} catch (error: any) {
		console.log('error: ', error)

		return {
			success: false,
			message: error
		}
	}
}

export const isValidEmail = (maybeEmail: unknown): maybeEmail is string => {
	if (typeof maybeEmail !== 'string') return false
	if (maybeEmail.length > 255) return false
	const emailRegexp = /^.+@.+$/ // [one or more character]@[one or more character]
	return emailRegexp.test(maybeEmail)
}
