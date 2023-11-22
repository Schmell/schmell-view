import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import type { JsonValueType } from '../inputTypeSchemas/JsonValueSchema';
import type { OrganizationWithRelations } from './OrganizationSchema'
import type { OrganizationPartialWithRelations } from './OrganizationSchema'
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import type { SeriesWithRelations } from './SeriesSchema'
import type { SeriesPartialWithRelations } from './SeriesSchema'
import type { VenueWithRelations } from './VenueSchema'
import type { VenuePartialWithRelations } from './VenueSchema'
import type { RaceWithRelations } from './RaceSchema'
import type { RacePartialWithRelations } from './RaceSchema'
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
import { OrganizationWithRelationsSchema } from './OrganizationSchema'
import { OrganizationPartialWithRelationsSchema } from './OrganizationSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'
import { SeriesWithRelationsSchema } from './SeriesSchema'
import { SeriesPartialWithRelationsSchema } from './SeriesSchema'
import { VenueWithRelationsSchema } from './VenueSchema'
import { VenuePartialWithRelationsSchema } from './VenueSchema'
import { RaceWithRelationsSchema } from './RaceSchema'
import { RacePartialWithRelationsSchema } from './RaceSchema'
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
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  id: z.string(),
  eventeid: z.string().nullish(),
  uniqueIdString: z.string(),
  name: z.string(),
  eventwebsite: z.string().nullish(),
  venueName: z.string().nullish(),
  description: z.string().nullish(),
  titleImage: z.string().nullish(),
  public: z.boolean(),
  complete: z.boolean(),
  /**
   * [fileInfo]
   */
  fileInfo: JsonValueSchema,
  /**
   * [resultColumns]
   */
  resultColumns: JsonValueSchema,
  /**
   * [eventRest]
   */
  rest: JsonValueSchema,
  email: z.string().nullish(),
  organizationId: z.string().nullish(),
  publisherId: z.string().nullish(),
  seriesId: z.string().nullish(),
  venueId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// EVENT PARTIAL SCHEMA
/////////////////////////////////////////

export const EventPartialSchema = EventSchema.partial()

export type EventPartial = z.infer<typeof EventPartialSchema>

/////////////////////////////////////////
// EVENT RELATION SCHEMA
/////////////////////////////////////////

export type EventRelations = {
  Organization?: OrganizationWithRelations | null;
  Publisher?: UserWithRelations | null;
  Series?: SeriesWithRelations | null;
  Venue?: VenueWithRelations | null;
  Races: RaceWithRelations[];
  Results: ResultWithRelations[];
  Follows: FollowWithRelations[];
  Likes: LikeWithRelations[];
  Comps: CompWithRelations[];
  Comments: CommentWithRelations[];
};

export type EventWithRelations = Omit<z.infer<typeof EventSchema>, "fileInfo" | "resultColumns" | "rest"> & {
  fileInfo?: JsonValueType | null;
  resultColumns?: JsonValueType | null;
  rest?: JsonValueType | null;
} & EventRelations

export const EventWithRelationsSchema: z.ZodType<EventWithRelations> = EventSchema.merge(z.object({
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenueWithRelationsSchema).nullish(),
  Races: z.lazy(() => RaceWithRelationsSchema).array(),
  Results: z.lazy(() => ResultWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowWithRelationsSchema).array(),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Comps: z.lazy(() => CompWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// EVENT PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type EventPartialRelations = {
  Organization?: OrganizationPartialWithRelations | null;
  Publisher?: UserPartialWithRelations | null;
  Series?: SeriesPartialWithRelations | null;
  Venue?: VenuePartialWithRelations | null;
  Races?: RacePartialWithRelations[];
  Results?: ResultPartialWithRelations[];
  Follows?: FollowPartialWithRelations[];
  Likes?: LikePartialWithRelations[];
  Comps?: CompPartialWithRelations[];
  Comments?: CommentPartialWithRelations[];
};

export type EventPartialWithRelations = Omit<z.infer<typeof EventPartialSchema>, "fileInfo" | "resultColumns" | "rest"> & {
  fileInfo?: JsonValueType | null;
  resultColumns?: JsonValueType | null;
  rest?: JsonValueType | null;
} & EventPartialRelations

export const EventPartialWithRelationsSchema: z.ZodType<EventPartialWithRelations> = EventPartialSchema.merge(z.object({
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Races: z.lazy(() => RacePartialWithRelationsSchema).array(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comps: z.lazy(() => CompPartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
})).partial()

export type EventWithPartialRelations = Omit<z.infer<typeof EventSchema>, "fileInfo" | "resultColumns" | "rest"> & {
  fileInfo?: JsonValueType | null;
  resultColumns?: JsonValueType | null;
  rest?: JsonValueType | null;
} & EventPartialRelations

export const EventWithPartialRelationsSchema: z.ZodType<EventWithPartialRelations> = EventSchema.merge(z.object({
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Races: z.lazy(() => RacePartialWithRelationsSchema).array(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comps: z.lazy(() => CompPartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
}).partial())

export default EventSchema;
