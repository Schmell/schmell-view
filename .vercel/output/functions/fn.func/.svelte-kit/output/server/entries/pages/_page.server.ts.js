import { r as redirect, f as fail } from "../../chunks/index.js";
import { l as loadFlash } from "../../chunks/server.js";
import { a as auth } from "../../chunks/lucia.js";
import { p as prismaError } from "../../chunks/prisma-errors.js";
import "../../chunks/debug.js";
import { p as prisma } from "../../chunks/prisma.js";
const load = loadFlash(async (event) => {
  const { locals, url } = event;
  const session = await locals.auth.validate();
  if (!session)
    throw redirect(302, `/auth/login?from=${url.pathname}`);
  async function getUserEvents() {
    try {
      return await prisma.event.findMany({
        where: { publisherId: session?.user.userId },
        include: {
          Organization: {
            select: {
              id: true,
              name: true,
              Likes: true,
              Follows: true,
              _count: { select: { Likes: true, Follows: true } }
            }
          },
          Races: { select: { _count: true } },
          Venue: true,
          Likes: true,
          Follows: true,
          _count: {
            select: { Likes: true, Follows: true, Comps: true, Races: { where: { sailed: "1" } } }
          }
        }
      });
    } catch (error) {
      prismaError(error);
      console.log("error: ", error);
      throw fail(400, { message: "Fail query on User Events" });
    }
  }
  async function getUserOrganizations() {
    try {
      return await prisma.organization.findMany({
        where: { ownerId: session?.user.userId },
        include: {
          _count: { select: { Likes: true, Follows: true, Events: true, Series: true } },
          Likes: true,
          Follows: true
        }
      });
    } catch (error) {
      prismaError(error);
      console.log("error: ", error);
      throw fail(400, { message: "Fail query on User Likes" });
    }
  }
  async function getUserSeries() {
    try {
      return await prisma.series.findMany({
        where: { publisherId: session?.user.userId },
        include: {
          Events: true,
          Likes: true,
          Follows: true,
          Organization: true,
          Publisher: true,
          _count: { select: { Likes: true, Follows: true, Comments: true } }
        }
      });
    } catch (error) {
      prismaError(error);
      console.log("error: ", error);
      throw fail(400, { message: "Fail query on User Likes" });
    }
  }
  async function getUserFollowing() {
    try {
      return await prisma.follow.findMany({
        where: { userId: session?.user.userId },
        orderBy: { createdAt: "desc" },
        include: {
          Series: { include: { Follows: true } },
          Event: { include: { Follows: true } },
          Organization: { include: { Follows: true } },
          Venue: { include: { Follows: true } },
          Comp: { include: { Follows: true } }
        }
      });
    } catch (error) {
      prismaError(error);
      console.log("error: ", error);
      throw fail(400, { message: "Fail query on User Following" });
    }
  }
  async function getUserLikes() {
    try {
      return await prisma.like.findMany({
        where: { userId: session?.user.userId },
        orderBy: { createdAt: "desc" },
        include: {
          Event: { include: { Likes: true } },
          Organization: { include: { Likes: true } },
          Comment: {
            include: {
              User: true,
              Venue: true,
              Organization: true,
              Event: true,
              Comp: true,
              Likes: true
            }
          },
          Venue: { include: { Likes: true } },
          Comp: { include: { Likes: true } },
          User: true
        }
      });
    } catch (error) {
      prismaError(error);
      console.log("error: ", error);
      throw fail(400, { message: "Fail query on User Likes" });
    }
  }
  return {
    organizations: getUserOrganizations(),
    series: getUserSeries(),
    events: getUserEvents(),
    following: getUserFollowing(),
    likes: getUserLikes()
  };
});
const actions = {
  logout: async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session)
      return redirect(307, "/auth/login");
    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);
    throw redirect(302, "/auth/login");
  }
};
export {
  actions,
  load
};
