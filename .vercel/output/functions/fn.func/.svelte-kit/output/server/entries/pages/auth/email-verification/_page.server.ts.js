import { f as fail } from "../../../../chunks/index.js";
import { g as generateEmailVerificationToken } from "../../../../chunks/token.js";
import { a as sendEmailVerificationLink } from "../../../../chunks/email.js";
import { r as redirect } from "../../../../chunks/server.js";
const load = async (event) => {
  const session = await event.locals.auth.validate();
  if (!session)
    throw redirect(302, "/auth/login", { type: "error", message: "Not Authorised" }, event);
  if (session.user.emailVerified) {
    throw redirect(302, "/");
  }
  return {};
};
const actions = {
  default: async (event) => {
    const session = await event.locals.auth.validate();
    if (!session)
      throw redirect(302, "/auth/login", { type: "error", message: "Not Authorised" }, event);
    if (session.user.emailVerified) {
      throw redirect(302, "/");
    }
    try {
      const token = await generateEmailVerificationToken(session.user.userId);
      await sendEmailVerificationLink(session.user.email, token);
      return {
        success: true
      };
    } catch {
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
