import { p as prisma } from "../../../chunks/prisma.js";
import { f as fail } from "../../../chunks/index.js";
import { r as redirect, s as setFlash } from "../../../chunks/server.js";
const load = async (event) => {
  const { locals, url } = event;
  const session = await locals.auth.validate();
  if (!session) {
    throw redirect(
      302,
      `/auth/login?from=${url.pathname}`,
      { type: "error", message: "Not Authorised" },
      event
    );
  }
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
  async function getEventsCount() {
    try {
      return await prisma.event.count({ where: getWhere() });
    } catch (error) {
      console.log("error: ", error);
    }
  }
  async function getEvents() {
    try {
      return await prisma.event.findMany({
        where: getWhere(),
        orderBy: sort(),
        select: {
          id: true,
          publisherId: true,
          name: true,
          venueName: true,
          description: true,
          createdAt: true,
          Publisher: { select: { id: true, username: true, avatar: true } },
          Organization: { select: { name: true, id: true } },
          Venue: { select: { name: true, id: true } },
          Follows: true,
          Likes: { select: { id: true, eventId: true, userId: true } },
          _count: { select: { Likes: true, Follows: true } }
        },
        skip: Number(skip ?? 0),
        take: Number(take ?? 10)
      });
    } catch (error) {
      throw fail(500, { message: "Get event Fail", error: error.message });
    }
  }
  function sort() {
    let sort2 = {};
    const sortBy = url.searchParams.get("sortBy") ?? "createdAt";
    const sortOrder = url.searchParams.get("sortOrder") ?? "desc";
    if (sortBy === "org") {
      return { Organization: { name: "asc" } };
    } else if (sortBy === "venue") {
      return { Venue: { name: "asc" } };
    } else {
      sort2[sortBy] = sortOrder;
      return sort2;
    }
  }
  return {
    title,
    events: getEvents(),
    count: getEventsCount(),
    awaited: {
      events: getEvents()
    }
  };
};
const actions = {
  sortByOrg: async () => {
    try {
      return await prisma.organization.findMany({
        orderBy: { name: "asc" }
      });
    } catch (error) {
      console.log("error: ", error);
      return fail(500, { message: "Sort By Org Fail" });
    }
  },
  deleteEvent: async (event) => {
    const { locals, url } = event;
    const session = locals.auth.validate();
    if (!session)
      throw redirect(307, `/auth/login?from=${url.pathname}${url.search}`);
    const itemId = url.searchParams.get("itemId") ?? "";
    try {
      await prisma.comp.deleteMany({
        where: { Events: { every: { id: itemId } } }
      });
      await prisma.event.delete({
        where: { id: itemId }
      });
    } catch (error) {
      console.log("error: ", error);
    }
    const message = { type: "success", message: "Event was deleted" };
    setFlash(message, event);
  }
};
export {
  actions,
  load
};
