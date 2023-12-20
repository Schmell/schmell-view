import { f as fail } from "../../../chunks/index.js";
import { p as prisma } from "../../../chunks/prisma.js";
const load = async ({ url }) => {
  const skip = url.searchParams.get("skip");
  const take = url.searchParams.get("take");
  const whereType = url.searchParams.get("whereType");
  const whereId = url.searchParams.get("whereId");
  const title = url.searchParams.get("title");
  function getWhere() {
    if (whereType && whereId) {
      const where = {};
      where[whereType] = whereId;
      return where;
    }
    return {};
  }
  function sort() {
    let sort2 = {};
    const sortBy = url.searchParams.get("sortBy") ?? "createdAt";
    const sortOrder = url.searchParams.get("sortOrder") ?? "asc";
    if (sortBy === "org") {
      return { Organization: { name: "asc" } };
    } else if (sortBy === "venue") {
      return { Venue: { name: "asc" } };
    } else if (sortBy === "event") {
      return { Event: { name: "asc" } };
    } else {
      sort2[sortBy] = sortOrder;
      return sort2;
    }
  }
  async function getRaces() {
    try {
      return await prisma.$transaction([
        prisma.race.findMany({
          where: getWhere(),
          orderBy: sort(),
          include: {
            Event: {
              select: {
                id: true,
                name: true,
                Venue: { select: { id: true, name: true } },
                Organization: { select: { id: true, name: true } }
              }
            }
          },
          skip: Number(skip ?? 0),
          take: Number(take ?? 10)
        }),
        prisma.race.count({ where: getWhere() })
      ]);
    } catch (error2) {
      console.log("error: ", error2);
      throw fail(500, { message: "Get event Fail", error: error2.message });
    }
  }
  const [races, count] = await getRaces();
  return {
    count,
    title,
    races
  };
};
export {
  load
};
