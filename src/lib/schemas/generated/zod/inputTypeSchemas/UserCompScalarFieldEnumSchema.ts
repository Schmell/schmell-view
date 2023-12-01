import { z } from 'zod';

export const UserCompScalarFieldEnumSchema = z.enum(['id','role','compId']);

export default UserCompScalarFieldEnumSchema;
