import { z } from "zod";
const venueSchema = z.object({
  name: z.string().min(3).max(64),
  website: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  burgee: z.string().url().nullable().optional(),
  titleImage: z.string().url().nullable().optional()
});
const contactSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(3).max(64),
  phone: z.string().nullable().optional(),
  email: z.string().nullable().optional()
});
const addressSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1).max(64),
  po: z.string().nullable().optional(),
  street: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional().optional(),
  country: z.string().nullable().optional(),
  code: z.string().nullable().optional()
});
export {
  addressSchema as a,
  contactSchema as c,
  venueSchema as v
};
