import { z } from 'zod'

export const venueSchema = z.object({
	name: z.string(),
	website: z.string().nullable(),
	description: z.string().nullable(),
	email: z.string().nullable(),
	phone: z.string().nullable(),
	burgee: z.string().url().nullable(),
	titleImage: z.string().url().nullable()
})

export const addressSchema = z.object({
	label: z.string(),
	street: z.string().nullable().optional(),
	city: z.string().nullable().optional(),
	state: z.string().nullable().optional().optional(),
	country: z.string().nullable().optional(),
	code: z.string().nullable().optional()
})
