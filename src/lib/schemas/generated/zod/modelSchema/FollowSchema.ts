import { z } from 'zod';
import type { CommentWithRelations } from './CommentSchema'
import type { CommentPartialWithRelations } from './CommentSchema'
import type { CompWithRelations } from './CompSchema'
import type { CompPartialWithRelations } from './CompSchema'
import type { EventWithRelations } from './EventSchema'
import type { EventPartialWithRelations } from './EventSchema'
import type { OrganizationWithRelations } from './OrganizationSchema'
import type { OrganizationPartialWithRelations } from './OrganizationSchema'
import type { VenueWithRelations } from './VenueSchema'
import type { VenuePartialWithRelations } from './VenueSchema'
import type { RaceWithRelations } from './RaceSchema'
import type { RacePartialWithRelations } from './RaceSchema'
import type { SeriesWithRelations } from './SeriesSchema'
import type { SeriesPartialWithRelations } from './SeriesSchema'
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import { CommentWithRelationsSchema } from './CommentSchema'
import { CommentPartialWithRelationsSchema } from './CommentSchema'
import { CompWithRelationsSchema } from './CompSchema'
import { CompPartialWithRelationsSchema } from './CompSchema'
import { EventWithRelationsSchema } from './EventSchema'
import { EventPartialWithRelationsSchema } from './EventSchema'
import { OrganizationWithRelationsSchema } from './OrganizationSchema'
import { OrganizationPartialWithRelationsSchema } from './OrganizationSchema'
import { VenueWithRelationsSchema } from './VenueSchema'
import { VenuePartialWithRelationsSchema } from './VenueSchema'
import { RaceWithRelationsSchema } from './RaceSchema'
import { RacePartialWithRelationsSchema } from './RaceSchema'
import { SeriesWithRelationsSchema } from './SeriesSchema'
import { SeriesPartialWithRelationsSchema } from './SeriesSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'

/////////////////////////////////////////
// FOLLOW SCHEMA
/////////////////////////////////////////

export const FollowSchema = z.object({
  id: z.string(),
  type: z.string(),
  itemId: z.string().nullish(),
  userId: z.string(),
  commentId: z.string().nullish(),
  compId: z.string().nullish(),
  eventId: z.string().nullish(),
  organizationId: z.string().nullish(),
  venueId: z.string().nullish(),
  raceId: z.string().nullish(),
  seriesId: z.string().nullish(),
  updatedAt: z.date(),
  createdAt: z.date(),
})

export type Follow = z.infer<typeof FollowSchema>

/////////////////////////////////////////
// FOLLOW PARTIAL SCHEMA
/////////////////////////////////////////

export const FollowPartialSchema = FollowSchema.partial()

export type FollowPartial = z.infer<typeof FollowPartialSchema>

/////////////////////////////////////////
// FOLLOW RELATION SCHEMA
/////////////////////////////////////////

export type FollowRelations = {
  Comment?: CommentWithRelations | null;
  Comp?: CompWithRelations | null;
  Event?: EventWithRelations | null;
  Organization?: OrganizationWithRelations | null;
  Venue?: VenueWithRelations | null;
  Race?: RaceWithRelations | null;
  Series?: SeriesWithRelations | null;
  User: UserWithRelations;
};

export type FollowWithRelations = z.infer<typeof FollowSchema> & FollowRelations

export const FollowWithRelationsSchema: z.ZodType<FollowWithRelations> = FollowSchema.merge(z.object({
  Comment: z.lazy(() => CommentWithRelationsSchema).nullish(),
  Comp: z.lazy(() => CompWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenueWithRelationsSchema).nullish(),
  Race: z.lazy(() => RaceWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesWithRelationsSchema).nullish(),
  User: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// FOLLOW PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type FollowPartialRelations = {
  Comment?: CommentPartialWithRelations | null;
  Comp?: CompPartialWithRelations | null;
  Event?: EventPartialWithRelations | null;
  Organization?: OrganizationPartialWithRelations | null;
  Venue?: VenuePartialWithRelations | null;
  Race?: RacePartialWithRelations | null;
  Series?: SeriesPartialWithRelations | null;
  User?: UserPartialWithRelations;
};

export type FollowPartialWithRelations = z.infer<typeof FollowPartialSchema> & FollowPartialRelations

export const FollowPartialWithRelationsSchema: z.ZodType<FollowPartialWithRelations> = FollowPartialSchema.merge(z.object({
  Comment: z.lazy(() => CommentPartialWithRelationsSchema).nullish(),
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type FollowWithPartialRelations = z.infer<typeof FollowSchema> & FollowPartialRelations

export const FollowWithPartialRelationsSchema: z.ZodType<FollowWithPartialRelations> = FollowSchema.merge(z.object({
  Comment: z.lazy(() => CommentPartialWithRelationsSchema).nullish(),
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

export default FollowSchema;
