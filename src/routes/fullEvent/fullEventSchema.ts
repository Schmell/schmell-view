import { z } from 'zod'

export const fullEventSchema = z.object({
	eventName: z.string(),
	eventWebsite: z.string().optional(),
	eventDescription: z.string().optional(),
	public: z.boolean(),
	email: z.string().optional(),
	venueName: z.string().optional()
})
