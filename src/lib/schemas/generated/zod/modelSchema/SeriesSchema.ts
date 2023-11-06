import { z } from 'zod';
import type { OrganizationWithRelations } from './OrganizationSchema'
import type { OrganizationPartialWithRelations } from './OrganizationSchema'
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import type { EventWithRelations } from './EventSchema'
import type { EventPartialWithRelations } from './EventSchema'
import type { FollowWithRelations } from './FollowSchema'
import type { FollowPartialWithRelations } from './FollowSchema'
import type { LikeWithRelations } from './LikeSchema'
import type { LikePartialWithRelations } from './LikeSchema'
import type { CommentWithRelations } from './CommentSchema'
import type { CommentPartialWithRelations } from './CommentSchema'
import type { VenueWithRelations } from './VenueSchema'
import type { VenuePartialWithRelations } from './VenueSchema'
import { OrganizationWithRelationsSchema } from './OrganizationSchema'
import { OrganizationPartialWithRelationsSchema } from './OrganizationSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'
import { EventWithRelationsSchema } from './EventSchema'
import { EventPartialWithRelationsSchema } from './EventSchema'
import { FollowWithRelationsSchema } from './FollowSchema'
import { FollowPartialWithRelationsSchema } from './FollowSchema'
import { LikeWithRelationsSchema } from './LikeSchema'
import { LikePartialWithRelationsSchema } from './LikeSchema'
import { CommentWithRelationsSchema } from './CommentSchema'
import { CommentPartialWithRelationsSchema } from './CommentSchema'
import { VenueWithRelationsSchema } from './VenueSchema'
import { VenuePartialWithRelationsSchema } from './VenueSchema'

/////////////////////////////////////////
// SERIES SCHEMA
/////////////////////////////////////////

export const SeriesSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  logo: z.string().nullish(),
  titleImage: z.string().nullish(),
  organizationId: z.string().nullish(),
  publisherId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Series = z.infer<typeof SeriesSchema>

/////////////////////////////////////////
// SERIES PARTIAL SCHEMA
/////////////////////////////////////////

export const SeriesPartialSchema = SeriesSchema.partial()

export type SeriesPartial = z.infer<typeof SeriesPartialSchema>

/////////////////////////////////////////
// SERIES RELATION SCHEMA
/////////////////////////////////////////

export type SeriesRelations = {
  Organization?: OrganizationWithRelations | null;
  Publisher?: UserWithRelations | null;
  Events: EventWithRelations[];
  Follows: FollowWithRelations[];
  Likes: LikeWithRelations[];
  Comments: CommentWithRelations[];
  Venues: VenueWithRelations[];
};

export type SeriesWithRelations = z.infer<typeof SeriesSchema> & SeriesRelations

export const SeriesWithRelationsSchema: z.ZodType<SeriesWithRelations> = SeriesSchema.merge(z.object({
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowWithRelationsSchema).array(),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentWithRelationsSchema).array(),
  Venues: z.lazy(() => VenueWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// SERIES PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type SeriesPartialRelations = {
  Organization?: OrganizationPartialWithRelations | null;
  Publisher?: UserPartialWithRelations | null;
  Events?: EventPartialWithRelations[];
  Follows?: FollowPartialWithRelations[];
  Likes?: LikePartialWithRelations[];
  Comments?: CommentPartialWithRelations[];
  Venues?: VenuePartialWithRelations[];
};

export type SeriesPartialWithRelations = z.infer<typeof SeriesPartialSchema> & SeriesPartialRelations

export const SeriesPartialWithRelationsSchema: z.ZodType<SeriesPartialWithRelations> = SeriesPartialSchema.merge(z.object({
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Venues: z.lazy(() => VenuePartialWithRelationsSchema).array(),
})).partial()

export type SeriesWithPartialRelations = z.infer<typeof SeriesSchema> & SeriesPartialRelations

export const SeriesWithPartialRelationsSchema: z.ZodType<SeriesWithPartialRelations> = SeriesSchema.merge(z.object({
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Venues: z.lazy(() => VenuePartialWithRelationsSchema).array(),
}).partial())

export default SeriesSchema;
