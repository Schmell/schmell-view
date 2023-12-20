import { r as redirect, f as fail, e as error } from "../../../../chunks/index.js";
import { p as prismaError } from "../../../../chunks/prisma-errors.js";
import "../../../../chunks/debug.js";
import { p as prisma } from "../../../../chunks/prisma.js";
const GET = async ({ url, locals }) => {
  const session = await locals.auth.validate();
  if (!session)
    throw redirect(307, `/auth/login?from=/results/${url.pathname}`);
  const likeType = url.searchParams.get("likeType");
  const unlike = url.searchParams.get("unlike");
  const itemId = url.searchParams.get("itemId");
  if (!likeType || !itemId)
    throw fail(500, { message: "API error" });
  async function like() {
    switch (likeType) {
      case "series":
        try {
          await prisma.like.create({
            data: {
              type: "series",
              itemId,
              Series: { connect: { id: itemId } },
              User: { connect: { id: session.user.userId } }
            }
          });
          break;
        } catch (error2) {
          prismaError(error2);
          console.log("error: ", error2);
        }
      case "event":
        try {
          await prisma.like.create({
            data: {
              type: "event",
              itemId,
              Event: { connect: { id: itemId } },
              User: { connect: { id: session.user.userId } }
            }
          });
          break;
        } catch (error2) {
          prismaError(error2);
          console.log("error: ", error2);
        }
      case "comment":
        try {
          await prisma.like.create({
            data: {
              type: "comment",
              itemId,
              Comment: { connect: { id: itemId } },
              User: { connect: { id: session.user.userId } }
            }
          });
          break;
        } catch (error2) {
          prismaError(error2);
          console.log("error: ", error2);
        }
      case "venue":
        try {
          await prisma.like.create({
            data: {
              type: "venue",
              itemId,
              Venue: { connect: { id: itemId } },
              User: { connect: { id: session.user.userId } }
            }
          });
          break;
        } catch (error2) {
          prismaError(error2);
          console.log("error: ", error2);
        }
      case "organization":
        try {
          await prisma.like.create({
            data: {
              type: "organization",
              itemId,
              Organization: { connect: { id: itemId } },
              User: { connect: { id: session.user.userId } }
            }
          });
          break;
        } catch (error2) {
          prismaError(error2);
          console.log("error: ", error2);
        }
      default:
        console.log(`No likeType matched`, likeType);
    }
  }
  async function unLike() {
    try {
      if (!unlike)
        throw error(500, { message: `unlike error` });
      return await prisma.like.delete({
        where: { id: unlike }
      });
    } catch (error2) {
      prismaError(error2);
      console.log("error: ", error2);
    }
  }
  if (unlike) {
    unLike();
  } else {
    like();
  }
  return new Response();
};
export {
  GET
};
