import { createTransporter } from '$lib/emails/createTransporter'
import { CALLBACK_HOST } from '$env/static/private'
import { dev } from '$app/environment'

async function sendEmail(emailOptions) {
	let emailTransporter = await createTransporter()
	await emailTransporter.sendMail(emailOptions)
}

type sendMergeRequestProps = {
	publisherEmail: string
	requesterEmail: string
	venueId: string
	toMergeId: string
	events?: string
}

export async function sendMergeRequest({ publisherEmail, requesterEmail, venueId, toMergeId }) {
	// console.log(email, venueId)
	// this should be to a page
	// const allowUrl = `${CALLBACK_HOST}/api/mergeVenues?allow=true&venueId=${venueId}&toMergeId=${toMergeId} `
	const allowUrl = `${CALLBACK_HOST}/venue/${venueId}/merge?allow=true&venueId=${venueId}&toMergeId=${toMergeId} `

	const cancelUrl = `${CALLBACK_HOST}/api/mergeVenues?allow=false`

	const message = {
		from: 'sheldon.street@gmail.com',
		to: publisherEmail,
		subject: 'VITE SAIL: A request to merge venues',
		text: `A request to merge venues from ${requesterEmail}`,
		html: `A request to merge venues from ${requesterEmail}. <br>
		This will just connect Series, Events, Comments, Likes and or Follows to the current venue and will not change any of the details you have entered <br>
		You can contact the User in question at ${requesterEmail} to discuss what activitites they are citing at the venue in question. <br> <hr/>
		Use this link to Allow the merge to happen <br>
		<a href=${allowUrl}>ALLOW</a> <br>
		or <br>
		Use this link to Cancel the request. <br>
		<a href=${cancelUrl}>CANCEL</a> <br>`
	}
	try {
		sendEmail(message)
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

	try {
		sendEmail(message)
	} catch (error) {
		console.log('sendEmailVerificationLink error: ', error)
	}

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
