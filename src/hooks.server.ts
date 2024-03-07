import { auth } from '$lib/server/lucia'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

// import { createContext } from '$lib/trpc/context'
// import { router } from '$lib/trpc/router'
// import { createTRPCHandle } from 'trpc-sveltekit'

// export const trpc: Handle = createTRPCHandle({ router, createContext })

export const luciaHandle: Handle = async ({ event, resolve }) => {
	// we can pass `event` because we used the SvelteKit middleware
	event.locals.auth = auth.handleRequest(event)
	return await resolve(event)
}

export const themeHandle: Handle = async ({ resolve, event }) => {
	let theme: string | null = null

	const newTheme = event.url.searchParams.get('theme')
	const cookieTheme = event.cookies.get('colorTheme')

	if (cookieTheme) {
		theme = cookieTheme
	} else if (newTheme) {
		theme = newTheme
	}

	if (newTheme || cookieTheme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
		})
	}

	return resolve(event)
}

export const handle: Handle = sequence(luciaHandle, themeHandle)
