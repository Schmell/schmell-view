import { z } from 'zod';
import type { CompWithRelations } from './CompSchema'
import type { CompPartialWithRelations } from './CompSchema'
import { CompWithRelationsSchema } from './CompSchema'
import { CompPartialWithRelationsSchema } from './CompSchema'

/////////////////////////////////////////
// USER COMP SCHEMA
/////////////////////////////////////////

export const UserCompSchema = z.object({
  id: z.string(),
  role: z.string(),
  compId: z.string(),
})

export type UserComp = z.infer<typeof UserCompSchema>

/////////////////////////////////////////
// USER COMP PARTIAL SCHEMA
/////////////////////////////////////////

export const UserCompPartialSchema = UserCompSchema.partial()

export type UserCompPartial = z.infer<typeof UserCompPartialSchema>

/////////////////////////////////////////
// USER COMP RELATION SCHEMA
/////////////////////////////////////////

export type UserCompRelations = {
  Comp: CompWithRelations;
};

export type UserCompWithRelations = z.infer<typeof UserCompSchema> & UserCompRelations

export const UserCompWithRelationsSchema: z.ZodType<UserCompWithRelations> = UserCompSchema.merge(z.object({
  Comp: z.lazy(() => CompWithRelationsSchema),
}))

/////////////////////////////////////////
// USER COMP PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type UserCompPartialRelations = {
  Comp?: CompPartialWithRelations;
};

export type UserCompPartialWithRelations = z.infer<typeof UserCompPartialSchema> & UserCompPartialRelations

export const UserCompPartialWithRelationsSchema: z.ZodType<UserCompPartialWithRelations> = UserCompPartialSchema.merge(z.object({
  Comp: z.lazy(() => CompPartialWithRelationsSchema),
})).partial()

export type UserCompWithPartialRelations = z.infer<typeof UserCompSchema> & UserCompPartialRelations

export const UserCompWithPartialRelationsSchema: z.ZodType<UserCompWithPartialRelations> = UserCompSchema.merge(z.object({
  Comp: z.lazy(() => CompPartialWithRelationsSchema),
}).partial())

export default UserCompSchema;
