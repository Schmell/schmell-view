import type { Actions, PageServerLoad } from '../$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { CheckForDuplicates, Populate } from '$lib/importers/sailwave';

import pkg from 'papaparse';
const { parse } = pkg;
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import csvToJson from 'convert-csv-to-json';
import { writable } from 'svelte/store';

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
		let status;
		const texted = await file.text();

		parse(texted, {
			complete: async (results) => {
				const session = await locals.auth.validate();

				status = await Populate({
					data: results.data,
					userId: session?.user.userId,
					file: file,
					orgId: org
				});
			},

			error: (status, err) => {
				// TODO
				console.log('import error: ', status, err);
				throw error(418, `error from import server ts ${err}`);
			}
		});

		// return resultsData
		return {
			status
		};
		// throw redirect(300, `/events`);
	}
};
