import { loadFlash } from 'sveltekit-flash-message/server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = loadFlash(async ({ locals, cookies }) => {
	const session = await locals.auth.validate();

	const theme = cookies.get('colorTheme');

	return { user: session?.user };
});
