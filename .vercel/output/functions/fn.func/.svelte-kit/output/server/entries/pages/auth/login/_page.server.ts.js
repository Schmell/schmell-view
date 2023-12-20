import { a as auth } from "../../../../chunks/lucia.js";
import { r as redirect, f as fail } from "../../../../chunks/index.js";
import { s as superValidate, a as setError, m as message } from "../../../../chunks/superValidate.js";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { c as capitalizeFirstLetter } from "../../../../chunks/index3.js";
import { L as LuciaError } from "../../../../chunks/error.js";
import "../../../../chunks/debug.js";
const load = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) {
    if (!session.user.emailVerified)
      throw redirect(302, "/email-verification");
    throw redirect(302, "/");
  }
  const form = await superValidate(emailLoginSchema);
  return { form };
};
const emailLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(12)
});
const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, emailLoginSchema);
    if (!form.valid)
      ;
    try {
      const key = await auth.useKey("email", form.data.email.toLowerCase(), form.data.password);
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {}
      });
      locals.auth.setSession(session);
    } catch (e) {
      if (e instanceof LuciaError) {
        console.log("LuciaError: ", e);
        if (e.message === "AUTH_INVALID_PASSWORD" || e.message === "AUTH_INVALID_KEY_ID") {
          setError(form, "email", "");
          setError(form, "password", "");
          form.data.password = "";
          return message(form, "Invalid Credentials", {
            status: 403
          });
        }
        form.valid = false;
        form.message = e.message;
        return fail(500, {
          form
        });
      }
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log("prisma known error: ", form);
        if (e.code === "P2002") {
          const propName = e.meta?.target[0];
          form.valid = false;
          console.log("form.data[propName]: ", form.data[propName]);
          form.errors[propName] = `${capitalizeFirstLetter(propName)} is already registered`;
          return fail(400, {
            form
          });
        }
        if (e.code === "P1001") {
          console.log(" Cant reach database server: ", e.message);
          return fail(503, {
            message: e.message
          });
        }
      }
    }
    throw redirect(302, "/events");
  }
};
export {
  actions,
  load
};
