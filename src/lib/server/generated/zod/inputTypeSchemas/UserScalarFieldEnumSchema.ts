import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','username','firstname','lastname','email','email_verified','name','avatar']);

export default UserScalarFieldEnumSchema;
