import { p as prisma } from "../../../../../chunks/prisma.js";
import "../../../../../chunks/index.js";
const load = async ({ params }) => {
  const getComp = async () => {
    try {
      return await prisma.comp.findUniqueOrThrow({
        where: { id: params.compId },
        include: { Publisher: true }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return {
    comp: getComp()
  };
};
const actions = {
  getEvents: async ({ locals, params, url }) => {
    async function getEvents() {
      try {
        return await prisma.comp.findUnique({
          where: { id: params.compId },
          select: {
            Events: {
              include: {
                Races: {
                  orderBy: { name: "asc" },
                  include: {
                    Results: { where: { compId: params.compId } }
                  }
                }
              }
            }
          }
        });
      } catch (error) {
        console.log("error: ", error);
        return {
          Events: [null]
        };
      }
    }
    return {
      compEvents: await getEvents()
    };
  }
};
export {
  actions,
  load
};
