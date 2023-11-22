import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import type { JsonValueType } from '../inputTypeSchemas/JsonValueSchema';
import type { EventWithRelations } from './EventSchema'
import type { EventPartialWithRelations } from './EventSchema'
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import type { ResultWithRelations } from './ResultSchema'
import type { ResultPartialWithRelations } from './ResultSchema'
import type { FollowWithRelations } from './FollowSchema'
import type { FollowPartialWithRelations } from './FollowSchema'
import type { LikeWithRelations } from './LikeSchema'
import type { LikePartialWithRelations } from './LikeSchema'
import type { CompWithRelations } from './CompSchema'
import type { CompPartialWithRelations } from './CompSchema'
import type { CommentWithRelations } from './CommentSchema'
import type { CommentPartialWithRelations } from './CommentSchema'
import { EventWithRelationsSchema } from './EventSchema'
import { EventPartialWithRelationsSchema } from './EventSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'
import { ResultWithRelationsSchema } from './ResultSchema'
import { ResultPartialWithRelationsSchema } from './ResultSchema'
import { FollowWithRelationsSchema } from './FollowSchema'
import { FollowPartialWithRelationsSchema } from './FollowSchema'
import { LikeWithRelationsSchema } from './LikeSchema'
import { LikePartialWithRelationsSchema } from './LikeSchema'
import { CompWithRelationsSchema } from './CompSchema'
import { CompPartialWithRelationsSchema } from './CompSchema'
import { CommentWithRelationsSchema } from './CommentSchema'
import { CommentPartialWithRelationsSchema } from './CommentSchema'

/////////////////////////////////////////
// RACE SCHEMA
/////////////////////////////////////////

export const RaceSchema = z.object({
  id: z.string(),
  raceId: z.string().nullish(),
  uniqueRaceString: z.string(),
  name: z.string().nullish(),
  starts: JsonValueSchema,
  rank: z.string().nullish(),
  date: z.string().nullish(),
  time: z.string().nullish(),
  notes: z.string().nullish(),
  sailed: z.string().nullish(),
  rating: z.string().nullish(),
  resultColumns: JsonValueSchema,
  /**
   * [raceRest]
   */
  rest: JsonValueSchema,
  eventId: z.string().nullish(),
  publisherId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Race = z.infer<typeof RaceSchema>

/////////////////////////////////////////
// RACE PARTIAL SCHEMA
/////////////////////////////////////////

export const RacePartialSchema = RaceSchema.partial()

export type RacePartial = z.infer<typeof RacePartialSchema>

/////////////////////////////////////////
// RACE RELATION SCHEMA
/////////////////////////////////////////

export type RaceRelations = {
  Event?: EventWithRelations | null;
  Publisher?: UserWithRelations | null;
  Results: ResultWithRelations[];
  Follows: FollowWithRelations[];
  Likes: LikeWithRelations[];
  Comps: CompWithRelations[];
  Comments: CommentWithRelations[];
};

export type RaceWithRelations = Omit<z.infer<typeof RaceSchema>, "starts" | "resultColumns" | "rest"> & {
  starts?: JsonValueType | null;
  resultColumns?: JsonValueType | null;
  rest?: JsonValueType | null;
} & RaceRelations

export const RaceWithRelationsSchema: z.ZodType<RaceWithRelations> = RaceSchema.merge(z.object({
  Event: z.lazy(() => EventWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish(),
  Results: z.lazy(() => ResultWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowWithRelationsSchema).array(),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Comps: z.lazy(() => CompWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// RACE PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type RacePartialRelations = {
  Event?: EventPartialWithRelations | null;
  Publisher?: UserPartialWithRelations | null;
  Results?: ResultPartialWithRelations[];
  Follows?: FollowPartialWithRelations[];
  Likes?: LikePartialWithRelations[];
  Comps?: CompPartialWithRelations[];
  Comments?: CommentPartialWithRelations[];
};

export type RacePartialWithRelations = Omit<z.infer<typeof RacePartialSchema>, "starts" | "resultColumns" | "rest"> & {
  starts?: JsonValueType | null;
  resultColumns?: JsonValueType | null;
  rest?: JsonValueType | null;
} & RacePartialRelations

export const RacePartialWithRelationsSchema: z.ZodType<RacePartialWithRelations> = RacePartialSchema.merge(z.object({
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comps: z.lazy(() => CompPartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
})).partial()

export type RaceWithPartialRelations = Omit<z.infer<typeof RaceSchema>, "starts" | "resultColumns" | "rest"> & {
  starts?: JsonValueType | null;
  resultColumns?: JsonValueType | null;
  rest?: JsonValueType | null;
} & RacePartialRelations

export const RaceWithPartialRelationsSchema: z.ZodType<RaceWithPartialRelations> = RaceSchema.merge(z.object({
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comps: z.lazy(() => CompPartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
}).partial())

export default RaceSchema;
