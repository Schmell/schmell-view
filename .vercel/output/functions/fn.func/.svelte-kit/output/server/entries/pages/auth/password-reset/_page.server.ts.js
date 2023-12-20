import { a as auth } from "../../../../chunks/lucia.js";
import { f as fail } from "../../../../chunks/index.js";
import { z } from "zod";
import { a as generatePasswordResetToken } from "../../../../chunks/token.js";
import { b as sendPasswordResetLink } from "../../../../chunks/email.js";
import { s as superValidate, a as setError, m as message } from "../../../../chunks/superValidate.js";
import { c as capitalizeFirstLetter } from "../../../../chunks/index3.js";
import { Prisma } from "@prisma/client";
import { p as prisma } from "../../../../chunks/prisma.js";
const passwordResetSchema = z.object({
  email: z.string().email()
});
const load = async ({ locals }) => {
  const form = await superValidate(passwordResetSchema);
  return { form };
};
const actions = {
  default: async (event) => {
    const { request } = event;
    const form = await superValidate(request, passwordResetSchema);
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      const storedUser = await prisma.user.findFirst({
        where: { email: form.data.email }
      });
      if (!storedUser) {
        setError(form, "email", "User does not exist");
        return message(form, "User does not exist", {
          status: 403
        });
      }
      const user = auth.transformDatabaseUser(storedUser);
      const token = await generatePasswordResetToken(user.userId);
      await sendPasswordResetLink(form.data.email, token);
      return message(form, "Email was sent");
    } catch (e) {
      console.log("password-reset error: ", e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log("e.code: ", e.code);
        if (e.code === "P2002") {
          const propName = e.meta?.target[0];
          setError(form, propName, `${capitalizeFirstLetter(propName)} is already registered`);
          return fail(400, {
            form
          });
        }
        if (e.code === "P1001") {
          console.log(" Cant reach database server at: ", e.message);
          return fail(511, {
            message: e.message
          });
        }
      }
      return fail(500, {
        message: "An unknown error occurred"
      });
    }
  }
};
export {
  actions,
  load
};
