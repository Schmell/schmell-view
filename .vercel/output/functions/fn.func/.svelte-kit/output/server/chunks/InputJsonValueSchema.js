import { z } from "zod";
import { Prisma } from "@prisma/client";
const SessionSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  active_expires: z.bigint(),
  idle_expires: z.bigint()
});
const SessionPartialSchema = SessionSchema.partial();
const SessionWithRelationsSchema = SessionSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema)
}));
const SessionPartialWithRelationsSchema = SessionPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema)
})).partial();
SessionSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema)
}).partial());
const KeySchema = z.object({
  id: z.string(),
  hashed_password: z.string().nullish(),
  user_id: z.string()
});
const KeyPartialSchema = KeySchema.partial();
const KeyWithRelationsSchema = KeySchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema)
}));
const KeyPartialWithRelationsSchema = KeyPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema)
})).partial();
KeySchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema)
}).partial());
const UserSettingsSchema = z.object({
  id: z.string(),
  theme: z.string().nullish(),
  language: z.string().nullish(),
  userId: z.string().nullish()
});
const UserSettingsPartialSchema = UserSettingsSchema.partial();
const UserSettingsWithRelationsSchema = UserSettingsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).nullish()
}));
const UserSettingsPartialWithRelationsSchema = UserSettingsPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish()
})).partial();
UserSettingsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish()
}).partial());
const JsonValueSchema = z.lazy(
  () => z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema))
  ])
);
const CommentSchema = z.object({
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
  updatedAt: z.date().nullish()
});
const CommentPartialSchema = CommentSchema.partial();
const CommentWithRelationsSchema = CommentSchema.merge(z.object({
  Event: z.lazy(() => EventWithRelationsSchema).nullish(),
  User: z.lazy(() => UserWithRelationsSchema),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Race: z.lazy(() => RaceWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenueWithRelationsSchema).nullish(),
  Comp: z.lazy(() => CompWithRelationsSchema).nullish(),
  Follow: z.lazy(() => FollowWithRelationsSchema).array()
}));
const CommentPartialWithRelationsSchema = CommentPartialSchema.merge(z.object({
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Follow: z.lazy(() => FollowPartialWithRelationsSchema).array()
})).partial();
CommentSchema.merge(z.object({
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Follow: z.lazy(() => FollowPartialWithRelationsSchema).array()
}).partial());
const FollowSchema = z.object({
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
  createdAt: z.date()
});
const FollowPartialSchema = FollowSchema.partial();
const FollowWithRelationsSchema = FollowSchema.merge(z.object({
  Comment: z.lazy(() => CommentWithRelationsSchema).nullish(),
  Comp: z.lazy(() => CompWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenueWithRelationsSchema).nullish(),
  Race: z.lazy(() => RaceWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesWithRelationsSchema).nullish(),
  User: z.lazy(() => UserWithRelationsSchema)
}));
const FollowPartialWithRelationsSchema = FollowPartialSchema.merge(z.object({
  Comment: z.lazy(() => CommentPartialWithRelationsSchema).nullish(),
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema)
})).partial();
FollowSchema.merge(z.object({
  Comment: z.lazy(() => CommentPartialWithRelationsSchema).nullish(),
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema)
}).partial());
const RaceSchema = z.object({
  id: z.string(),
  raceId: z.string().nullish(),
  uniqueRaceString: z.string(),
  name: z.string().nullish(),
  starts: JsonValueSchema,
  rank: z.number().nullish(),
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
  updatedAt: z.date().nullish()
});
const RacePartialSchema = RaceSchema.partial();
const RaceWithRelationsSchema = RaceSchema.merge(z.object({
  Event: z.lazy(() => EventWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish(),
  Results: z.lazy(() => ResultWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowWithRelationsSchema).array(),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Comps: z.lazy(() => CompWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentWithRelationsSchema).array()
}));
const RacePartialWithRelationsSchema = RacePartialSchema.merge(z.object({
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comps: z.lazy(() => CompPartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array()
})).partial();
RaceSchema.merge(z.object({
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comps: z.lazy(() => CompPartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array()
}).partial());
const ResultSchema = z.object({
  id: z.string(),
  resultId: z.string(),
  points: z.string().nullish(),
  position: z.string().nullish(),
  discard: z.string().nullish(),
  resultType: z.string().nullish(),
  code: z.string().nullish(),
  start: z.string().nullish(),
  finish: z.string().nullish(),
  corrected: z.string().nullish(),
  elasped: z.string().nullish(),
  elapsedWin: z.string().nullish(),
  ratingWin: z.string().nullish(),
  raceRating: z.string().nullish(),
  supposedRating: z.string().nullish(),
  fleet: z.string().nullish(),
  rrset: z.string().nullish(),
  publisherId: z.string(),
  eventId: z.string().nullish(),
  compId: z.string().nullish(),
  raceId: z.string().nullish(),
  raceCompId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish()
});
const ResultPartialSchema = ResultSchema.partial();
const ResultWithRelationsSchema = ResultSchema.merge(z.object({
  Comp: z.lazy(() => CompWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish(),
  Race: z.lazy(() => RaceWithRelationsSchema).nullish()
}));
const ResultPartialWithRelationsSchema = ResultPartialSchema.merge(z.object({
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish()
})).partial();
ResultSchema.merge(z.object({
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish()
}).partial());
const UserCompSchema = z.object({
  id: z.string(),
  role: z.string(),
  compId: z.string()
});
const UserCompPartialSchema = UserCompSchema.partial();
const UserCompWithRelationsSchema = UserCompSchema.merge(z.object({
  Comp: z.lazy(() => CompWithRelationsSchema)
}));
const UserCompPartialWithRelationsSchema = UserCompPartialSchema.merge(z.object({
  Comp: z.lazy(() => CompPartialWithRelationsSchema)
})).partial();
UserCompSchema.merge(z.object({
  Comp: z.lazy(() => CompPartialWithRelationsSchema)
}).partial());
const CompSchema = z.object({
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
  rest: JsonValueSchema,
  image: z.string().nullish(),
  publisherId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish()
});
const CompPartialSchema = CompSchema.partial();
const CompWithRelationsSchema = CompSchema.merge(z.object({
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventWithRelationsSchema).array(),
  Results: z.lazy(() => ResultWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowWithRelationsSchema).array(),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Commments: z.lazy(() => CommentWithRelationsSchema).array(),
  Races: z.lazy(() => RaceWithRelationsSchema).array(),
  UserComps: z.lazy(() => UserCompWithRelationsSchema).array()
}));
const CompPartialWithRelationsSchema = CompPartialSchema.merge(z.object({
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Commments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Races: z.lazy(() => RacePartialWithRelationsSchema).array(),
  UserComps: z.lazy(() => UserCompPartialWithRelationsSchema).array()
})).partial();
CompSchema.merge(z.object({
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Commments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Races: z.lazy(() => RacePartialWithRelationsSchema).array(),
  UserComps: z.lazy(() => UserCompPartialWithRelationsSchema).array()
}).partial());
const LikeSchema = z.object({
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
  venueId: z.string().nullish()
});
const LikePartialSchema = LikeSchema.partial();
const LikeWithRelationsSchema = LikeSchema.merge(z.object({
  Comp: z.lazy(() => CompWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish(),
  Race: z.lazy(() => RaceWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesWithRelationsSchema).nullish(),
  User: z.lazy(() => UserWithRelationsSchema),
  Comment: z.lazy(() => CommentWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenueWithRelationsSchema).nullish()
}));
const LikePartialWithRelationsSchema = LikePartialSchema.merge(z.object({
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema),
  Comment: z.lazy(() => CommentPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish()
})).partial();
LikeSchema.merge(z.object({
  Comp: z.lazy(() => CompPartialWithRelationsSchema).nullish(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema),
  Comment: z.lazy(() => CommentPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish()
}).partial());
const ContactSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.string().nullish(),
  email: z.string().nullish(),
  phone: z.string().nullish(),
  addressId: z.string().nullish(),
  userId: z.string().nullish(),
  venueId: z.string().nullish(),
  organizationId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish()
});
const ContactPartialSchema = ContactSchema.partial();
const ContactWithRelationsSchema = ContactSchema.merge(z.object({
  Address: z.lazy(() => AddressWithRelationsSchema).nullish(),
  User: z.lazy(() => UserWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenueWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish()
}));
const ContactPartialWithRelationsSchema = ContactPartialSchema.merge(z.object({
  Address: z.lazy(() => AddressPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish()
})).partial();
ContactSchema.merge(z.object({
  Address: z.lazy(() => AddressPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish()
}).partial());
const AddressSchema = z.object({
  id: z.string(),
  label: z.string(),
  po: z.string().nullish(),
  street: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
  code: z.string().nullish(),
  venueId: z.string().nullish(),
  organizationId: z.string().nullish(),
  publisherId: z.string().nullish()
});
const AddressPartialSchema = AddressSchema.partial();
const AddressWithRelationsSchema = AddressSchema.merge(z.object({
  Venue: z.lazy(() => VenueWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish(),
  Contact: z.lazy(() => ContactWithRelationsSchema).array()
}));
const AddressPartialWithRelationsSchema = AddressPartialSchema.merge(z.object({
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Contact: z.lazy(() => ContactPartialWithRelationsSchema).array()
})).partial();
AddressSchema.merge(z.object({
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Contact: z.lazy(() => ContactPartialWithRelationsSchema).array()
}).partial());
const VenueSchema = z.object({
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
  updatedAt: z.date().nullish()
});
const VenuePartialSchema = VenueSchema.partial();
const VenueWithRelationsSchema = VenueSchema.merge(z.object({
  Events: z.lazy(() => EventWithRelationsSchema).array(),
  Series: z.lazy(() => SeriesWithRelationsSchema).array(),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentWithRelationsSchema).array(),
  Addresses: z.lazy(() => AddressWithRelationsSchema).array(),
  Contacts: z.lazy(() => ContactWithRelationsSchema).array(),
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish()
}));
const VenuePartialWithRelationsSchema = VenuePartialSchema.merge(z.object({
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Addresses: z.lazy(() => AddressPartialWithRelationsSchema).array(),
  Contacts: z.lazy(() => ContactPartialWithRelationsSchema).array(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish()
})).partial();
VenueSchema.merge(z.object({
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Addresses: z.lazy(() => AddressPartialWithRelationsSchema).array(),
  Contacts: z.lazy(() => ContactPartialWithRelationsSchema).array(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish()
}).partial());
const EventSchema = z.object({
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
  updatedAt: z.date().nullish()
});
const EventPartialSchema = EventSchema.partial();
const EventWithRelationsSchema = EventSchema.merge(z.object({
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenueWithRelationsSchema).nullish(),
  Races: z.lazy(() => RaceWithRelationsSchema).array(),
  Results: z.lazy(() => ResultWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowWithRelationsSchema).array(),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Comps: z.lazy(() => CompWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentWithRelationsSchema).array()
}));
const EventPartialWithRelationsSchema = EventPartialSchema.merge(z.object({
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Races: z.lazy(() => RacePartialWithRelationsSchema).array(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comps: z.lazy(() => CompPartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array()
})).partial();
EventSchema.merge(z.object({
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Races: z.lazy(() => RacePartialWithRelationsSchema).array(),
  Results: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comps: z.lazy(() => CompPartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array()
}).partial());
const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  firstname: z.string().nullish(),
  lastname: z.string().nullish(),
  email: z.string().nullish(),
  email_verified: z.number().nullish(),
  name: z.string().nullish(),
  avatar: z.string().nullish()
});
const UserPartialSchema = UserSchema.partial();
const UserWithRelationsSchema = UserSchema.merge(z.object({
  auth_session: z.lazy(() => SessionWithRelationsSchema).array(),
  auth_key: z.lazy(() => KeyWithRelationsSchema).array(),
  UserSettings: z.lazy(() => UserSettingsWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesWithRelationsSchema).array(),
  Event: z.lazy(() => EventWithRelationsSchema).array(),
  Race: z.lazy(() => RaceWithRelationsSchema).array(),
  Comp: z.lazy(() => CompWithRelationsSchema).array(),
  Result: z.lazy(() => ResultWithRelationsSchema).array(),
  Organization: z.lazy(() => OrganizationWithRelationsSchema).array(),
  Venue: z.lazy(() => VenueWithRelationsSchema).array(),
  follow: z.lazy(() => FollowWithRelationsSchema).array(),
  like: z.lazy(() => LikeWithRelationsSchema).array(),
  Comment: z.lazy(() => CommentWithRelationsSchema).array(),
  Address: z.lazy(() => AddressWithRelationsSchema).array(),
  Contact: z.lazy(() => ContactWithRelationsSchema).array()
}));
const UserPartialWithRelationsSchema = UserPartialSchema.merge(z.object({
  auth_session: z.lazy(() => SessionPartialWithRelationsSchema).array(),
  auth_key: z.lazy(() => KeyPartialWithRelationsSchema).array(),
  UserSettings: z.lazy(() => UserSettingsPartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).array(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).array(),
  Comp: z.lazy(() => CompPartialWithRelationsSchema).array(),
  Result: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).array(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).array(),
  follow: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  like: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comment: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Address: z.lazy(() => AddressPartialWithRelationsSchema).array(),
  Contact: z.lazy(() => ContactPartialWithRelationsSchema).array()
})).partial();
UserSchema.merge(z.object({
  auth_session: z.lazy(() => SessionPartialWithRelationsSchema).array(),
  auth_key: z.lazy(() => KeyPartialWithRelationsSchema).array(),
  UserSettings: z.lazy(() => UserSettingsPartialWithRelationsSchema).nullish(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).array(),
  Event: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Race: z.lazy(() => RacePartialWithRelationsSchema).array(),
  Comp: z.lazy(() => CompPartialWithRelationsSchema).array(),
  Result: z.lazy(() => ResultPartialWithRelationsSchema).array(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).array(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).array(),
  follow: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  like: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comment: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Address: z.lazy(() => AddressPartialWithRelationsSchema).array(),
  Contact: z.lazy(() => ContactPartialWithRelationsSchema).array()
}).partial());
const OrganizationSchema = z.object({
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
  updatedAt: z.date().nullish()
});
const OrganizationPartialSchema = OrganizationSchema.partial();
const OrganizationWithRelationsSchema = OrganizationSchema.merge(z.object({
  Owner: z.lazy(() => UserWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventWithRelationsSchema).array(),
  Series: z.lazy(() => SeriesWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowWithRelationsSchema).array(),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentWithRelationsSchema).array(),
  Addresses: z.lazy(() => AddressWithRelationsSchema).array(),
  Contact: z.lazy(() => ContactWithRelationsSchema).array()
}));
const OrganizationPartialWithRelationsSchema = OrganizationPartialSchema.merge(z.object({
  Owner: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Addresses: z.lazy(() => AddressPartialWithRelationsSchema).array(),
  Contact: z.lazy(() => ContactPartialWithRelationsSchema).array()
})).partial();
OrganizationSchema.merge(z.object({
  Owner: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Series: z.lazy(() => SeriesPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Addresses: z.lazy(() => AddressPartialWithRelationsSchema).array(),
  Contact: z.lazy(() => ContactPartialWithRelationsSchema).array()
}).partial());
const SeriesSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  logo: z.string().nullish(),
  titleImage: z.string().nullish(),
  website: z.string().nullish(),
  public: z.boolean().nullish(),
  complete: z.boolean().nullish(),
  organizationId: z.string().nullish(),
  publisherId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish()
});
const SeriesPartialSchema = SeriesSchema.partial();
const SeriesWithRelationsSchema = SeriesSchema.merge(z.object({
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowWithRelationsSchema).array(),
  Likes: z.lazy(() => LikeWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentWithRelationsSchema).array(),
  Venues: z.lazy(() => VenueWithRelationsSchema).array()
}));
const SeriesPartialWithRelationsSchema = SeriesPartialSchema.merge(z.object({
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Venues: z.lazy(() => VenuePartialWithRelationsSchema).array()
})).partial();
SeriesSchema.merge(z.object({
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Events: z.lazy(() => EventPartialWithRelationsSchema).array(),
  Follows: z.lazy(() => FollowPartialWithRelationsSchema).array(),
  Likes: z.lazy(() => LikePartialWithRelationsSchema).array(),
  Comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  Venues: z.lazy(() => VenuePartialWithRelationsSchema).array()
}).partial());
const VerificationTokenSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  expires: z.bigint()
});
VerificationTokenSchema.partial();
z.enum(["ReadUncommitted", "ReadCommitted", "RepeatableRead", "Serializable"]);
z.enum(["id", "name", "description", "logo", "titleImage", "website", "public", "complete", "organizationId", "publisherId", "createdAt", "updatedAt"]);
z.enum(["id", "eventeid", "uniqueIdString", "name", "eventwebsite", "venueName", "description", "titleImage", "public", "complete", "fileInfo", "resultColumns", "rest", "email", "organizationId", "publisherId", "seriesId", "venueId", "createdAt", "updatedAt"]);
z.enum(["id", "raceId", "uniqueRaceString", "name", "starts", "rank", "date", "time", "notes", "sailed", "rating", "resultColumns", "rest", "eventId", "publisherId", "createdAt", "updatedAt"]);
z.enum(["id", "compId", "description", "raceId", "club", "boat", "skipper", "sailno", "fleet", "division", "rating", "rank", "nett", "total", "rest", "image", "publisherId", "createdAt", "updatedAt"]);
z.enum(["id", "resultId", "points", "position", "discard", "resultType", "code", "start", "finish", "corrected", "elasped", "elapsedWin", "ratingWin", "raceRating", "supposedRating", "fleet", "rrset", "publisherId", "eventId", "compId", "raceId", "raceCompId", "createdAt", "updatedAt"]);
z.enum(["id", "name", "description", "tag", "website", "email", "logo", "titleImage", "ownerId", "createdAt", "updatedAt"]);
z.enum(["id", "name", "description", "website", "email", "phone", "burgee", "titleImage", "publisherId", "createdAt", "updatedAt"]);
z.enum(["id", "label", "po", "street", "city", "state", "country", "code", "venueId", "organizationId", "publisherId"]);
z.enum(["id", "label", "type", "email", "phone", "addressId", "userId", "venueId", "organizationId", "createdAt", "updatedAt"]);
z.enum(["id", "type", "ref", "comment", "eventId", "userId", "raceId", "seriesId", "organizationId", "venueId", "compId", "createdAt", "updatedAt"]);
z.enum(["id", "type", "itemId", "userId", "commentId", "compId", "eventId", "organizationId", "venueId", "raceId", "seriesId", "updatedAt", "createdAt"]);
z.enum(["id", "userId", "type", "itemId", "seriesId", "eventId", "organizationId", "raceId", "compId", "updatedAt", "createdAt", "eventCommentId", "commentId", "venueId"]);
z.enum(["id", "username", "firstname", "lastname", "email", "email_verified", "name", "avatar"]);
z.enum(["id", "role", "compId"]);
z.enum(["id", "theme", "language", "userId"]);
z.enum(["id", "user_id", "active_expires", "idle_expires"]);
z.enum(["id", "hashed_password", "user_id"]);
z.enum(["id", "user_id", "expires"]);
z.enum(["asc", "desc"]);
z.enum(["DbNull", "JsonNull"]).transform((value) => value === "JsonNull" ? Prisma.JsonNull : value === "DbNull" ? Prisma.DbNull : value);
z.enum(["default", "insensitive"]);
z.enum(["first", "last"]);
z.enum(["DbNull", "JsonNull", "AnyNull"]).transform((value) => value === "JsonNull" ? Prisma.JsonNull : value === "DbNull" ? Prisma.JsonNull : value === "AnyNull" ? Prisma.AnyNull : value);
const InputJsonValueSchema = z.lazy(
  () => z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)])))
  ])
);
export {
  OrganizationSchema as O,
  UserSettingsSchema as U
};
