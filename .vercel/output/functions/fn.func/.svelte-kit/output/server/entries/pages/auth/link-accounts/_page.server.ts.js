import { s as superValidate } from "../../../../chunks/superValidate.js";
import { z } from "zod";
const linkAccountSchema = z.object({});
const load = async ({ url }) => {
  const field = url.searchParams.get("field");
  const form = await superValidate(linkAccountSchema);
  return { form, field };
};
export {
  load
};
