import { z } from 'zod';

export const SessionScalarFieldEnumSchema = z.enum(['id','user_id','active_expires','idle_expires']);

export default SessionScalarFieldEnumSchema;
