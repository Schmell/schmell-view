import { p as prisma } from "../../../../../chunks/prisma.js";
import { c as capitalizeFirstLetter } from "../../../../../chunks/index3.js";
import { Prisma } from "@prisma/client";
import { f as fail } from "../../../../../chunks/index.js";
import { s as superValidate } from "../../../../../chunks/superValidate.js";
import { z } from "zod";
const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  tag: z.string().nullish(),
  website: z.string().nullish(),
  email: z.string().nullish(),
  /**
   * .url
   */
  logo: z.string().nullish(),
  titleImage: z.string().nullish(),
  ownerId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish()
});
const load = async ({ params, url }) => {
  if (params.orgId === "new") {
    const org2 = { name: "New Organization" };
    const form2 = await superValidate(org2, OrganizationSchema);
    return { form: form2 };
  }
  const org = await prisma.organization.findFirst({
    where: { id: params.orgId },
    include: { Owner: true }
  });
  const form = await superValidate(org, OrganizationSchema);
  return { form };
};
const actions = {
  default: async ({ request, locals, url }) => {
    const session = await locals.auth.validate();
    if (!session)
      throw fail(400, { message: "Not authorised to edit organization" });
    const form = await superValidate(request, OrganizationSchema);
    if (!form.valid)
      ;
    try {
      const { name, description, website, email, titleImage, logo } = form.data;
      await prisma.organization.upsert({
        where: { name },
        update: { name, description, website, email, titleImage, logo },
        create: {
          name,
          description,
          website,
          email,
          titleImage,
          logo,
          Owner: {
            connect: { id: session.user.userId }
          }
        }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log("prisma known error: ", form);
        if (error.code === "P2002") {
          const propName = e.meta?.target[0];
          form.valid = false;
          console.log("form.data[propName]: ", form.data[propName]);
          form.errors[propName] = `${capitalizeFirstLetter(propName)} is already registered`;
          return fail(400, {
            form
          });
        }
        if (error.code === "P1001") {
          console.log(" Cant reach database server: ", error.message);
          return fail(503, {
            message: error.message
          });
        }
      }
      console.log("error: ", error);
      return { form };
    }
    return { form };
  }
};
export {
  actions,
  load
};
