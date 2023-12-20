import { B as Blw, P as Populate } from "../../../../chunks/index5.js";
import { p as prisma } from "../../../../chunks/prisma.js";
import csv from "csvtojson";
import { p as prismaError } from "../../../../chunks/prisma-errors.js";
import "../../../../chunks/index.js";
import "../../../../chunks/debug.js";
import { r as redirect } from "../../../../chunks/server.js";
const load = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) {
    throw redirect(302, "/");
  }
  async function getOrgs() {
    try {
      return await prisma.organization.findMany({
        where: { ownerId: session?.user.userId },
        select: { name: true, id: true }
      });
    } catch (error) {
      prismaError(error);
      console.log("error: ", error);
    }
  }
  return {
    orgs: await getOrgs()
  };
};
const actions = {
  setOrg: async ({ locals, request }) => {
    await locals.auth.validate();
    Object.fromEntries(await request.formData());
  },
  newImport: async (event) => {
    const { request, locals, url } = event;
    const session = await locals.auth.validate();
    if (!session)
      throw redirect(
        `/auth/login?from=${url.pathname}`,
        { type: "error", message: "Not Authorised" },
        event
      );
    const formData = await request.formData();
    const file = formData.get("file");
    const orgId = formData.get("orgId");
    const csvArray = await csv({ noheader: true, output: "csv" }).fromString(await file.text());
    const blw = new Blw({ data: csvArray, file });
    const { uniqueIdString } = blw.getEvent();
    const duplicate = await prisma.event.findUnique({
      where: { uniqueIdString },
      select: { id: true }
    });
    if (duplicate) {
      throw redirect(
        `/import/update${url.search}&duplicate=1&eventId=${duplicate.id}`,
        { type: "error", message: "Duplicate entry" },
        event
      );
    }
    await Populate({
      blw,
      userId: session.user.userId,
      orgId
    });
    throw redirect(300, `/events`);
  },
  update: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    const formData = Object.fromEntries(await request.formData());
    const { org, file } = formData;
    const csvArray = await csv({ noheader: true, output: "csv" }).fromString(await file.text());
    const blw = new Blw({ data: csvArray });
    await Populate({
      blw,
      userId: session?.user.userId,
      orgId: org
    });
    throw redirect(300, `/events`);
  }
};
export {
  actions,
  load
};
