import { Prisma } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';

export function prismaError(error: any) {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		console.log('PrismaClientKnownRequestError: ', error.message);
		throw redirect(307, '/');
		throw fail(511, {
			message: error.message
		});
	}
	if (error instanceof Prisma.PrismaClientValidationError) {
		console.log('PrismaClientValidationError: ', error.message);
		throw redirect(307, '/');
		throw fail(511, {
			message: error.message
		});
	}
}
