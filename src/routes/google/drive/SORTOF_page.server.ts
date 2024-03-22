// import type { PageServerLoad } from './$types'
import { google } from 'googleapis'
import path from 'path'
import fs from 'fs'
import readline from 'readline'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private'
import type { OAuth2Client } from 'google-auth-library'

export async function load() {
	const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']

	// 	// The file token.json stores the user's access and refresh tokens, and is
	// 	// created automatically when the authorization flow completes for the first
	// 	// time.
	const TOKEN_PATH = path.join(process.cwd(), 'src/lib/service/token.json')
	const CREDENTIALS_PATH = path.join(process.cwd(), 'src/lib/service/credentials.json')

	fs.readFile(CREDENTIALS_PATH, (err, content) => {
		if (err) return console.log('Error loading client secret file:', err)
		authorize(JSON.parse(content.toString()), list)
	})

	async function list(authClient) {
		const drive = google.drive({ version: 'v3', auth: authClient })
		const res = await drive.files.list({ pageSize: 10 })

		const files = res.data.files
		if (files?.length === 0) {
			console.log('No files found.')
			return
		}
		// console.log('Files:')
		files?.map((file) => {
			console.log(`${file.name} (${file.id})`)
		})
		return files
	}

	function authorize(credentials, callback) {
		const { client_secret, client_id, redirect_uris } = credentials
		const oAuth2Client = new google.auth.OAuth2(
			client_id,
			client_secret,
			'https://developers.google.com/oauthplayground'
		)

		// Check if we have previously stored a token.
		fs.readFile(TOKEN_PATH, (err, token) => {
			// @ts-ignore
			if (err) return getNewToken(oAuth2Client, callback)

			oAuth2Client.setCredentials(JSON.parse(token.toString()))
			callback(oAuth2Client)
		})
	}

	function getNewToken(oAuth2Client: OAuth2Client, callback) {
		console.log('get new token ')
		const authUrl = oAuth2Client.generateAuthUrl({
			// redirect_uri: 'http://localhost:5173/google/drive',
			client_id: GOOGLE_CLIENT_ID,
			access_type: 'online',
			scope: SCOPES
		})

		console.log('Authorize this app by visiting this url:', authUrl)

		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		})
		rl.question('Enter the code from that page here: ', (code) => {
			rl.close()
			oAuth2Client.getToken(code, (err, token) => {
				if (err) return console.error('Error retrieving access token', err)
				if (token) oAuth2Client.setCredentials(token)

				// Store the token to disk for later program executions
				fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
					if (err) return console.error(err)
					console.log('Token stored to', TOKEN_PATH)
				})
				callback(oAuth2Client)
			})
		})
	}

	return {}
}
