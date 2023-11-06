import { z } from 'zod';

export const OrganizationScalarFieldEnumSchema = z.enum(['id','name','description','tag','website','email','logo','titleImage','ownerId','createdAt','updatedAt']);

export default OrganizationScalarFieldEnumSchema;
