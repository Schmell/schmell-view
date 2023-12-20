import { a as auth } from "../../../../../chunks/lucia.js";
import { r as redirect, f as fail } from "../../../../../chunks/index.js";
import { i as isValidPasswordResetToken, b as validatePasswordResetToken } from "../../../../../chunks/token.js";
import { s as superValidate } from "../../../../../chunks/superValidate.js";
import { z } from "zod";
const load = async ({ params }) => {
  const { token } = params;
  const validToken = await isValidPasswordResetToken(token);
  if (!validToken) {
    throw redirect(302, "/auth/password-reset");
  }
  const form = await superValidate(passwordResetPasswordSchema);
  return { form };
};
const passwordResetPasswordSchema = z.object({
  password: z.string().min(6).max(18)
});
const actions = {
  default: async ({ request, params, locals }) => {
    const form = await superValidate(request, passwordResetPasswordSchema);
    const { password } = form.data;
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      const { token } = params;
      const userId = await validatePasswordResetToken(token);
      let user = await auth.getUser(userId);
      await auth.invalidateAllUserSessions(user.userId);
      if (!user.email)
        return fail(500, { message: "no email provided" });
      await auth.updateKeyPassword("email", user.email, password);
      if (!user.emailVerified) {
        user = await auth.updateUserAttributes(user.userId, {
          email_verified: Number(true)
        });
      }
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {}
      });
      locals.auth.setSession(session);
    } catch (e) {
      console.log("e: ", e);
      return fail(400, {
        message: "Invalid or expired password reset link"
      });
    }
    throw redirect(302, "/");
  }
};
export {
  actions,
  load
};
