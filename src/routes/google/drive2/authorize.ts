import fs from 'fs/promises'
import path from 'path'
import process from 'process'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'
import type { OAuth2Client } from 'google-auth-library'

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), '/src/lib/service/token.json')
const CREDENTIALS_PATH = path.join(process.cwd(), '/src/lib/service/credentials.json')

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
	try {
		const content = await fs.readFile(TOKEN_PATH)
		const credentials = JSON.parse(content.toString())
		// @ts-ignore
		return google.auth.fromJSON(credentials) as OAuth2Client | null
	} catch (err) {
		return null
	}
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: OAuth2Client) {
	const content = await fs.readFile(CREDENTIALS_PATH)
	const keys = JSON.parse(content.toString())
	const key = keys.installed || keys.web
	const payload = JSON.stringify({
		type: 'authorized_user',
		client_id: key.client_id,
		client_secret: key.client_secret,
		refresh_token: client.credentials.refresh_token
	})
	await fs.writeFile(TOKEN_PATH, payload)
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize() {
	let client = (await loadSavedCredentialsIfExist()) as OAuth2Client | null
	if (client) {
		return client
	}
	// @ts-ignore
	client = await authenticate({
		scopes: SCOPES,
		keyfilePath: CREDENTIALS_PATH
	})

	if (client?.credentials) {
		await saveCredentials(client)
	}
	return client
}
