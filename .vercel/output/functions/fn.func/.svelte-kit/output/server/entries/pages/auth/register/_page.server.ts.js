import { a as auth } from "../../../../chunks/lucia.js";
import { f as fail } from "../../../../chunks/index.js";
import { g as generateEmailVerificationToken } from "../../../../chunks/token.js";
import { a as sendEmailVerificationLink } from "../../../../chunks/email.js";
import { s as superValidate, a as setError, m as message } from "../../../../chunks/superValidate.js";
import { L as LuciaError } from "../../../../chunks/error.js";
import "../../../../chunks/debug.js";
import { e as emailRegisterSchema } from "../../../../chunks/emailRegisterSchema.js";
import { Prisma } from "@prisma/client";
import { c as capitalizeFirstLetter } from "../../../../chunks/index3.js";
import { r as redirect } from "../../../../chunks/server.js";
const load = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) {
    if (!session.user.emailVerified)
      throw redirect(302, "/email-verification");
    throw redirect(302, "/");
  }
  const form = await superValidate(emailRegisterSchema);
  return {
    session,
    form
  };
};
const actions = {
  default: async (event) => {
    const { request, locals } = event;
    const form = await superValidate(request, emailRegisterSchema);
    const exists = await prisma.user.findUnique({
      where: { email: form.data.email },
      select: { id: true }
    });
    if (exists)
      throw redirect(
        "/auth/login",
        { type: "error", message: "Email already exists - try to login" },
        event
      );
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      const user = await auth.createUser({
        key: {
          providerId: "email",
          // auth method
          providerUserId: form.data.email.toLowerCase(),
          // unique id when using "email" auth method
          password: form.data.password
          // hashed by Lucia
        },
        attributes: {
          email: form.data.email.toLowerCase(),
          username: form.data.username,
          name: `${form.data.firstname} ${form.data.lastname}`,
          firstname: form.data.firstname,
          lastname: form.data.lastname,
          avatar: form.data.avatar,
          // set verified to false on register
          email_verified: Number(false)
        }
      });
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {}
      });
      locals.auth.setSession(session);
      const token = await generateEmailVerificationToken(user.userId);
      await sendEmailVerificationLink(form.data.email.toLowerCase(), token);
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
        return message(form, e.message, {
          status: 400
        });
      }
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log("e.code: ", e.code);
        if (e.code === "P2002") {
          const propName = e.meta?.target[0];
          form.valid = false;
          form.errors[propName] = `${capitalizeFirstLetter(propName)} is already registered`;
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
      if (e instanceof Prisma.PrismaClientValidationError) {
        console.log("PrismaClientValidationError: ", e);
        return fail(511, {
          message: e.message
        });
      }
      console.log("Unknown Error: ", e);
      return fail(500, {
        message: "Unknown Error occured"
      });
    }
    throw redirect(
      301,
      "/auth/email-verification",
      {
        type: "success",
        message: "Check email for response"
      },
      event
    );
  }
};
export {
  actions,
  load
};
