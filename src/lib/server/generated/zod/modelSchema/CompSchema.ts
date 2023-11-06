import { z } from 'zod';
import { NullableJsonValue } from "../inputTypeSchemas/NullableJsonValue"

/////////////////////////////////////////
// COMP SCHEMA
/////////////////////////////////////////

export const CompSchema = z.object({
  id: z.string(),
  compId: z.string(),
  description: z.string().nullish(),
  raceId: z.string().nullish(),
  club: z.string().nullish(),
  boat: z.string().nullish(),
  skipper: z.string().nullish(),
  sailno: z.string().nullish(),
  fleet: z.string().nullish(),
  division: z.string().nullish(),
  rating: z.string().nullish(),
  rank: z.string().nullish(),
  nett: z.string().nullish(),
  total: z.string().nullish(),
  /**
   * [compRest]
   */
  rest: NullableJsonValue.optional(),
  image: z.string().nullish(),
  publisherId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Comp = z.infer<typeof CompSchema>

export default CompSchema;
