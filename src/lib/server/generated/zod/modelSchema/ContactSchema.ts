import { z } from 'zod';

/////////////////////////////////////////
// CONTACT SCHEMA
/////////////////////////////////////////

export const ContactSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.string().nullish(),
  email: z.string().nullish(),
  phone: z.string().nullish(),
  addressId: z.string().nullish(),
  userId: z.string().nullish(),
  venueId: z.string().nullish(),
  organizationId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Contact = z.infer<typeof ContactSchema>

export default ContactSchema;
