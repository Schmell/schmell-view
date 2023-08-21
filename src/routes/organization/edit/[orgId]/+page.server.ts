import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { Prisma } from '@prisma/client';

import type { Actions, PageServerLoad } from './$types';
import { OrganizationSchema } from '$lib/server/generated/zod';
import { capitalizeFirstLetter } from '$lib/utils';

export const load = (async ({ params, url }) => {
	if (params.orgId === 'new') {
		const org = { name: 'New Organization' };

		const form = await superValidate(org, OrganizationSchema);

		return { form };
	}

	const org: any = prisma.organization.findFirst({ where: { id: params.orgId } });

	const form = await superValidate(org, OrganizationSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const session = await locals.auth.validate();

		const form = await superValidate(request, OrganizationSchema);

		if (!form.valid) fail(400, { form });

		try {
			const { name, description, website, email } = form.data;

			await prisma.organization.upsert({
				where: { name: name },
				update: { name, description, website, email },
				create: {
					name,
					description,
					website,
					email,
					Owner: {
						connect: { id: session?.user.userId }
					}
				}
			});
			// throw redirect(300)
		} catch (error: any) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.log('prisma known error: ', form);
				// Unique constraint violation
				if (error.code === 'P2002') {
					//@ts-ignore
					const propName = e.meta?.target[0];

					form.valid = false;
					console.log('form.data[propName]: ', form.data[propName]);

					form.errors[propName] = `${capitalizeFirstLetter(propName)} is already registered`;

					return fail(400, {
						form
					});
				}

				// Can't reach database server
				if (error.code === 'P1001') {
					console.log(' Cant reach database server: ', error.message);
					return fail(503, {
						message: error.message
					});
				}
			}

			console.log('error: ', error);

			return { form };
		}

		const from = url.searchParams.get('from');
		// console.log('from: ', from)
		if (from) {
			throw redirect(303, `/${from}`);
		}
	}
};
