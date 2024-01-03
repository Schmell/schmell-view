import { r as redirect, f as fail } from "../../../../../chunks/index.js";
import { s as superValidate } from "../../../../../chunks/superValidate.js";
import { s as seriesSchema } from "../../../../../chunks/seriesSchema.js";
const load = async ({ locals, params, url }) => {
  const session = await locals.auth.validate();
  if (!session)
    throw redirect(307, `/auth/login?from=${url.pathname}`);
  async function getSeries() {
    try {
      return await prisma.series.findUnique({
        where: { id: params.seriesId },
        include: {
          Events: { select: { id: true, name: true } }
        }
      });
    } catch (error) {
      console.log("error: ", error);
      throw error(404, { message: "not found" });
    }
  }
  async function getOrgs() {
    try {
      return await prisma.organization.findMany({
        where: { ownerId: session?.user.userId },
        select: {
          id: true,
          name: true
        }
      });
    } catch (error) {
      throw error(404, { message: "not found" });
    }
  }
  async function getEvents() {
    try {
      return await prisma.event.findMany({
        where: {
          OR: [{ publisherId: session?.user.userId }],
          NOT: { Series: { id: params.seriesId } }
        },
        select: {
          id: true,
          name: true
        }
      });
    } catch (error) {
      throw error(404, { message: "not found" });
    }
  }
  if (params.seriesId === "new") {
    return {
      orgs: getOrgs(),
      events: getEvents(),
      form: await superValidate({ name: "new" }, seriesSchema)
    };
  }
  return {
    orgs: getOrgs(),
    events: getEvents(),
    form: superValidate(await getSeries(), seriesSchema)
  };
};
const actions = {
  series: async ({ locals, params, request, url }) => {
    const session = await locals.auth.validate();
    if (!session)
      throw redirect(307, `/auth/login?from=${url.pathname}`);
    const form = await superValidate(request, seriesSchema);
    if (!form.valid) {
      return fail(400, { form });
    }
    const { Events, organizationId, ...rest } = form.data;
    try {
      await prisma.series.upsert({
        where: { id: params.seriesId },
        update: {
          ...rest,
          Organization: { connect: { id: organizationId ?? "" } }
        },
        create: {
          ...rest,
          Publisher: { connect: { id: session.user.userId } },
          Organization: { connect: { id: organizationId ?? "" } }
        }
      });
    } catch (error) {
      console.log("error: ", error);
      return { form };
    }
    return { form };
  },
  addEvent: async ({ params, url }) => {
    const eventId = url.searchParams.get("eventId");
    if (!eventId)
      return null;
    try {
      await prisma.series.update({
        where: { id: params.seriesId },
        data: {
          Events: { connect: { id: eventId } }
        }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  },
  deleteEvent: async ({ params, url }) => {
    const eventId = url.searchParams.get("eventId");
    if (!eventId)
      return null;
    try {
      await prisma.series.update({
        where: { id: params.seriesId },
        data: {
          Events: { disconnect: { id: eventId } }
        }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }
};
export {
  actions,
  load
};
