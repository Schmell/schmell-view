import { z } from 'zod';
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'

/////////////////////////////////////////
// KEY SCHEMA
/////////////////////////////////////////

export const KeySchema = z.object({
  id: z.string(),
  hashed_password: z.string().nullish(),
  user_id: z.string(),
})

export type Key = z.infer<typeof KeySchema>

/////////////////////////////////////////
// KEY PARTIAL SCHEMA
/////////////////////////////////////////

export const KeyPartialSchema = KeySchema.partial()

export type KeyPartial = z.infer<typeof KeyPartialSchema>

/////////////////////////////////////////
// KEY RELATION SCHEMA
/////////////////////////////////////////

export type KeyRelations = {
  user: UserWithRelations;
};

export type KeyWithRelations = z.infer<typeof KeySchema> & KeyRelations

export const KeyWithRelationsSchema: z.ZodType<KeyWithRelations> = KeySchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// KEY PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type KeyPartialRelations = {
  user?: UserPartialWithRelations;
};

export type KeyPartialWithRelations = z.infer<typeof KeyPartialSchema> & KeyPartialRelations

export const KeyPartialWithRelationsSchema: z.ZodType<KeyPartialWithRelations> = KeyPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type KeyWithPartialRelations = z.infer<typeof KeySchema> & KeyPartialRelations

export const KeyWithPartialRelationsSchema: z.ZodType<KeyWithPartialRelations> = KeySchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

export default KeySchema;
