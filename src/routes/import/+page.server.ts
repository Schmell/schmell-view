import type { Actions, PageServerLoad } from '../$types';
import { error, redirect } from '@sveltejs/kit';
import { CheckForDuplicates, Populate } from '$lib/importers/sailwave';

import pkg from 'papaparse';
const { parse } = pkg;
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	// If not logged in redirect
	if (!session) {
		throw redirect(302, '/');
	}

	const orgs = await prisma.organization.findMany({
		where: { ownerId: session.userId }
	});

	return {
		orgs
	};
};

export const actions: Actions = {
	default: async (input) => {
		const { request, locals } = input;
		const fd = await request.formData();

		const { org, file }: any = Object.fromEntries(fd);

		//  TODO:
		// Impement multiple file upload

		//  TODO:

		// check for duplicates etc.. before

		const texted = await file.text();
		// console.log('texted: ', texted)
		parse(texted, {
			complete: async (results) => {
				// console.log('complete: papaparse')
				const session = await locals.auth.validate();

				const duplicates = await CheckForDuplicates({
					data: results.data,
					userId: session?.user.userId,
					file: file,
					orgId: org
				});

				if (duplicates !== null) {
					console.log('duplicates: ', duplicates);
				}

				await Populate({
					data: results.data,
					userId: session?.user.userId,
					file: file,
					orgId: org
				});

				throw redirect(300, `/events`);
			},
			error: (status, err) => {
				// TODO
				console.log('import error: ', status, err);
				throw error(418, `error from import server ts ${err}`);
			}
		});

		// throw redirect(300, '/events');
	}
};
