import { z } from 'zod';

export const ResultScalarFieldEnumSchema = z.enum(['id','resultId','points','position','discard','resultType','code','start','finish','corrected','elasped','elapsedWin','ratingWin','raceRating','supposedRating','rrset','publisherId','eventId','compId','raceId','createdAt','updatedAt']);

export default ResultScalarFieldEnumSchema;
