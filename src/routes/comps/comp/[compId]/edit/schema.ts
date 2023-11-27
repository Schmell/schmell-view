import { z } from 'zod'

export const compSchema = z
	.object({
		id: z.string(),
		description: z.string().nullable().optional(),
		compId: z.string(),
		raceId: z.string().nullable().optional(),
		club: z.string().nullable().optional(),
		image: z.string().nullable().optional(),
		boat: z.string().nullable().optional(),
		skipper: z.string().nullable().optional(),
		sailno: z.string().nullable().optional(),
		rating: z.string().nullable().optional(),
		fleet: z.string().nullable().optional(),
		division: z.string().nullable().optional()
	})
	.superRefine((data, ctx) => {
		if (!data.boat && !data.skipper && !data.sailno) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Must have at least one, Boat, Skipper or SailNo.'
			})
		}
		return z.NEVER
	})
