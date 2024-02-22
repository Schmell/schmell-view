import { google } from 'googleapis'
import path from 'path'

export default function () {
	const loc = process.cwd()
	const KEYFILEPATH = path.join(loc, 'src/lib/service/service.json')

	const SCOPES = ['https://www.googleapis.com/auth/drive']

	const auth = new google.auth.GoogleAuth({
		keyFile: KEYFILEPATH,
		scopes: SCOPES
	})
	const driveService = google.drive({ version: 'v3', auth })
	return driveService
}
