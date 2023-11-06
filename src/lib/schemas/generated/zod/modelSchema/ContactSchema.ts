import { z } from 'zod';
import type { AddressWithRelations } from './AddressSchema'
import type { AddressPartialWithRelations } from './AddressSchema'
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import type { VenueWithRelations } from './VenueSchema'
import type { VenuePartialWithRelations } from './VenueSchema'
import type { OrganizationWithRelations } from './OrganizationSchema'
import type { OrganizationPartialWithRelations } from './OrganizationSchema'
import { AddressWithRelationsSchema } from './AddressSchema'
import { AddressPartialWithRelationsSchema } from './AddressSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'
import { VenueWithRelationsSchema } from './VenueSchema'
import { VenuePartialWithRelationsSchema } from './VenueSchema'
import { OrganizationWithRelationsSchema } from './OrganizationSchema'
import { OrganizationPartialWithRelationsSchema } from './OrganizationSchema'

/////////////////////////////////////////
// CONTACT SCHEMA
/////////////////////////////////////////

export const ContactSchema = z.object({
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
  updatedAt: z.date().nullish(),
})

export type Contact = z.infer<typeof ContactSchema>

/////////////////////////////////////////
// CONTACT PARTIAL SCHEMA
/////////////////////////////////////////

export const ContactPartialSchema = ContactSchema.partial()

export type ContactPartial = z.infer<typeof ContactPartialSchema>

/////////////////////////////////////////
// CONTACT RELATION SCHEMA
/////////////////////////////////////////

export type ContactRelations = {
  Address?: AddressWithRelations | null;
  User?: UserWithRelations | null;
  Venue?: VenueWithRelations | null;
  Organization?: OrganizationWithRelations | null;
};

export type ContactWithRelations = z.infer<typeof ContactSchema> & ContactRelations

export const ContactWithRelationsSchema: z.ZodType<ContactWithRelations> = ContactSchema.merge(z.object({
  Address: z.lazy(() => AddressWithRelationsSchema).nullish(),
  User: z.lazy(() => UserWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenueWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// CONTACT PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type ContactPartialRelations = {
  Address?: AddressPartialWithRelations | null;
  User?: UserPartialWithRelations | null;
  Venue?: VenuePartialWithRelations | null;
  Organization?: OrganizationPartialWithRelations | null;
};

export type ContactPartialWithRelations = z.infer<typeof ContactPartialSchema> & ContactPartialRelations

export const ContactPartialWithRelationsSchema: z.ZodType<ContactPartialWithRelations> = ContactPartialSchema.merge(z.object({
  Address: z.lazy(() => AddressPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
})).partial()

export type ContactWithPartialRelations = z.infer<typeof ContactSchema> & ContactPartialRelations

export const ContactWithPartialRelationsSchema: z.ZodType<ContactWithPartialRelations> = ContactSchema.merge(z.object({
  Address: z.lazy(() => AddressPartialWithRelationsSchema).nullish(),
  User: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
}).partial())

export default ContactSchema;
