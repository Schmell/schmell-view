import { z } from 'zod';

export const ContactScalarFieldEnumSchema = z.enum(['id','label','type','email','phone','addressId','userId','venueId','organizationId','createdAt','updatedAt']);

export default ContactScalarFieldEnumSchema;
