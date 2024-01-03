import { z } from "zod";
import csv from "csvtojson";
import { p as prisma } from "../../../chunks/prisma.js";
import { B as Blw, P as Populate } from "../../../chunks/index5.js";
import "../../../chunks/index.js";
import "../../../chunks/debug.js";
import { r as redirect } from "../../../chunks/server.js";
z.object({
  file: z.any(),
  org: z.string()
});
const load = async (event) => {
  const session = await event.locals.auth.validate();
  if (!session) {
    throw redirect(302, "/", { type: "error", message: "Not Authorised" }, event);
  }
  async function getOrgs() {
    try {
      return await prisma.organization.findMany({
        where: { ownerId: session?.userId },
        select: { name: true, id: true }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }
  return { orgs: getOrgs() };
};
const actions = {
  setOrgId: async ({ locals, request }) => {
    await locals.auth.validate();
    const formObj = Object.fromEntries(await request.formData());
    console.log("formObj: ", formObj);
  },
  newImport: async (event) => {
    const { request, locals, url } = event;
    const session = await locals.auth.validate();
    const formData = await request.formData();
    const { org, file } = Object.fromEntries(formData);
    const csvArray = await csv({ noheader: true, output: "csv", ignoreEmpty: true }).fromString(
      await file.text()
    );
    const blw = new Blw({ data: csvArray, file });
    const { uniqueIdString } = blw.getEvent();
    const duplicate = await prisma.event.findFirst({
      where: { uniqueIdString },
      select: { id: true }
    });
    if (duplicate) {
      throw redirect(
        `/import/update?${url.search}&duplicate=1&eventId=${duplicate.id}`,
        { type: "error", message: "Duplicate Event" },
        event
      );
    }
    await Populate({
      blw,
      userId: session?.user.userId,
      orgId: org
    });
    throw redirect(300, `/events`, { type: "success", message: "Event added" }, event);
  },
  update: async (event) => {
    const session = await event.locals.auth.validate();
    const formData = Object.fromEntries(await event.request.formData());
    const { org, file } = formData;
    const csvArray = await csv({ noheader: true, output: "csv" }).fromString(await file.text());
    const blw = new Blw({ data: csvArray });
    await Populate({
      blw,
      userId: session?.user.userId,
      orgId: org
    });
    throw redirect(300, `/events`, { type: "success", message: "Event Updated" }, event);
  }
};
export {
  actions,
  load
};
