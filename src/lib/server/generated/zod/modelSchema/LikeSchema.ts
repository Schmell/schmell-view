import { z } from 'zod';

/////////////////////////////////////////
// LIKE SCHEMA
/////////////////////////////////////////

export const LikeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  itemId: z.string().nullish(),
  seriesId: z.string().nullish(),
  eventId: z.string().nullish(),
  organizationId: z.string().nullish(),
  raceId: z.string().nullish(),
  compId: z.string().nullish(),
  updatedAt: z.date(),
  createdAt: z.date(),
  eventCommentId: z.string().nullish(),
  commentId: z.string().nullish(),
  venueId: z.string().nullish(),
})

export type Like = z.infer<typeof LikeSchema>

export default LikeSchema;
