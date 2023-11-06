import { z } from 'zod';

export const SeriesScalarFieldEnumSchema = z.enum(['id','name','description','logo','titleImage','organizationId','publisherId','createdAt','updatedAt']);

export default SeriesScalarFieldEnumSchema;
