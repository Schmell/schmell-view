import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  firstname: z.string().nullish(),
  lastname: z.string().nullish(),
  email: z.string().nullish(),
  email_verified: z.number().nullish(),
  name: z.string().nullish(),
  avatar: z.string().nullish(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
