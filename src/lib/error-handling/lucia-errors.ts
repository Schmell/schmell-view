import { fail } from '@sveltejs/kit';
import { LuciaError } from 'lucia';

export function luciaErrors(error: any) {
	if (error instanceof LuciaError) {
		console.error('LuciaError: ', error.message);
		throw fail(500, { messgage: error.message });
	}
	throw fail(500, { messgage: `Unkown Lucia Error: ${error.message}` });
}
