import { z } from 'zod';
import type { EventWithRelations } from './EventSchema'
import type { EventPartialWithRelations } from './EventSchema'
import type { SeriesWithRelations } from './SeriesSchema'
import type { SeriesPartialWithRelations } from './SeriesSchema'
import type { LikeWithRelations } from './LikeSchema'
import type { LikePartialWithRelations } from './LikeSchema'
import type { FollowWithRelations } from './FollowSchema'
import type { FollowPartialWithRelations } from './FollowSchema'
import type { CommentWithRelations } from './CommentSchema'
import type { CommentPartialWithRelations } from './CommentSchema'
import type { AddressWithRelations } from './AddressSchema'
import type { AddressPartialWithRelations } from './AddressSchema'
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import type { ContactWithRelations } from './ContactSchema'
import type { ContactPartialWithRelations } from './ContactSchema'
import { EventWithRelationsSchema } from './EventSchema'
import { EventPartialWithRelationsSchema } from './EventSchema'
import { SeriesWithRelationsSchema } from './SeriesSchema'
import { SeriesPartialWithRelationsSchema } from './SeriesSchema'
import { LikeWithRelationsSchema } from './LikeSchema'
import { LikePartialWithRelationsSchema } from './LikeSchema'
import { FollowWithRelationsSchema } from './FollowSchema'
import { FollowPartialWithRelationsSchema } from './FollowSchema'
import { CommentWithRelationsSchema } from './CommentSchema'
import { CommentPartialWithRelationsSchema } from './CommentSchema'
import { AddressWithRelationsSchema } from './AddressSchema'
import { AddressPartialWithRelationsSchema } from './AddressSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'
import { ContactWithRelationsSchema } from './ContactSchema'
import { ContactPartialWithRelationsSchema } from './ContactSchema'

/////////////////////////////////////////
// VENUE SCHEMA
/////////////////////////////////////////

export const VenueSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  website: z.string().nullish(),
  email: z.string().nullish(),
  phone: z.string().nullish(),
  burgee: z.string().nullish(),
  titleImage: z.string().nullish(),
  publisherId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Venue = z.infer<typeof VenueSchema>

/////////////////////////////////////////
// VENUE PARTIAL SCHEMA
/////////////////////////////////////////

export const VenuePartialSchema = VenueSchema.partial()

export type VenuePartial = z.infer<typeof VenuePartialSchema>

/////////////////////////////////////////
// VENUE RELATION SCHEMA
/////////////////////////////////////////

export type VenueRelations = {
  Events: EventWithRelations[];
  Series: SeriesWithRelations[];
  Likes: LikeWithRelations[];
  Follows: FollowWithRelations[];
  Comments: CommentWithRelations[];
  Addresses: AddressWithRelations[];
  Publisher?: UserWithRelations | null;
  Contacts: ContactWithRelations[];
};

export type VenueWithRelations = z.infer<typeof VenueSchema> & VenueRelations

export const VenueWithRelationsSchema: z.ZodType<VenueWithRelations> = VenueSchema.merge(z.object({
  Events: z.lazy(() => EventWithRelationsSchema).array(),
  Series: z.lazy(() => SeriesWithRelationsSchema).array(),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentWithRelationsSchema).array(),
  Addresses: z.lazy(() => AddressWithRelationsSchema).array(),
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish(),
  Contacts: z.lazy(() => ContactWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// VENUE PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type VenuePartialRelations = {
  Events?: EventPartialWithRelations[];
  Series?: SeriesPartialWithRelations[];
  Likes?: LikePartialWithRelations[];
  Follows?: FollowPartialWithRelations[];
  Comments?: CommentPartialWithRelations[];
  Addresses?: AddressPartialWithRelations[];
  Publisher?: UserPartialWithRelations | null;
  Contacts?: ContactPartialWithRelations[];
};

export type VenuePartialWithRelations = z.infer<typeof VenuePartialSchema> & VenuePartialRelations

export const VenuePartialWithRelationsSchema: z.ZodType<VenuePartialWithRelations> = VenuePartialSchema.merge(z.object({
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Addresses: z.lazy(() => AddressPartialWithRelationsSchema).array(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Contacts: z.lazy(() => ContactPartialWithRelationsSchema).array(),
})).partial()

export type VenueWithPartialRelations = z.infer<typeof VenueSchema> & VenuePartialRelations

export const VenueWithPartialRelationsSchema: z.ZodType<VenueWithPartialRelations> = VenueSchema.merge(z.object({
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Addresses: z.lazy(() => AddressPartialWithRelationsSchema).array(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Contacts: z.lazy(() => ContactPartialWithRelationsSchema).array(),
}).partial())

export default VenueSchema;
