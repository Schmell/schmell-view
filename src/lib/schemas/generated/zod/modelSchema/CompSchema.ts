import { z } from 'zod';
import { NullableJsonValue } from "../inputTypeSchemas/NullableJsonValue"
import type { NullableJsonInput } from '../inputTypeSchemas/transformJsonNull';
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import type { EventWithRelations } from './EventSchema'
import type { EventPartialWithRelations } from './EventSchema'
import type { ResultWithRelations } from './ResultSchema'
import type { ResultPartialWithRelations } from './ResultSchema'
import type { FollowWithRelations } from './FollowSchema'
import type { FollowPartialWithRelations } from './FollowSchema'
import type { LikeWithRelations } from './LikeSchema'
import type { LikePartialWithRelations } from './LikeSchema'
import type { CommentWithRelations } from './CommentSchema'
import type { CommentPartialWithRelations } from './CommentSchema'
import type { RaceWithRelations } from './RaceSchema'
import type { RacePartialWithRelations } from './RaceSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'
import { EventWithRelationsSchema } from './EventSchema'
import { EventPartialWithRelationsSchema } from './EventSchema'
import { ResultWithRelationsSchema } from './ResultSchema'
import { ResultPartialWithRelationsSchema } from './ResultSchema'
import { FollowWithRelationsSchema } from './FollowSchema'
import { FollowPartialWithRelationsSchema } from './FollowSchema'
import { LikeWithRelationsSchema } from './LikeSchema'
import { LikePartialWithRelationsSchema } from './LikeSchema'
import { CommentWithRelationsSchema } from './CommentSchema'
import { CommentPartialWithRelationsSchema } from './CommentSchema'
import { RaceWithRelationsSchema } from './RaceSchema'
import { RacePartialWithRelationsSchema } from './RaceSchema'

/////////////////////////////////////////
// COMP SCHEMA
/////////////////////////////////////////

export const CompSchema = z.object({
  id: z.string(),
  compId: z.string(),
  description: z.string().nullish(),
  raceId: z.string().nullish(),
  club: z.string().nullish(),
  boat: z.string().nullish(),
  skipper: z.string().nullish(),
  sailno: z.string().nullish(),
  fleet: z.string().nullish(),
  division: z.string().nullish(),
  rating: z.string().nullish(),
  rank: z.string().nullish(),
  nett: z.string().nullish(),
  total: z.string().nullish(),
  /**
   * [compRest]
   */
  rest: NullableJsonValue.optional(),
  image: z.string().nullish(),
  publisherId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Comp = z.infer<typeof CompSchema>

/////////////////////////////////////////
// COMP PARTIAL SCHEMA
/////////////////////////////////////////

export const CompPartialSchema = CompSchema.partial()

export type CompPartial = z.infer<typeof CompPartialSchema>

/////////////////////////////////////////
// COMP RELATION SCHEMA
/////////////////////////////////////////

export type CompRelations = {
  Publisher?: UserWithRelations | null;
  Events: EventWithRelations[];
  Results: ResultWithRelations[];
  Follows: FollowWithRelations[];
  Likes: LikeWithRelations[];
  Commments: CommentWithRelations[];
  Races: RaceWithRelations[];
};

export type CompWithRelations = Omit<z.infer<typeof CompSchema>, "rest"> & {
  rest?: NullableJsonInput;
} & CompRelations

export const CompWithRelationsSchema: z.ZodType<CompWithRelations> = CompSchema.merge(z.object({
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventWithRelationsSchema).array(),
  Results: z.lazy(() => ResultWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowWithRelationsSchema).array(),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Commments: z.lazy(() => CommentWithRelationsSchema).array(),
  Races: z.lazy(() => RaceWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// COMP PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type CompPartialRelations = {
  Publisher?: UserPartialWithRelations | null;
  Events?: EventPartialWithRelations[];
  Results?: ResultPartialWithRelations[];
  Follows?: FollowPartialWithRelations[];
  Likes?: LikePartialWithRelations[];
  Commments?: CommentPartialWithRelations[];
  Races?: RacePartialWithRelations[];
};

export type CompPartialWithRelations = Omit<z.infer<typeof CompPartialSchema>, "rest"> & {
  rest?: NullableJsonInput;
} & CompPartialRelations

export const CompPartialWithRelationsSchema: z.ZodType<CompPartialWithRelations> = CompPartialSchema.merge(z.object({
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Commments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Races: z.lazy(() => RacePartialWithRelationsSchema).array(),
})).partial()

export type CompWithPartialRelations = Omit<z.infer<typeof CompSchema>, "rest"> & {
  rest?: NullableJsonInput;
} & CompPartialRelations

export const CompWithPartialRelationsSchema: z.ZodType<CompWithPartialRelations> = CompSchema.merge(z.object({
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Commments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Races: z.lazy(() => RacePartialWithRelationsSchema).array(),
}).partial())

export default CompSchema;
