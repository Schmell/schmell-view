import { z } from 'zod';
import type { CompWithRelations } from './CompSchema'
import type { CompPartialWithRelations } from './CompSchema'
import type { EventWithRelations } from './EventSchema'
import type { EventPartialWithRelations } from './EventSchema'
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import type { RaceWithRelations } from './RaceSchema'
import type { RacePartialWithRelations } from './RaceSchema'
import { CompWithRelationsSchema } from './CompSchema'
import { CompPartialWithRelationsSchema } from './CompSchema'
import { EventWithRelationsSchema } from './EventSchema'
import { EventPartialWithRelationsSchema } from './EventSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'
import { RaceWithRelationsSchema } from './RaceSchema'
import { RacePartialWithRelationsSchema } from './RaceSchema'

/////////////////////////////////////////
// RESULT SCHEMA
/////////////////////////////////////////

export const ResultSchema = z.object({
  id: z.string(),
  resultId: z.string(),
  points: z.string().nullish(),
  position: z.string().nullish(),
  discard: z.string().nullish(),
  resultType: z.string().nullish(),
  code: z.string().nullish(),
  start: z.string().nullish(),
  finish: z.string().nullish(),
  corrected: z.string().nullish(),
  elapsed: z.string().nullish(),
  elapsedWin: z.string().nullish(),
  ratingWin: z.string().nullish(),
  raceRating: z.string().nullish(),
  supposedRating: z.string().nullish(),
  fleet: z.string().nullish(),
  rrset: z.string().nullish(),
  publisherId: z.string(),
  eventId: z.string().nullish(),
  compId: z.string().nullish(),
  raceId: z.string().nullish(),
  raceCompId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Result = z.infer<typeof ResultSchema>

/////////////////////////////////////////
// RESULT PARTIAL SCHEMA
/////////////////////////////////////////

export const ResultPartialSchema = ResultSchema.partial()

export type ResultPartial = z.infer<typeof ResultPartialSchema>

/////////////////////////////////////////
// RESULT RELATION SCHEMA
/////////////////////////////////////////

export type ResultRelations = {
  Comp?: CompWithRelations | null;
  Event?: EventWithRelations | null;
  Publisher?: UserWithRelations | null;
  Race?: RaceWithRelations | null;
};

export type ResultWithRelations = z.infer<typeof ResultSchema> & ResultRelations

export const ResultWithRelationsSchema: z.ZodType<ResultWithRelations> = ResultSchema.merge(z.object({
  Comp: z.lazy(() => CompWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish(),
  Race: z.lazy(() => RaceWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// RESULT PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type ResultPartialRelations = {
  Comp?: CompPartialWithRelations | null;
  Event?: EventPartialWithRelations | null;
  Publisher?: UserPartialWithRelations | null;
  Race?: RacePartialWithRelations | null;
};

export type ResultPartialWithRelations = z.infer<typeof ResultPartialSchema> & ResultPartialRelations

export const ResultPartialWithRelationsSchema: z.ZodType<ResultPartialWithRelations> = ResultPartialSchema.merge(z.object({
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
})).partial()

export type ResultWithPartialRelations = z.infer<typeof ResultSchema> & ResultPartialRelations

export const ResultWithPartialRelationsSchema: z.ZodType<ResultWithPartialRelations> = ResultSchema.merge(z.object({
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
}).partial())

export default ResultSchema;
