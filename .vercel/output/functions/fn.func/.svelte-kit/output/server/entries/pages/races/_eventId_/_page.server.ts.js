import { p as prisma } from "../../../../chunks/prisma.js";
import { e as error } from "../../../../chunks/index.js";
const load = async ({ params }) => {
  const getEvent = async () => {
    try {
      return prisma.event.findUniqueOrThrow({
        where: { id: params.eventId },
        include: { Races: true }
      });
    } catch (err) {
      console.error("error: ", err);
      throw error(418, "error");
    }
  };
  return {
    event: getEvent()
    // race: getRace()
  };
};
export {
  load
};
