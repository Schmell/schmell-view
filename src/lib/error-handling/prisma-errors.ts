import { Prisma } from '@prisma/client';
import { fail } from '@sveltejs/kit';

export function prismaError(error: any) {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		console.log('PrismaClientKnownRequestError: ', error.message);
		throw fail(511, {
			message: error.message
		});
	}
	if (error instanceof Prisma.PrismaClientValidationError) {
		console.log('PrismaClientValidationError: ', error.message);
		throw fail(511, {
			message: error.message
		});
	}
}
