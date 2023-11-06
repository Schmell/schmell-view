import { z } from 'zod';

export const FollowScalarFieldEnumSchema = z.enum(['id','type','itemId','userId','commentId','compId','eventId','organizationId','venueId','raceId','seriesId','updatedAt','createdAt']);

export default FollowScalarFieldEnumSchema;
