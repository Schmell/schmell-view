import { a as auth } from "../../../../../chunks/lucia.js";
import { v as validateEmailVerificationToken } from "../../../../../chunks/token.js";
import { s as setFlash } from "../../../../../chunks/server.js";
import { f as from } from "../../../../../chunks/index3.js";
const GET = async (event) => {
  const { params, locals, url } = event;
  const { token } = params;
  try {
    const userId = await validateEmailVerificationToken(token);
    const user = await auth.getUser(userId);
    await auth.invalidateAllUserSessions(user.userId);
    await auth.updateUserAttributes(user.userId, {
      email_verified: Number(true)
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    });
    locals.auth.setSession(session);
    setFlash({ type: "success", message: "Email verified" }, event);
    return new Response(null, {
      // make sure its a redirect code
      status: 301,
      headers: {
        Location: `/${from(url)}`
      }
    });
  } catch {
    return new Response("Invalid email verification link", {
      status: 400
    });
  }
};
export {
  GET
};
