import { z } from 'zod';

export const VenueScalarFieldEnumSchema = z.enum(['id','name','description','website','email','phone','burgee','titleImage','publisherId','createdAt','updatedAt']);

export default VenueScalarFieldEnumSchema;
