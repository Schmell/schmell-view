import { z } from 'zod';

export const LikeScalarFieldEnumSchema = z.enum(['id','userId','type','itemId','seriesId','eventId','organizationId','raceId','compId','updatedAt','createdAt','eventCommentId','commentId','venueId']);

export default LikeScalarFieldEnumSchema;
