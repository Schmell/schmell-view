import { z } from 'zod';

export const EventScalarFieldEnumSchema = z.enum(['id','eventeid','uniqueIdString','name','eventwebsite','venueName','description','titleImage','public','complete','fileInfo','resultColumns','rest','email','organizationId','publisherId','seriesId','venueId','createdAt','updatedAt']);

export default EventScalarFieldEnumSchema;
