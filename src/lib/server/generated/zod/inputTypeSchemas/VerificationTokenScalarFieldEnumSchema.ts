import { z } from 'zod';

export const VerificationTokenScalarFieldEnumSchema = z.enum(['id','user_id','expires']);

export default VerificationTokenScalarFieldEnumSchema;
