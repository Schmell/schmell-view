import { z } from 'zod';
import { NullableJsonValue } from "../inputTypeSchemas/NullableJsonValue"

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  id: z.string(),
  eventeid: z.string().nullish(),
  uniqueIdString: z.string(),
  name: z.string(),
  eventwebsite: z.string().nullish(),
  venueName: z.string().nullish(),
  description: z.string().nullish(),
  titleImage: z.string().nullish(),
  public: z.boolean(),
  complete: z.boolean(),
  /**
   * [fileInfo]
   */
  fileInfo: NullableJsonValue.optional(),
  /**
   * [resultColumns]
   */
  resultColumns: NullableJsonValue.optional(),
  /**
   * [eventRest]
   */
  rest: NullableJsonValue.optional(),
  email: z.string().nullish(),
  organizationId: z.string().nullish(),
  publisherId: z.string().nullish(),
  seriesId: z.string().nullish(),
  venueId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Event = z.infer<typeof EventSchema>

export default EventSchema;
