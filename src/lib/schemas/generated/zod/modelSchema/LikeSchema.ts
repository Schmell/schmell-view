import { z } from 'zod';
import type { CompWithRelations } from './CompSchema'
import type { CompPartialWithRelations } from './CompSchema'
import type { EventWithRelations } from './EventSchema'
import type { EventPartialWithRelations } from './EventSchema'
import type { OrganizationWithRelations } from './OrganizationSchema'
import type { OrganizationPartialWithRelations } from './OrganizationSchema'
import type { RaceWithRelations } from './RaceSchema'
import type { RacePartialWithRelations } from './RaceSchema'
import type { SeriesWithRelations } from './SeriesSchema'
import type { SeriesPartialWithRelations } from './SeriesSchema'
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import type { CommentWithRelations } from './CommentSchema'
import type { CommentPartialWithRelations } from './CommentSchema'
import type { VenueWithRelations } from './VenueSchema'
import type { VenuePartialWithRelations } from './VenueSchema'
import { CompWithRelationsSchema } from './CompSchema'
import { CompPartialWithRelationsSchema } from './CompSchema'
import { EventWithRelationsSchema } from './EventSchema'
import { EventPartialWithRelationsSchema } from './EventSchema'
import { OrganizationWithRelationsSchema } from './OrganizationSchema'
import { OrganizationPartialWithRelationsSchema } from './OrganizationSchema'
import { RaceWithRelationsSchema } from './RaceSchema'
import { RacePartialWithRelationsSchema } from './RaceSchema'
import { SeriesWithRelationsSchema } from './SeriesSchema'
import { SeriesPartialWithRelationsSchema } from './SeriesSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'
import { CommentWithRelationsSchema } from './CommentSchema'
import { CommentPartialWithRelationsSchema } from './CommentSchema'
import { VenueWithRelationsSchema } from './VenueSchema'
import { VenuePartialWithRelationsSchema } from './VenueSchema'

/////////////////////////////////////////
// LIKE SCHEMA
/////////////////////////////////////////

export const LikeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  itemId: z.string().nullish(),
  seriesId: z.string().nullish(),
  eventId: z.string().nullish(),
  organizationId: z.string().nullish(),
  raceId: z.string().nullish(),
  compId: z.string().nullish(),
  updatedAt: z.date(),
  createdAt: z.date(),
  eventCommentId: z.string().nullish(),
  commentId: z.string().nullish(),
  venueId: z.string().nullish(),
})

export type Like = z.infer<typeof LikeSchema>

/////////////////////////////////////////
// LIKE PARTIAL SCHEMA
/////////////////////////////////////////

export const LikePartialSchema = LikeSchema.partial()

export type LikePartial = z.infer<typeof LikePartialSchema>

/////////////////////////////////////////
// LIKE RELATION SCHEMA
/////////////////////////////////////////

export type LikeRelations = {
  Comp?: CompWithRelations | null;
  Event?: EventWithRelations | null;
  Organization?: OrganizationWithRelations | null;
  Race?: RaceWithRelations | null;
  Series?: SeriesWithRelations | null;
  User: UserWithRelations;
  Comment?: CommentWithRelations | null;
  Venue?: VenueWithRelations | null;
};

export type LikeWithRelations = z.infer<typeof LikeSchema> & LikeRelations

export const LikeWithRelationsSchema: z.ZodType<LikeWithRelations> = LikeSchema.merge(z.object({
  Comp: z.lazy(() => CompWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish(),
  Race: z.lazy(() => RaceWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesWithRelationsSchema).nullish(),
  User: z.lazy(() => UserWithRelationsSchema),
  Comment: z.lazy(() => CommentWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenueWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// LIKE PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type LikePartialRelations = {
  Comp?: CompPartialWithRelations | null;
  Event?: EventPartialWithRelations | null;
  Organization?: OrganizationPartialWithRelations | null;
  Race?: RacePartialWithRelations | null;
  Series?: SeriesPartialWithRelations | null;
  User?: UserPartialWithRelations;
  Comment?: CommentPartialWithRelations | null;
  Venue?: VenuePartialWithRelations | null;
};

export type LikePartialWithRelations = z.infer<typeof LikePartialSchema> & LikePartialRelations

export const LikePartialWithRelationsSchema: z.ZodType<LikePartialWithRelations> = LikePartialSchema.merge(z.object({
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema),
  Comment: z.lazy(() => CommentPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
})).partial()

export type LikeWithPartialRelations = z.infer<typeof LikeSchema> & LikePartialRelations

export const LikeWithPartialRelationsSchema: z.ZodType<LikeWithPartialRelations> = LikeSchema.merge(z.object({
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema),
  Comment: z.lazy(() => CommentPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
}).partial())

export default LikeSchema;
