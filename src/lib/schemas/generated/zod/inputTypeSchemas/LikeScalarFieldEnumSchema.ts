import { z } from 'zod';

export const LikeScalarFieldEnumSchema = z.enum(['id','type','itemId','compId','eventId','organizationId','raceId','seriesId','commentId','venueId','userId','likedUserId','updatedAt','createdAt']);

export default LikeScalarFieldEnumSchema;
