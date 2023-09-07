import type { Actions, PageServerLoad } from '../$types';
import { z } from 'zod';
import csv from 'csvtojson';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { Populate } from '$lib/importers/sailwave';
import Blw from '$lib/importers/sailwave/Blw';
import { prismaError } from '$lib/error-handling';

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

	async function getOrgs() {
		try {
			return await prisma.organization.findMany({
				where: { ownerId: session?.userId },
				select: { name: true, id: true }
			});
		} catch (error) {
			prismaError(error);
			console.log('error: ', error);
		}
	}

	// const form = await superValidate(importSchema);

	return { orgs: getOrgs() };
};

export const actions: Actions = {
	newImport: async ({ request, locals, url }) => {
		const session = await locals.auth.validate();
		const formData = await request.formData();
		const { org, file }: any = Object.fromEntries(formData);
		const csvArray = await csv({ noheader: true, output: 'csv' }).fromString(await file.text());

		const blw = new Blw({ data: csvArray });
		const { uniqueIdString } = blw.getEvent();

		const duplicate = await prisma.event.findFirst({
			where: { uniqueIdString: uniqueIdString },
			select: { id: true }
		});

		if (duplicate) {
			throw redirect(301, `/import/update?${url.search}&duplicate=1&eventId=${duplicate.id}`);
		}

		await Populate({
			blw,
			userId: session?.user.userId,
			orgId: org
		});

		throw redirect(300, `/events`);
	},

	update: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		const formData: any = Object.fromEntries(await request.formData());
		const { org, file }: any = formData;
		const csvArray = await csv({ noheader: true, output: 'csv' }).fromString(await file.text());

		const blw = new Blw({ data: csvArray });

		await Populate({
			blw,
			userId: session?.user.userId,
			orgId: org
		});

		throw redirect(300, `/events`);
	}
};
