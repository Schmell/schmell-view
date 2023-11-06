import { z } from 'zod';

export const CommentScalarFieldEnumSchema = z.enum(['id','type','ref','comment','eventId','userId','raceId','seriesId','organizationId','venueId','compId','createdAt','updatedAt']);

export default CommentScalarFieldEnumSchema;
