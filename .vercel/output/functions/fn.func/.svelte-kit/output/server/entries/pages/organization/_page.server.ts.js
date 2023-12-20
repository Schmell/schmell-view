import { p as prisma } from "../../../chunks/prisma.js";
import { f as fail } from "../../../chunks/index.js";
const load = async ({ locals }) => {
  await locals.auth.validate();
  const getOrgs = async () => {
    try {
      return await prisma.organization.findMany({
        include: { Owner: { select: { id: true, username: true } } }
      });
    } catch (error) {
      console.log("error: ", error);
      throw fail(500, { message: "oh crap" });
    }
  };
  const orgs = await getOrgs();
  return {
    orgs
  };
};
export {
  load
};
