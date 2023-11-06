import { z } from 'zod';

export const KeyScalarFieldEnumSchema = z.enum(['id','hashed_password','user_id']);

export default KeyScalarFieldEnumSchema;
