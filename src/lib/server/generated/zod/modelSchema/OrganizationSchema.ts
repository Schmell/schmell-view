import { z } from 'zod';

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  tag: z.string().nullish(),
  website: z.string().nullish(),
  email: z.string().nullish(),
  /**
   * .url
   */
  logo: z.string().nullish(),
  titleImage: z.string().nullish(),
  ownerId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Organization = z.infer<typeof OrganizationSchema>

export default OrganizationSchema;
