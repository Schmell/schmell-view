import { loadFlash } from 'sveltekit-flash-message/server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = loadFlash(async ({ locals, cookies }) => {
	const session = await locals.auth.validate();
	// console.log('session: ', session);
	const theme = cookies.get('colorTheme');
	// if (theme) {
	// 	document.documentElement.setAttribute('data-theme', theme);
	// }
	return { user: session?.user };
});
