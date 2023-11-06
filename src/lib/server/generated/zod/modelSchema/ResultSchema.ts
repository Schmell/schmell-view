import { z } from 'zod';

/////////////////////////////////////////
// RESULT SCHEMA
/////////////////////////////////////////

export const ResultSchema = z.object({
  id: z.string(),
  resultId: z.string(),
  points: z.string().nullish(),
  position: z.string().nullish(),
  discard: z.string().nullish(),
  resultType: z.string().nullish(),
  code: z.string().nullish(),
  start: z.string().nullish(),
  finish: z.string().nullish(),
  corrected: z.string().nullish(),
  elasped: z.string().nullish(),
  elapsedWin: z.string().nullish(),
  ratingWin: z.string().nullish(),
  raceRating: z.string().nullish(),
  supposedRating: z.string().nullish(),
  rrset: z.string().nullish(),
  publisherId: z.string(),
  eventId: z.string().nullish(),
  compId: z.string().nullish(),
  raceId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Result = z.infer<typeof ResultSchema>

export default ResultSchema;
