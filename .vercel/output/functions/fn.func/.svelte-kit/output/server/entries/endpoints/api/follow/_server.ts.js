import { r as redirect, f as fail } from "../../../../chunks/index.js";
import { p as prismaError } from "../../../../chunks/prisma-errors.js";
import "../../../../chunks/debug.js";
import { p as prisma } from "../../../../chunks/prisma.js";
const GET = async ({ url, locals }) => {
  const session = await locals.auth.validate();
  if (!session)
    throw redirect(307, "/auth/login");
  const followType = url.searchParams.get("followType");
  const unfollow = url.searchParams.get("unfollow");
  const itemId = url.searchParams.get("itemId");
  if (!followType || !itemId)
    throw fail(500, { message: "API error" });
  async function follow() {
    switch (followType) {
      case "series":
        try {
          return await prisma.follow.create({
            data: {
              type: "series",
              itemId,
              Series: { connect: { id: itemId } },
              User: { connect: { id: session.user.userId } }
            }
          });
        } catch (error) {
          prismaError(error);
          throw fail(500, { message: `Series follow error: ${error}` });
        }
      case "event":
        try {
          return await prisma.follow.create({
            data: {
              type: "event",
              itemId,
              Event: { connect: { id: itemId } },
              User: { connect: { id: session.user.userId } }
            }
          });
        } catch (error) {
          prismaError(error);
          throw fail(500, { message: `Event follow error: ${error}` });
        }
      case "comment":
        try {
          return await prisma.follow.create({
            data: {
              type: "comment",
              itemId,
              Comment: { connect: { id: itemId } },
              User: { connect: { id: session.user.userId } }
            }
          });
        } catch (error) {
          prismaError(error);
          throw fail(500, { message: `Comment follow error: ${error}` });
        }
      case "venue":
        try {
          return await prisma.follow.create({
            data: {
              type: "venue",
              itemId,
              Venue: { connect: { id: itemId } },
              User: { connect: { id: session.user.userId } }
            }
          });
        } catch (error) {
          prismaError(error);
          throw fail(500, { message: `Venue follow error: ${error}` });
        }
      case "organization":
        try {
          return await prisma.follow.create({
            data: {
              type: "organization",
              itemId,
              Organization: { connect: { id: itemId } },
              User: { connect: { id: session.user.userId } }
            }
          });
        } catch (error) {
          prismaError(error);
          throw fail(500, { message: `Organization follow error: ${error}` });
        }
      default:
        console.log(`No followType matched `, followType);
    }
  }
  async function unFollow() {
    try {
      if (!unfollow)
        throw fail(500, { message: `unlike error` });
      return await prisma.follow.delete({
        where: { id: unfollow }
      });
    } catch (error) {
      prismaError(error);
      throw fail(500, { message: "Unlike fail" });
    }
  }
  if (unfollow) {
    unFollow();
  } else {
    follow();
  }
  return new Response();
};
export {
  GET
};
