import { p as prisma } from "../../../../chunks/prisma.js";
import { c as capitalizeFirstLetter } from "../../../../chunks/index3.js";
import { r as redirect, e as error, f as fail } from "../../../../chunks/index.js";
import { s as superValidate } from "../../../../chunks/superValidate.js";
import { z } from "zod";
import { Prisma } from "@prisma/client";
const profileSchema = z.object({
  username: z.string().min(2).max(18),
  firstname: z.string().max(16).optional(),
  lastname: z.string().max(16).optional(),
  avatar: z.string().optional()
});
const load = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session)
    throw redirect(302, "/");
  if (!session?.user?.emailVerified)
    throw redirect(302, "/auth/email-verification");
  const user = await prisma.user.findFirst({
    where: { email: session.user.email }
  });
  if (!user)
    throw error(404, "Not found");
  const form = await superValidate(user, profileSchema);
  return { form };
};
const actions = {
  default: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    const form = await superValidate(request, profileSchema);
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      await prisma.user.update({
        where: { id: session?.user?.userId },
        data: {
          username: form.data.username,
          firstname: form.data.firstname,
          lastname: form.data.lastname,
          avatar: form.data.avatar
        }
      });
    } catch (error2) {
      console.log("error: ", error2);
      if (error2 instanceof Prisma.PrismaClientKnownRequestError) {
        console.log("prisma known error: ", form);
        if (error2.code === "P2002") {
          const propName = e.meta?.target[0];
          form.valid = false;
          console.log("form.data[propName]: ", form.data[propName]);
          form.errors[propName] = `${capitalizeFirstLetter(propName)} is already registered`;
          return fail(400, {
            form
          });
        }
        if (error2.code === "P1001") {
          console.log(" Cant reach database server: ", error2.message);
          return fail(503, {
            message: error2.message
          });
        }
      }
      console.log("error: ", error2);
    }
  }
};
export {
  actions,
  load
};
