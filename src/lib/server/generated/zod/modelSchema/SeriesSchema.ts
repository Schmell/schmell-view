import { z } from 'zod'

/////////////////////////////////////////
// SERIES SCHEMA
/////////////////////////////////////////

export const SeriesSchema = z.object({
	id: z.string(),
	name: z.string(),
	/**
	 * .optional
	 */
	description: z.string().nullish(),
	/**
	 * .url.optional
	 */
	logo: z.string().nullish(),
	/**
	 * .url.optional
	 */
	titleImage: z.string().nullish(),
	organizationId: z.string().nullish(),
	publisherId: z.string().nullish(),
	createdAt: z.date().nullish(),
	updatedAt: z.date().nullish()
})

export type Series = z.infer<typeof SeriesSchema>

export default SeriesSchema
