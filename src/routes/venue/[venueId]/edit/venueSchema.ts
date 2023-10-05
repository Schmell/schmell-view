import { z } from 'zod'

export const venueSchema = z.object({
	name: z.string(),
	website: z.string().nullable(),
	description: z.string().nullable(),
	email: z.string().nullable(),
	phone: z.string().nullable(),
	burgee: z.string().nullable(),
	addressName: z.string().nullable(),
	street: z.string().nullable(),
	city: z.string().nullable(),
	state: z.string().nullable(),
	country: z.string().nullable(),
	code: z.string().nullable(),
	titleImage: z.string().nullable()
})
