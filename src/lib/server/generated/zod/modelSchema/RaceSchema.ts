import { z } from 'zod';
import { NullableJsonValue } from "../inputTypeSchemas/NullableJsonValue"

/////////////////////////////////////////
// RACE SCHEMA
/////////////////////////////////////////

export const RaceSchema = z.object({
  id: z.string(),
  raceId: z.string().nullish(),
  uniqueRaceString: z.string(),
  name: z.string().nullish(),
  starts: NullableJsonValue.optional(),
  rank: z.string().nullish(),
  date: z.string().nullish(),
  time: z.string().nullish(),
  notes: z.string().nullish(),
  sailed: z.string().nullish(),
  rating: z.string().nullish(),
  resultColumns: NullableJsonValue.optional(),
  /**
   * [raceRest]
   */
  rest: NullableJsonValue.optional(),
  eventId: z.string().nullish(),
  publisherId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Race = z.infer<typeof RaceSchema>

export default RaceSchema;
