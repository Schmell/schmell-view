import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// export const handle: Handle = async ({ event, resolve }) => {
// 	// we can pass `event` because we used the SvelteKit middleware

// 	event.locals.auth = auth.handleRequest(event);
// 	return await resolve(event);
// };
// export const fromHandle: Handle = async ({ event, resolve }) => {
// 	// we can pass `event` because we used the SvelteKit middleware
// 	const { url } = event;
// 	const from = `${url.pathname}?${url.searchParams}`;
// 	console.log('from: ', from);
// 	event.locals.from = from;
// 	return await resolve(event);
// };

export const luciaHandle: Handle = async ({ event, resolve }) => {
	// we can pass `event` because we used the SvelteKit middleware

	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};

export const themeHandle: Handle = async ({ resolve, event }) => {
	let theme: string | null = null;
	// console.log('event: ', event);

	const newTheme = event.url.searchParams.get('theme');

	const cookieTheme = event.cookies.get('colorTheme');

	if (cookieTheme) {
		// console.log('newTheme: ', cookieTheme);
		theme = cookieTheme;
	} else if (newTheme) {
		// console.log('cookieTheme: ', newTheme);
		theme = newTheme;
	}

	// console.log('theme: ', theme);

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
		});
	}

	return resolve(event);
};

export const handle: Handle = sequence(luciaHandle, themeHandle);
