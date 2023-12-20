import { g as githubAuth, a as auth } from "../../../../../../chunks/lucia.js";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { Prisma } from "@prisma/client";
import { p as prisma } from "../../../../../../chunks/prisma.js";
const GET = async ({ url, cookies, locals }) => {
  const storedState = cookies.get("github_oauth_state");
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400
    });
  }
  const { existingUser, githubUser, createUser, createKey } = await githubAuth.validateCallback(
    code
  );
  try {
    const names = githubUser.name?.split(" ");
    const getUser = async () => {
      if (existingUser)
        return existingUser;
      const user2 = await createUser({
        attributes: {
          username: githubUser.login,
          email: githubUser.email ?? "",
          name: githubUser.name ?? "",
          firstname: names ? names[0] : "",
          lastname: names ? names[1] : "",
          avatar: githubUser.avatar_url,
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
      return new Response(null, {
        status: 400
      });
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        const violatedField = e.meta?.target[0];
        if (violatedField === "email") {
          const user = await prisma.user.findFirst({
            where: {
              email: githubUser.email
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
    return new Response(null, {
      status: 500
    });
  }
};
export {
  GET
};
