import { z } from 'zod';

export const RaceScalarFieldEnumSchema = z.enum(['id','raceId','uniqueRaceString','name','starts','rank','date','time','notes','sailed','rating','resultColumns','rest','eventId','publisherId','createdAt','updatedAt']);

export default RaceScalarFieldEnumSchema;
