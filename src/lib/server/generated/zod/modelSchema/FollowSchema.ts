import { z } from 'zod';

/////////////////////////////////////////
// FOLLOW SCHEMA
/////////////////////////////////////////

export const FollowSchema = z.object({
  id: z.string(),
  type: z.string(),
  itemId: z.string().nullish(),
  userId: z.string(),
  commentId: z.string().nullish(),
  compId: z.string().nullish(),
  eventId: z.string().nullish(),
  organizationId: z.string().nullish(),
  venueId: z.string().nullish(),
  raceId: z.string().nullish(),
  seriesId: z.string().nullish(),
  updatedAt: z.date(),
  createdAt: z.date(),
})

export type Follow = z.infer<typeof FollowSchema>

export default FollowSchema;
