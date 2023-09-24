// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from '@prisma/client'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest
			from: string
		}
		interface PageData {
			flash?: { type: 'success' | 'error'; message: string }
		}
		// interface Platform {}
	}
	var prisma: PrismaClient

	// namespace svelte.JSX {
	// 	interface HTMLAttributes<T> {
	// 		onclick_outside: () => void;
	// 	}
	// }
	interface HTMLAttributes<T> {
		click_outside: () => void
	}

	namespace PrismaJson {
		type compRest = {
			rating?: string
			sailNo?: string
			nett?: string
			total?: string
		}

		type venueRest = {}

		export type eventRest = {
			venuewebsite?: string
			venueemail?: string
			venueburgee?: string
			eventburgee?: string
		}

		const resultColumns = z.object({
			boat: z.boolean().nullable(),
			skipper: z.boolean().nullable(),
			fleet: z.boolean().nullable(),
			points: z.boolean().nullable(),
			elapsed: z.boolean().nullable(),
			corrected: z.boolean().nullable(),
			finish: z.boolean().nullable(),
			rank: z.boolean().nullable(),
			position: z.boolean().nullable(),
			nett: z.boolean().nullable(),
			total: z.boolean().nullable()
		})

		export type resultColumns = z.infer<typeof resultColumns>

		type fileInfo = {
			lastModified: string
		}
	}
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth
		type DatabaseUserAttributes = {
			facebook_username?: string
			google_username?: string
			github_username?: string
			username: string
			email?: string
			email_verified?: number
			name?: string
			firstname?: string
			lastname?: string
			avatar?: string
		}
		type DatabaseSessionAttributes = {}
	}
}

export {}
