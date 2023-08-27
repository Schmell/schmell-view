import type { Actions, PageServerLoad } from '../$types';
import { z } from 'zod';
import csv from 'csvtojson';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { Populate } from '$lib/importers/sailwave';
import Blw from '$lib/importers/sailwave/Blw';

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
	default: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		const { org, file }: any = Object.fromEntries(await request.formData());

		const csvArray = await csv({ noheader: true, output: 'csv' }).fromString(await file.text());

		const blw = new Blw({ data: csvArray });
		const { uniqueIdString } = blw.getEvent();
		// const  = event;
		const duplicate = await prisma.event.findFirst({
			where: { uniqueIdString: uniqueIdString },
			select: { id: true }
		});

		if (duplicate) {
			throw redirect(301, `/import/duplicate?eventId=${duplicate.id}`);
		}

		await Populate({
			blw,
			userId: session?.user.userId,
			orgId: org
		});

		throw redirect(300, `/events`);
	}
};
