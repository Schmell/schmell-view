import { p as prisma } from "../../../../chunks/prisma.js";
import { f as fail } from "../../../../chunks/index.js";
const load = async ({ params }) => {
  if (!params.raceId)
    throw fail(307, { message: "No Race Id Provided" });
  async function getRace() {
    return await prisma.race.findFirst({
      where: { id: params.raceId },
      include: { Event: true }
    });
  }
  async function getResults() {
    try {
      return await prisma.result.findMany({
        where: { raceId: params.raceId },
        include: { Comp: true },
        orderBy: { points: "asc" }
      });
    } catch (error) {
      console.error("error: ", error);
    }
  }
  return {
    results: await getResults(),
    race: await getRace()
  };
};
export {
  load
};
