import { z } from 'zod';

export const UserSettingsScalarFieldEnumSchema = z.enum(['id','theme','language','userId']);

export default UserSettingsScalarFieldEnumSchema;
