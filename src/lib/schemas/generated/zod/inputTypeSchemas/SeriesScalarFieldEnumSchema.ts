import { z } from 'zod';

export const SeriesScalarFieldEnumSchema = z.enum(['id','name','description','logo','titleImage','website','public','complete','organizationId','publisherId','createdAt','updatedAt']);

export default SeriesScalarFieldEnumSchema;
