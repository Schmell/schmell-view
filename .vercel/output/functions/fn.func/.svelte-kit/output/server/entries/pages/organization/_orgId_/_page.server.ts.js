import { l as luciaErrors } from "../../../../chunks/lucia-errors.js";
import { p as prisma } from "../../../../chunks/prisma.js";
import { f as fail } from "../../../../chunks/index.js";
import { s as superValidate } from "../../../../chunks/superValidate.js";
import { z } from "zod";
const commentSchema = z.object({
  comment: z.string().max(256).nullish(),
  type: z.string(),
  eventComentId: z.string(),
  id: z.string().optional()
});
const load = async ({ params, url }) => {
  const getOrg = async () => {
    try {
      return await prisma.organization.findUniqueOrThrow({
        where: { id: params.orgId },
        include: {
          Events: {
            include: {
              Races: true,
              Organization: true,
              Comments: { include: { User: true } },
              Likes: true,
              Follows: true
            }
          },
          _count: { select: { Comments: true, Likes: true } },
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
          Owner: true,
          Addresses: true
        }
      });
    } catch (error) {
      console.error("error: ", error);
    }
  };
  let eventComment = {};
  const editCommentId = url.searchParams.get("editComment");
  if (editCommentId) {
    try {
      eventComment = await prisma.comment.findFirstOrThrow({
        where: { id: editCommentId }
      });
    } catch (error) {
      luciaErrors(error);
      console.log("error: ", error);
      throw fail(500, { messgage: "Unknown Error occured" });
    }
  }
  const commentForm = await superValidate(eventComment, commentSchema, { id: "commentForm" });
  return {
    commentForm,
    org: getOrg()
  };
};
export {
  load
};
