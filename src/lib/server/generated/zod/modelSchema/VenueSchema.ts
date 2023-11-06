import { z } from 'zod';

/////////////////////////////////////////
// VENUE SCHEMA
/////////////////////////////////////////

export const VenueSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  website: z.string().nullish(),
  email: z.string().nullish(),
  phone: z.string().nullish(),
  burgee: z.string().nullish(),
  titleImage: z.string().nullish(),
  publisherId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Venue = z.infer<typeof VenueSchema>

export default VenueSchema;
