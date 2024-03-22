import { OAuth2Client } from 'google-auth-library'
import http from 'http'
import url from 'url'
import open from 'open'
import destroyer from 'server-destroy'
import { google } from 'googleapis'
import keys from '$lib/service/credentials.json'
import { goto } from '$app/navigation'
import { ACCESS_TOKEN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private'

export async function load({ params, url, cookies, fetch }) {
	// Download your OAuth2 configuration from the Google

	const queryString = Object.fromEntries(url.searchParams)
	// console.log(queryString)

	async function getAuth() {
		const oAuth2Client = new OAuth2Client(
			keys.web.client_id,
			keys.web.client_secret,
			'http://localhost:5173/google/drive'
		)

		if (cookies.get('drive_auth')) {
			const tokens = JSON.parse(cookies.get('drive_auth')!)
			oAuth2Client.setCredentials(tokens)
			return oAuth2Client
		}

		const authorizeUrl = oAuth2Client.generateAuthUrl({
			access_type: 'online',
			scope: 'https://www.googleapis.com/auth/drive'
		})

		console.log(authorizeUrl)

		// const authUrlReq = await fetch(authorizeUrl, { credentials: 'include' })

		if (queryString.code) {
			// Now that we have the code, use that to acquire tokens.
			const r = await oAuth2Client.getToken(queryString.code)
			// Make sure to set the credentials on the OAuth2 client.
			// console.log(r)
			oAuth2Client.setCredentials(r.tokens)
			cookies.set('drive_auth', JSON.stringify(r.tokens), {
				path: '/',
				secure: import.meta.env.PROD,
				httpOnly: true,
				maxAge: 60 * 10,
				sameSite: 'lax'
			})
			return oAuth2Client
		}
	}

	async function easyAuth() {
		const oAuth2Client = new OAuth2Client(
			GOOGLE_CLIENT_ID,
			GOOGLE_CLIENT_SECRET,
			'http://localhost:5173/google/drive'
		)
	}

	/**
	 * Start by acquiring a pre-authenticated oAuth2 client.
	 */
	async function main() {
		const oAuth2Client = (await getAuth()) as OAuth2Client
		if (oAuth2Client) {
			// @ts-ignore
			const drive = google.drive({ version: 'v3', auth: oAuth2Client })
			const files = await drive.files.list({ pageSize: 10 })
			return files.data.files
		}

		// After acquiring an access_token, you may want to check on the audience, expiration,
		// or original scopes requested.  You can do that with the `getTokenInfo` method.
		// const tokenInfo = await oAuth2Client.getTokenInfo(
		// 	oAuth2Client.credentials.access_token! // bang
		// )
		// console.log(tokenInfo)
	}

	/**
	 * Create a new OAuth2Client, and go through the OAuth2 content
	 * workflow.  Return the full client to the callback.
	 */
	function getAuthenticatedClient() {
		return new Promise((resolve, reject) => {
			// create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
			// which should be downloaded from the Google Developers Console.
			// console.log(keys)
			// const oAuth2Client = new OAuth2Client(
			// 	keys.web.client_id,
			// 	keys.web.client_secret,
			// 	'http://localhost:5173/google/drive'
			// )

			const oAuth2Client = new OAuth2Client(
				keys.web.client_id,
				keys.web.client_secret,
				'http://localhost:5173/google/drive'
			)

			// if (queryString.code) {
			// 	// Now that we have the code, use that to acquire tokens.
			// 	const r = oAuth2Client.getToken(queryString.code)
			// 	// Make sure to set the credentials on the OAuth2 client.
			// 	oAuth2Client.setCredentials(r.tokens)
			// 	// console.info('Tokens acquired.')
			// 	resolve(oAuth2Client)
			// }

			// Generate the url that will be used for the consent dialog.
			const authorizeUrl = oAuth2Client.generateAuthUrl({
				access_type: 'online',
				scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
			})
			goto(authorizeUrl)

			// Open an http server to accept the oauth callback. In this simple example, the
			// only request to our webserver is to /oauth2callback?code=<code>
			// const server = http
			// 	.createServer(async (req, res) => {
			// 		try {
			// 			if (req.url && req.url.indexOf('/oauth2callback') > -1) {
			// 				// acquire the code from the querystring, and close the web server.

			// 				const qs = new URL(req.url, 'http://localhost:4173').searchParams
			// 				const code = qs.get('code')
			// 				// console.log(`Code is ${code}`)
			// 				res.end('Authentication successful! Please return to the console.')
			// 				console.log(res)
			// 				// res
			// 				res.destroy()

			// 				// // Now that we have the code, use that to acquire tokens.
			// 				// const r = await oAuth2Client.getToken(code!) //bang
			// 				// // Make sure to set the credentials on the OAuth2 client.
			// 				// oAuth2Client.setCredentials(r.tokens)
			// 				// console.info('Tokens acquired.')
			// 				// resolve(oAuth2Client)
			// 			}
			// 		} catch (e) {
			// 			res.destroy()
			// 			reject(e)
			// 		}
			// 	})
			// 	.listen(4173, () => {
			// 		// open the browser to the authorize url to start the workflow
			// 		open(authorizeUrl, { wait: false }).then((cp) => cp.unref())
			// 	})
			// destroyer(server)
		})
	}

	return { files: await main() }
}
