import { p as prisma } from "../../../../chunks/prisma.js";
import { f as fail } from "../../../../chunks/index.js";
import { s as superValidate } from "../../../../chunks/superValidate.js";
import { p as prismaError } from "../../../../chunks/prisma-errors.js";
import { l as luciaErrors } from "../../../../chunks/lucia-errors.js";
import { z } from "zod";
const load = async ({ params, url }) => {
  async function getVenue() {
    try {
      return await prisma.venue.findUniqueOrThrow({
        where: { id: params.venueId },
        include: {
          Publisher: { select: { id: true, username: true, avatar: true } },
          _count: { select: { Comments: true, Likes: true, Follows: true } },
          Events: {
            include: {
              Races: true,
              Organization: true,
              Comments: { include: { User: true } },
              Likes: true,
              Follows: true
            }
          },
          Comments: {
            orderBy: { createdAt: "desc" },
            select: {
              comment: true,
              id: true,
              type: true,
              User: true,
              Likes: true,
              _count: { select: { Likes: true } }
            }
          },
          Likes: true,
          Follows: true,
          Addresses: true,
          Contacts: true
        }
      });
    } catch (error2) {
      console.log("error: ", error2);
      throw fail(404, {});
    }
  }
  const commentSchema = z.object({
    comment: z.string().max(256).nullish(),
    type: z.string(),
    eventComentId: z.string(),
    id: z.string().optional()
  });
  let itemComment = {};
  const editCommentId = url.searchParams.get("editComment");
  if (editCommentId) {
    try {
      itemComment = await prisma.comment.findFirstOrThrow({
        where: { id: editCommentId }
      });
    } catch (error2) {
      luciaErrors(error2);
      prismaError(error2);
      console.log("error: ", error2);
      throw fail(500, { messgage: "Unknown Error occured" });
    }
  }
  const commentForm = await superValidate(itemComment, commentSchema, { id: "commentForm" });
  return {
    commentForm,
    venue: getVenue()
  };
};
export {
  load
};
