import { r as redirect, f as fail } from "../../../../../../chunks/index.js";
import { s as superValidate } from "../../../../../../chunks/superValidate.js";
import { c as compSchema } from "../../../../../../chunks/schema.js";
const load = async ({ locals, params, url }) => {
  const session = locals.auth.validate();
  if (!session)
    throw redirect(307, `/auth/login?from=${url.pathname}`);
  async function getComp() {
    try {
      return await prisma.comp.findUniqueOrThrow({
        where: { id: params.compId }
      });
    } catch (error) {
      console.log("error: ", error);
      throw error(500, { message: `edit event error: ${error}` });
    }
  }
  return {
    form: await superValidate(await getComp(), compSchema)
  };
};
const actions = {
  default: async ({ locals, request, params, url }) => {
    const session = locals.auth.validate();
    if (!session)
      throw redirect(307, `/auth/login?from=${url.pathname}`);
    const form = await superValidate(request, compSchema);
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      await prisma.comp.update({
        where: { id: params.compId },
        data: { ...form.data }
      });
    } catch (error) {
      console.log("error: ", error);
      return fail(500, { form });
    }
    throw redirect(307, `${url.searchParams.get("from")}`);
  }
};
export {
  actions,
  load
};
