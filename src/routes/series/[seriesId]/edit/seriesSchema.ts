import { z } from 'zod'

export const seriesSchema = z.object({
	name: z.string(),
	description: z.string().nullable().optional(),
	logo: z.string().url().nullable().optional(),
	titleImage: z.string().url().nullable().optional(),
	organizationId: z.string().nullable().optional(),
	Events: z
		.array(
			z.object({
				name: z.string().optional(),
				id: z.string().optional()
			})
		)
		.optional()
})
