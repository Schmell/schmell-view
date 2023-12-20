import { s as superValidate } from "../../../../chunks/superValidate.js";
import { z } from "zod";
const commentSchema = z.object({
  comment: z.string().max(256).nullish(),
  type: z.string(),
  eventComentId: z.string(),
  id: z.string().optional()
});
const load = async ({ locals, params, url }) => {
  async function getSeries() {
    try {
      return await prisma.series.findUnique({
        where: { id: params.seriesId },
        include: {
          Events: {
            select: { name: true, id: true, createdAt: true, complete: true, public: true }
          },
          Organization: true,
          Venues: true,
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
          _count: { select: { Likes: true, Follows: true, Comments: true } }
        }
      });
    } catch (error) {
      console.log("error: ", error);
      throw error(500, { messasge: "error" });
    }
  }
  const commentForm = await superValidate(commentSchema, { id: "commentForm" });
  return {
    commentForm,
    series: getSeries()
  };
};
export {
  load
};
