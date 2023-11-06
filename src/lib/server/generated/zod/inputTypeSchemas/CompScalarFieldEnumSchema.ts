import { z } from 'zod';

export const CompScalarFieldEnumSchema = z.enum(['id','compId','description','raceId','club','boat','skipper','sailno','fleet','division','rating','rank','nett','total','rest','image','publisherId','createdAt','updatedAt']);

export default CompScalarFieldEnumSchema;
