import { z } from 'zod';

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string(),
  type: z.string().nullish(),
  ref: z.string().nullish(),
  comment: z.string(),
  eventId: z.string().nullish(),
  userId: z.string(),
  raceId: z.string().nullish(),
  seriesId: z.string().nullish(),
  organizationId: z.string().nullish(),
  venueId: z.string().nullish(),
  compId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Comment = z.infer<typeof CommentSchema>

export default CommentSchema;
