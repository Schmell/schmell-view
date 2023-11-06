import { z } from 'zod';
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import type { EventWithRelations } from './EventSchema'
import type { EventPartialWithRelations } from './EventSchema'
import type { SeriesWithRelations } from './SeriesSchema'
import type { SeriesPartialWithRelations } from './SeriesSchema'
import type { FollowWithRelations } from './FollowSchema'
import type { FollowPartialWithRelations } from './FollowSchema'
import type { LikeWithRelations } from './LikeSchema'
import type { LikePartialWithRelations } from './LikeSchema'
import type { CommentWithRelations } from './CommentSchema'
import type { CommentPartialWithRelations } from './CommentSchema'
import type { AddressWithRelations } from './AddressSchema'
import type { AddressPartialWithRelations } from './AddressSchema'
import type { ContactWithRelations } from './ContactSchema'
import type { ContactPartialWithRelations } from './ContactSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'
import { EventWithRelationsSchema } from './EventSchema'
import { EventPartialWithRelationsSchema } from './EventSchema'
import { SeriesWithRelationsSchema } from './SeriesSchema'
import { SeriesPartialWithRelationsSchema } from './SeriesSchema'
import { FollowWithRelationsSchema } from './FollowSchema'
import { FollowPartialWithRelationsSchema } from './FollowSchema'
import { LikeWithRelationsSchema } from './LikeSchema'
import { LikePartialWithRelationsSchema } from './LikeSchema'
import { CommentWithRelationsSchema } from './CommentSchema'
import { CommentPartialWithRelationsSchema } from './CommentSchema'
import { AddressWithRelationsSchema } from './AddressSchema'
import { AddressPartialWithRelationsSchema } from './AddressSchema'
import { ContactWithRelationsSchema } from './ContactSchema'
import { ContactPartialWithRelationsSchema } from './ContactSchema'

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  tag: z.string().nullish(),
  website: z.string().nullish(),
  email: z.string().nullish(),
  /**
   * .url
   */
  logo: z.string().nullish(),
  titleImage: z.string().nullish(),
  ownerId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Organization = z.infer<typeof OrganizationSchema>

/////////////////////////////////////////
// ORGANIZATION PARTIAL SCHEMA
/////////////////////////////////////////

export const OrganizationPartialSchema = OrganizationSchema.partial()

export type OrganizationPartial = z.infer<typeof OrganizationPartialSchema>

/////////////////////////////////////////
// ORGANIZATION RELATION SCHEMA
/////////////////////////////////////////

export type OrganizationRelations = {
  Owner?: UserWithRelations | null;
  Events: EventWithRelations[];
  Series: SeriesWithRelations[];
  Follows: FollowWithRelations[];
  Likes: LikeWithRelations[];
  Comments: CommentWithRelations[];
  Addresses: AddressWithRelations[];
  Contact: ContactWithRelations[];
};

export type OrganizationWithRelations = z.infer<typeof OrganizationSchema> & OrganizationRelations

export const OrganizationWithRelationsSchema: z.ZodType<OrganizationWithRelations> = OrganizationSchema.merge(z.object({
  Owner: z.lazy(() => UserWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventWithRelationsSchema).array(),
  Series: z.lazy(() => SeriesWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowWithRelationsSchema).array(),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentWithRelationsSchema).array(),
  Addresses: z.lazy(() => AddressWithRelationsSchema).array(),
  Contact: z.lazy(() => ContactWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ORGANIZATION PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type OrganizationPartialRelations = {
  Owner?: UserPartialWithRelations | null;
  Events?: EventPartialWithRelations[];
  Series?: SeriesPartialWithRelations[];
  Follows?: FollowPartialWithRelations[];
  Likes?: LikePartialWithRelations[];
  Comments?: CommentPartialWithRelations[];
  Addresses?: AddressPartialWithRelations[];
  Contact?: ContactPartialWithRelations[];
};

export type OrganizationPartialWithRelations = z.infer<typeof OrganizationPartialSchema> & OrganizationPartialRelations

export const OrganizationPartialWithRelationsSchema: z.ZodType<OrganizationPartialWithRelations> = OrganizationPartialSchema.merge(z.object({
  Owner: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Addresses: z.lazy(() => AddressPartialWithRelationsSchema).array(),
  Contact: z.lazy(() => ContactPartialWithRelationsSchema).array(),
})).partial()

export type OrganizationWithPartialRelations = z.infer<typeof OrganizationSchema> & OrganizationPartialRelations

export const OrganizationWithPartialRelationsSchema: z.ZodType<OrganizationWithPartialRelations> = OrganizationSchema.merge(z.object({
  Owner: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Addresses: z.lazy(() => AddressPartialWithRelationsSchema).array(),
  Contact: z.lazy(() => ContactPartialWithRelationsSchema).array(),
}).partial())

export default OrganizationSchema;
