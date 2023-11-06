import { z } from 'zod';
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'

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

/////////////////////////////////////////
// USER SETTINGS PARTIAL SCHEMA
/////////////////////////////////////////

export const UserSettingsPartialSchema = UserSettingsSchema.partial()

export type UserSettingsPartial = z.infer<typeof UserSettingsPartialSchema>

/////////////////////////////////////////
// USER SETTINGS RELATION SCHEMA
/////////////////////////////////////////

export type UserSettingsRelations = {
  user?: UserWithRelations | null;
};

export type UserSettingsWithRelations = z.infer<typeof UserSettingsSchema> & UserSettingsRelations

export const UserSettingsWithRelationsSchema: z.ZodType<UserSettingsWithRelations> = UserSettingsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// USER SETTINGS PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type UserSettingsPartialRelations = {
  user?: UserPartialWithRelations | null;
};

export type UserSettingsPartialWithRelations = z.infer<typeof UserSettingsPartialSchema> & UserSettingsPartialRelations

export const UserSettingsPartialWithRelationsSchema: z.ZodType<UserSettingsPartialWithRelations> = UserSettingsPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
})).partial()

export type UserSettingsWithPartialRelations = z.infer<typeof UserSettingsSchema> & UserSettingsPartialRelations

export const UserSettingsWithPartialRelationsSchema: z.ZodType<UserSettingsWithPartialRelations> = UserSettingsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
}).partial())

export default UserSettingsSchema;
