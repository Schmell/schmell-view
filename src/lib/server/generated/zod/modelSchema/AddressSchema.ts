import { z } from 'zod';

/////////////////////////////////////////
// ADDRESS SCHEMA
/////////////////////////////////////////

export const AddressSchema = z.object({
  id: z.string(),
  label: z.string(),
  po: z.string().nullish(),
  street: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
  code: z.string().nullish(),
  venueId: z.string().nullish(),
  organizationId: z.string().nullish(),
  publisherId: z.string().nullish(),
})

export type Address = z.infer<typeof AddressSchema>

export default AddressSchema;
