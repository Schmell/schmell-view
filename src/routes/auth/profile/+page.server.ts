import { prisma } from '$lib/server/prisma';
import { capitalizeFirstLetter, serializeNonPOJOs } from '$lib/utils';
import { error, fail, redirect } from '@sveltejs/kit';
import type { ActionData, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { Prisma, type User } from '@prisma/client';

const profileSchema = z.object({
	username: z.string().min(2).max(18),
	firstname: z.string().max(16).optional(),
	lastname: z.string().max(16).optional(),
	avatar: z.string().optional()
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) throw redirect(302, '/');

	if (!session?.user?.emailVerified) throw redirect(302, '/auth/email-verification');

	const user: any = await prisma.user.findFirst({
		where: { email: session.user.email }
	});

	if (!user) throw error(404, 'Not found');

	const form = await superValidate(user, profileSchema);

	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		const form = await superValidate(request, profileSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await prisma.user.update({
				where: { id: session?.user?.userId },
				data: {
					username: form.data.username,
					firstname: form.data.firstname,
					lastname: form.data.lastname,
					avatar: form.data.avatar
				}
			});
		} catch (error: any) {
			//
			console.log('error: ', error);

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
			// maybe need lucia errors
			console.log('error: ', error);
		}
	}
};
