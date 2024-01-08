import * as nodemailer from 'nodemailer'
import { google } from 'googleapis'
import {
	USER_EMAIL,
	REFRESH_TOKEN,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private'
import { error, fail } from '@sveltejs/kit'

const OAuth2 = google.auth.OAuth2

export const createTransporter = async () => {
	try {
		const oauth2Client = new OAuth2(
			GOOGLE_CLIENT_ID,
			GOOGLE_CLIENT_SECRET,
			'https://developers.google.com/oauthplayground'
		)

		oauth2Client.setCredentials({
			refresh_token: REFRESH_TOKEN
		})

		// console.log(oauth2Client)

		const accessToken = await new Promise((resolve, reject) => {
			oauth2Client.getAccessToken((err, token) => {
				if (err) {
					console.log('Get Access Token Error: ', err.response?.data)
					reject()
				}
				resolve(token)
			})
		})

		// console.log(accessToken)

		const transporter = nodemailer.createTransport({
			// not sure why im not getting proper types from nodemailer
			// @ts-ignore
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: USER_EMAIL,
				accessToken,
				clientId: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN
			}
		})

		// console.log(transporter)

		return transporter
	} catch (error: any) {
		console.log('createTransporter Error: ', error)
		return fail(500, { message: 'transporter error' })
	}
}
