import { z } from 'zod';
import type { EventWithRelations } from './EventSchema'
import type { EventPartialWithRelations } from './EventSchema'
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import type { LikeWithRelations } from './LikeSchema'
import type { LikePartialWithRelations } from './LikeSchema'
import type { RaceWithRelations } from './RaceSchema'
import type { RacePartialWithRelations } from './RaceSchema'
import type { SeriesWithRelations } from './SeriesSchema'
import type { SeriesPartialWithRelations } from './SeriesSchema'
import type { OrganizationWithRelations } from './OrganizationSchema'
import type { OrganizationPartialWithRelations } from './OrganizationSchema'
import type { VenueWithRelations } from './VenueSchema'
import type { VenuePartialWithRelations } from './VenueSchema'
import type { CompWithRelations } from './CompSchema'
import type { CompPartialWithRelations } from './CompSchema'
import type { FollowWithRelations } from './FollowSchema'
import type { FollowPartialWithRelations } from './FollowSchema'
import { EventWithRelationsSchema } from './EventSchema'
import { EventPartialWithRelationsSchema } from './EventSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'
import { LikeWithRelationsSchema } from './LikeSchema'
import { LikePartialWithRelationsSchema } from './LikeSchema'
import { RaceWithRelationsSchema } from './RaceSchema'
import { RacePartialWithRelationsSchema } from './RaceSchema'
import { SeriesWithRelationsSchema } from './SeriesSchema'
import { SeriesPartialWithRelationsSchema } from './SeriesSchema'
import { OrganizationWithRelationsSchema } from './OrganizationSchema'
import { OrganizationPartialWithRelationsSchema } from './OrganizationSchema'
import { VenueWithRelationsSchema } from './VenueSchema'
import { VenuePartialWithRelationsSchema } from './VenueSchema'
import { CompWithRelationsSchema } from './CompSchema'
import { CompPartialWithRelationsSchema } from './CompSchema'
import { FollowWithRelationsSchema } from './FollowSchema'
import { FollowPartialWithRelationsSchema } from './FollowSchema'

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string(),
  type: z.string().nullish(),
  ref: z.string().nullish(),
  comment: z.string(),
  eventId: z.string().nullish(),
  userId: z.string(),
  raceId: z.string().nullish(),
  seriesId: z.string().nullish(),
  organizationId: z.string().nullish(),
  venueId: z.string().nullish(),
  compId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// COMMENT PARTIAL SCHEMA
/////////////////////////////////////////

export const CommentPartialSchema = CommentSchema.partial()

export type CommentPartial = z.infer<typeof CommentPartialSchema>

/////////////////////////////////////////
// COMMENT RELATION SCHEMA
/////////////////////////////////////////

export type CommentRelations = {
  Event?: EventWithRelations | null;
  User: UserWithRelations;
  Likes: LikeWithRelations[];
  Race?: RaceWithRelations | null;
  Series?: SeriesWithRelations | null;
  Organization?: OrganizationWithRelations | null;
  Venue?: VenueWithRelations | null;
  Comp?: CompWithRelations | null;
  Follow: FollowWithRelations[];
};

export type CommentWithRelations = z.infer<typeof CommentSchema> & CommentRelations

export const CommentWithRelationsSchema: z.ZodType<CommentWithRelations> = CommentSchema.merge(z.object({
  Event: z.lazy(() => EventWithRelationsSchema).nullish(),
  User: z.lazy(() => UserWithRelationsSchema),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Race: z.lazy(() => RaceWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenueWithRelationsSchema).nullish(),
  Comp: z.lazy(() => CompWithRelationsSchema).nullish(),
  Follow: z.lazy(() => FollowWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// COMMENT PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type CommentPartialRelations = {
  Event?: EventPartialWithRelations | null;
  User?: UserPartialWithRelations;
  Likes?: LikePartialWithRelations[];
  Race?: RacePartialWithRelations | null;
  Series?: SeriesPartialWithRelations | null;
  Organization?: OrganizationPartialWithRelations | null;
  Venue?: VenuePartialWithRelations | null;
  Comp?: CompPartialWithRelations | null;
  Follow?: FollowPartialWithRelations[];
};

export type CommentPartialWithRelations = z.infer<typeof CommentPartialSchema> & CommentPartialRelations

export const CommentPartialWithRelationsSchema: z.ZodType<CommentPartialWithRelations> = CommentPartialSchema.merge(z.object({
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Follow: z.lazy(() => FollowPartialWithRelationsSchema).array(),
})).partial()

export type CommentWithPartialRelations = z.infer<typeof CommentSchema> & CommentPartialRelations

export const CommentWithPartialRelationsSchema: z.ZodType<CommentWithPartialRelations> = CommentSchema.merge(z.object({
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Follow: z.lazy(() => FollowPartialWithRelationsSchema).array(),
}).partial())

export default CommentSchema;
