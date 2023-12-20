import { b as googleAuth, a as auth } from "../../../../../../chunks/lucia.js";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { Prisma } from "@prisma/client";
import { p as prisma } from "../../../../../../chunks/prisma.js";
const GET = async (event) => {
  const { url, cookies, locals } = event;
  const storedState = cookies.get("google_oauth_state");
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400
    });
  }
  const { existingUser, googleUser, createUser, createKey } = await googleAuth.validateCallback(
    code
  );
  try {
    const getUser = async () => {
      if (existingUser)
        return existingUser;
      const user2 = await createUser({
        attributes: {
          username: googleUser.name,
          email: googleUser.email,
          name: googleUser.name,
          firstname: googleUser.given_name,
          lastname: googleUser.family_name,
          avatar: googleUser.picture,
          email_verified: 1
        }
      });
      return user2;
    };
    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    });
    locals.auth.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      console.log("OAuthRequestError: ", e);
      return new Response(null, {
        status: 400
      });
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        const target = e.meta?.target;
        const violatedField = target[0];
        if (target.length > 0)
          console.log("Unique constraint violations: ", target);
        if (violatedField === "email") {
          const user = await prisma.user.findFirst({
            where: {
              email: googleUser.email
            }
          });
          if (user?.email_verified) {
            await createKey(user.id);
            const session = await auth.createSession({
              userId: user.id,
              attributes: {}
            });
            locals.auth.setSession(session);
          }
        }
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/"
          }
        });
      }
      if (e.code === "P1001") {
        console.log(" Cant reach database server: ", e.message);
        return new Response(null, {
          status: 500
        });
      }
      console.log("prisma known error: ", e);
    }
    console.log("google OAuth callback error: ", e);
    return new Response(null, {
      status: 500
    });
  }
};
export {
  GET
};
