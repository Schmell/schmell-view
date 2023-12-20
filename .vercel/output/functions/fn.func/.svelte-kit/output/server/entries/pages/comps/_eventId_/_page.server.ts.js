import { p as prisma } from "../../../../chunks/prisma.js";
const load = async ({ params }) => {
  const getComps = async () => {
    try {
      return await prisma.comp.findMany({
        where: {
          Events: { every: { id: params.eventId } }
        },
        orderBy: [
          {
            boat: "asc"
          }
        ]
      });
    } catch (error) {
      console.error("error: ", error);
    }
  };
  return {
    comps: getComps()
  };
};
export {
  load
};
