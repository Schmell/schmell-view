import { z } from 'zod';

/////////////////////////////////////////
// USER SETTINGS SCHEMA
/////////////////////////////////////////

export const UserSettingsSchema = z.object({
  id: z.string(),
  theme: z.string().nullish(),
  language: z.string().nullish(),
  userId: z.string().nullish(),
})

export type UserSettings = z.infer<typeof UserSettingsSchema>

export default UserSettingsSchema;
