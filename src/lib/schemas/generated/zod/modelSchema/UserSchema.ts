import { z } from 'zod';
import type { SessionWithRelations } from './SessionSchema'
import type { SessionPartialWithRelations } from './SessionSchema'
import type { KeyWithRelations } from './KeySchema'
import type { KeyPartialWithRelations } from './KeySchema'
import type { UserSettingsWithRelations } from './UserSettingsSchema'
import type { UserSettingsPartialWithRelations } from './UserSettingsSchema'
import type { SeriesWithRelations } from './SeriesSchema'
import type { SeriesPartialWithRelations } from './SeriesSchema'
import type { EventWithRelations } from './EventSchema'
import type { EventPartialWithRelations } from './EventSchema'
import type { RaceWithRelations } from './RaceSchema'
import type { RacePartialWithRelations } from './RaceSchema'
import type { CompWithRelations } from './CompSchema'
import type { CompPartialWithRelations } from './CompSchema'
import type { ResultWithRelations } from './ResultSchema'
import type { ResultPartialWithRelations } from './ResultSchema'
import type { OrganizationWithRelations } from './OrganizationSchema'
import type { OrganizationPartialWithRelations } from './OrganizationSchema'
import type { VenueWithRelations } from './VenueSchema'
import type { VenuePartialWithRelations } from './VenueSchema'
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
import { SessionWithRelationsSchema } from './SessionSchema'
import { SessionPartialWithRelationsSchema } from './SessionSchema'
import { KeyWithRelationsSchema } from './KeySchema'
import { KeyPartialWithRelationsSchema } from './KeySchema'
import { UserSettingsWithRelationsSchema } from './UserSettingsSchema'
import { UserSettingsPartialWithRelationsSchema } from './UserSettingsSchema'
import { SeriesWithRelationsSchema } from './SeriesSchema'
import { SeriesPartialWithRelationsSchema } from './SeriesSchema'
import { EventWithRelationsSchema } from './EventSchema'
import { EventPartialWithRelationsSchema } from './EventSchema'
import { RaceWithRelationsSchema } from './RaceSchema'
import { RacePartialWithRelationsSchema } from './RaceSchema'
import { CompWithRelationsSchema } from './CompSchema'
import { CompPartialWithRelationsSchema } from './CompSchema'
import { ResultWithRelationsSchema } from './ResultSchema'
import { ResultPartialWithRelationsSchema } from './ResultSchema'
import { OrganizationWithRelationsSchema } from './OrganizationSchema'
import { OrganizationPartialWithRelationsSchema } from './OrganizationSchema'
import { VenueWithRelationsSchema } from './VenueSchema'
import { VenuePartialWithRelationsSchema } from './VenueSchema'
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
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  firstname: z.string().nullish(),
  lastname: z.string().nullish(),
  email: z.string().nullish(),
  email_verified: z.number().nullish(),
  name: z.string().nullish(),
  avatar: z.string().nullish(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

/////////////////////////////////////////
// USER RELATION SCHEMA
/////////////////////////////////////////

export type UserRelations = {
  auth_session: SessionWithRelations[];
  auth_key: KeyWithRelations[];
  UserSettings?: UserSettingsWithRelations | null;
  Series: SeriesWithRelations[];
  Events: EventWithRelations[];
  Races: RaceWithRelations[];
  Comps: CompWithRelations[];
  Results: ResultWithRelations[];
  Organizations: OrganizationWithRelations[];
  Venues: VenueWithRelations[];
  Follows: FollowWithRelations[];
  Followed: FollowWithRelations[];
  Likes: LikeWithRelations[];
  Liked: LikeWithRelations[];
  Comments: CommentWithRelations[];
  Address: AddressWithRelations[];
  Contact: ContactWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  auth_session: z.lazy(() => SessionWithRelationsSchema).array(),
  auth_key: z.lazy(() => KeyWithRelationsSchema).array(),
  UserSettings: z.lazy(() => UserSettingsWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesWithRelationsSchema).array(),
  Events: z.lazy(() => EventWithRelationsSchema).array(),
  Races: z.lazy(() => RaceWithRelationsSchema).array(),
  Comps: z.lazy(() => CompWithRelationsSchema).array(),
  Results: z.lazy(() => ResultWithRelationsSchema).array(),
  Organizations: z.lazy(() => OrganizationWithRelationsSchema).array(),
  Venues: z.lazy(() => VenueWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowWithRelationsSchema).array(),
  Followed: z.lazy(() => FollowWithRelationsSchema).array(),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Liked: z.lazy(() => LikeWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentWithRelationsSchema).array(),
  Address: z.lazy(() => AddressWithRelationsSchema).array(),
  Contact: z.lazy(() => ContactWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// USER PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type UserPartialRelations = {
  auth_session?: SessionPartialWithRelations[];
  auth_key?: KeyPartialWithRelations[];
  UserSettings?: UserSettingsPartialWithRelations | null;
  Series?: SeriesPartialWithRelations[];
  Events?: EventPartialWithRelations[];
  Races?: RacePartialWithRelations[];
  Comps?: CompPartialWithRelations[];
  Results?: ResultPartialWithRelations[];
  Organizations?: OrganizationPartialWithRelations[];
  Venues?: VenuePartialWithRelations[];
  Follows?: FollowPartialWithRelations[];
  Followed?: FollowPartialWithRelations[];
  Likes?: LikePartialWithRelations[];
  Liked?: LikePartialWithRelations[];
  Comments?: CommentPartialWithRelations[];
  Address?: AddressPartialWithRelations[];
  Contact?: ContactPartialWithRelations[];
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  auth_session: z.lazy(() => SessionPartialWithRelationsSchema).array(),
  auth_key: z.lazy(() => KeyPartialWithRelationsSchema).array(),
  UserSettings: z.lazy(() => UserSettingsPartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).array(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Races: z.lazy(() => RacePartialWithRelationsSchema).array(),
  Comps: z.lazy(() => CompPartialWithRelationsSchema).array(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Organizations: z.lazy(() => OrganizationPartialWithRelationsSchema).array(),
  Venues: z.lazy(() => VenuePartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Followed: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Liked: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Address: z.lazy(() => AddressPartialWithRelationsSchema).array(),
  Contact: z.lazy(() => ContactPartialWithRelationsSchema).array(),
})).partial()

export type UserWithPartialRelations = z.infer<typeof UserSchema> & UserPartialRelations

export const UserWithPartialRelationsSchema: z.ZodType<UserWithPartialRelations> = UserSchema.merge(z.object({
  auth_session: z.lazy(() => SessionPartialWithRelationsSchema).array(),
  auth_key: z.lazy(() => KeyPartialWithRelationsSchema).array(),
  UserSettings: z.lazy(() => UserSettingsPartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).array(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Races: z.lazy(() => RacePartialWithRelationsSchema).array(),
  Comps: z.lazy(() => CompPartialWithRelationsSchema).array(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Organizations: z.lazy(() => OrganizationPartialWithRelationsSchema).array(),
  Venues: z.lazy(() => VenuePartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Followed: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Liked: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Address: z.lazy(() => AddressPartialWithRelationsSchema).array(),
  Contact: z.lazy(() => ContactPartialWithRelationsSchema).array(),
}).partial())

export default UserSchema;
