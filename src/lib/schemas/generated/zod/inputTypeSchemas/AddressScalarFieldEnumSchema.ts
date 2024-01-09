import { z } from 'zod';

export const AddressScalarFieldEnumSchema = z.enum(['id','label','default','po','street','city','state','country','code','venueId','organizationId','publisherId']);

export default AddressScalarFieldEnumSchema;
