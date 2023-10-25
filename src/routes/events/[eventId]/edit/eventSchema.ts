import { z } from 'zod'

export const eventSchema = z.object({
	name: z.string(),
	eventwebsite: z.string().nullable(),
	email: z.string().email().nullable(),
	venueName: z.string().nullable(),
	description: z.string().nullable(),
	titleImage: z.string().url().nullable(),
	public: z.boolean(),
	complete: z.boolean(),
	Venue: z.any().nullable(),
	venueId: z.string().nullable(),
	resultColumns: z.object({
		rank: z.boolean().nullable().optional(),
		points: z.boolean().nullable().optional(),
		position: z.boolean().nullable().optional(),
		skipper: z.boolean().nullable().optional(),
		boat: z.boolean().nullable().optional(),
		sailno: z.boolean().nullable().optional(),
		finish: z.boolean().nullable().optional(),
		corrected: z.boolean().nullable().optional(),
		elapsed: z.boolean().nullable().optional(),
		nett: z.boolean().nullable().optional(),
		total: z.boolean().nullable().optional()
	})
})
