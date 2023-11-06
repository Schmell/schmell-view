import { z } from 'zod';

/////////////////////////////////////////
// KEY SCHEMA
/////////////////////////////////////////

export const KeySchema = z.object({
  id: z.string(),
  hashed_password: z.string().nullish(),
  user_id: z.string(),
})

export type Key = z.infer<typeof KeySchema>

export default KeySchema;
