import { f as fail } from "../../../../chunks/index.js";
import "../../../../chunks/debug.js";
import { p as prisma } from "../../../../chunks/prisma.js";
const actions = {
  comment: async ({ locals, request, getClientAddress }) => {
    const session = await locals.auth.validate();
    if (!session)
      throw fail(401, { message: "Not authorised to comment" });
    const formObj = Object.fromEntries(await request.formData());
    const { id, type, itemId, comment } = formObj;
    if (comment.length >= 2) {
      await createComment();
    } else {
      return null;
    }
    async function createComment() {
      const data = generateUpsert(id);
      try {
        return await prisma.comment.upsert({ ...data });
      } catch (error) {
        console.log("error: ", error);
      }
    }
    function generateUpsert(id2) {
      let commentType;
      switch (type) {
        case "event":
          commentType = {
            type: "event",
            Event: { connect: { id: itemId } }
          };
          break;
        case "race":
          commentType = {
            type: "race",
            Race: { connect: { id: itemId } }
          };
          break;
        case "comp":
          commentType = {
            type: "comp",
            Comp: { connect: { id: itemId } }
          };
          break;
        case "series":
          commentType = {
            type: "series",
            Series: { connect: { id: itemId } }
          };
          break;
        case "organization":
          commentType = {
            type: "organization",
            Organization: { connect: { id: itemId } }
          };
          break;
        case "venue":
          commentType = {
            type: "venue",
            Venue: { connect: { id: itemId } }
          };
          break;
      }
      return {
        where: { id: id2 ?? "" },
        update: {
          comment,
          ...commentType
        },
        create: {
          comment,
          ...commentType,
          User: { connect: { id: session?.user.userId } }
        }
      };
    }
  },
  delete: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    if (!session)
      throw fail(500, { message: "Unauthorized" });
    const { id } = Object.fromEntries(await request.formData());
    if (!id)
      return;
    try {
      await prisma.comment.delete({
        where: { id }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }
};
export {
  actions
};
