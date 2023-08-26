import type { Actions, PageServerLoad } from '../$types';
import { error, redirect } from '@sveltejs/kit';
import { Populate } from '$lib/importers/sailwave';

import pkg from 'papaparse';
const { parse } = pkg;
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';

const importSchema = z.object({
	file: z.any(),
	org: z.string()
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	// If not logged in redirect
	if (!session) {
		throw redirect(302, '/');
	}

	const orgs: any = await prisma.organization.findMany({
		where: { ownerId: session.userId },
		select: { name: true, id: true }
	});

	// const form = await superValidate(importSchema);

	return { orgs };
};

export const actions: Actions = {
	default: async (input) => {
		const { request, locals } = input;
		const { org, file }: any = Object.fromEntries(await request.formData());

		const texted = await file.text();

		await new Promise((resolve) => {
			parse(texted, {
				complete: async (results) => {
					const session = await locals.auth.validate();

					await Populate({
						data: results.data,
						userId: session?.user.userId,
						file: file,
						orgId: org
					});
					resolve({ success: true });
				},

				error: (status, err) => {
					// TODO
					console.log('import error: ', status, err);
					throw error(418, `error from import server ts ${err}`);
				}
			});
		});

		// return resultsData
		// return {
		// 	status
		// };
		throw redirect(300, `/events`);
	}
};
