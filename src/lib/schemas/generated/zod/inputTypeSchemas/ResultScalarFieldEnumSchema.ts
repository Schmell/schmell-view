import { z } from 'zod';

export const ResultScalarFieldEnumSchema = z.enum(['id','resultId','points','position','discard','resultType','code','start','finish','corrected','elasped','elapsedWin','ratingWin','raceRating','supposedRating','fleet','rrset','publisherId','eventId','compId','raceId','raceCompId','createdAt','updatedAt']);

export default ResultScalarFieldEnumSchema;
