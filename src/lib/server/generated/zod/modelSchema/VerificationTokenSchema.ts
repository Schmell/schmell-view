import { z } from 'zod';

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  expires: z.bigint(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

export default VerificationTokenSchema;
