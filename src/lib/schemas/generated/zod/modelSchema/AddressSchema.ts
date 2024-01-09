import { z } from 'zod';
import type { VenueWithRelations } from './VenueSchema'
import type { VenuePartialWithRelations } from './VenueSchema'
import type { OrganizationWithRelations } from './OrganizationSchema'
import type { OrganizationPartialWithRelations } from './OrganizationSchema'
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import type { ContactWithRelations } from './ContactSchema'
import type { ContactPartialWithRelations } from './ContactSchema'
import { VenueWithRelationsSchema } from './VenueSchema'
import { VenuePartialWithRelationsSchema } from './VenueSchema'
import { OrganizationWithRelationsSchema } from './OrganizationSchema'
import { OrganizationPartialWithRelationsSchema } from './OrganizationSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'
import { ContactWithRelationsSchema } from './ContactSchema'
import { ContactPartialWithRelationsSchema } from './ContactSchema'

/////////////////////////////////////////
// ADDRESS SCHEMA
/////////////////////////////////////////

export const AddressSchema = z.object({
  id: z.string(),
  label: z.string(),
  default: z.boolean(),
  po: z.string().nullish(),
  street: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
  code: z.string().nullish(),
  venueId: z.string().nullish(),
  organizationId: z.string().nullish(),
  publisherId: z.string().nullish(),
})

export type Address = z.infer<typeof AddressSchema>

/////////////////////////////////////////
// ADDRESS PARTIAL SCHEMA
/////////////////////////////////////////

export const AddressPartialSchema = AddressSchema.partial()

export type AddressPartial = z.infer<typeof AddressPartialSchema>

/////////////////////////////////////////
// ADDRESS RELATION SCHEMA
/////////////////////////////////////////

export type AddressRelations = {
  Venue?: VenueWithRelations | null;
  Organization?: OrganizationWithRelations | null;
  Publisher?: UserWithRelations | null;
  Contact: ContactWithRelations[];
};

export type AddressWithRelations = z.infer<typeof AddressSchema> & AddressRelations

export const AddressWithRelationsSchema: z.ZodType<AddressWithRelations> = AddressSchema.merge(z.object({
  Venue: z.lazy(() => VenueWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserWithRelationsSchema).nullish(),
  Contact: z.lazy(() => ContactWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ADDRESS PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type AddressPartialRelations = {
  Venue?: VenuePartialWithRelations | null;
  Organization?: OrganizationPartialWithRelations | null;
  Publisher?: UserPartialWithRelations | null;
  Contact?: ContactPartialWithRelations[];
};

export type AddressPartialWithRelations = z.infer<typeof AddressPartialSchema> & AddressPartialRelations

export const AddressPartialWithRelationsSchema: z.ZodType<AddressPartialWithRelations> = AddressPartialSchema.merge(z.object({
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Contact: z.lazy(() => ContactPartialWithRelationsSchema).array(),
})).partial()

export type AddressWithPartialRelations = z.infer<typeof AddressSchema> & AddressPartialRelations

export const AddressWithPartialRelationsSchema: z.ZodType<AddressWithPartialRelations> = AddressSchema.merge(z.object({
  Venue: z.lazy(() => VenuePartialWithRelationsSchema).nullish(),
  Organization: z.lazy(() => OrganizationPartialWithRelationsSchema).nullish(),
  Publisher: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  Contact: z.lazy(() => ContactPartialWithRelationsSchema).array(),
}).partial())

export default AddressSchema;
