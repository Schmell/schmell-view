import { p as prisma } from "../../../../chunks/prisma.js";
import { r as redirect, f as fail } from "../../../../chunks/index.js";
import { U as UserSettingsSchema } from "../../../../chunks/InputJsonValueSchema.js";
import { s as superValidate } from "../../../../chunks/superValidate.js";
let ssr = false;
const load = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session?.user) {
    throw redirect(300, "/auth/login");
  }
  const userSettings = await prisma.userSettings.findFirst({
    where: { userId: session.user.userId }
  });
  const form = await superValidate(userSettings, UserSettingsSchema);
  return { form };
};
const actions = {
  default: async ({ locals, request, cookies, url }) => {
    const session = await locals.auth.validate();
    let newTheme = "";
    if (!(session?.user && session)) {
      throw redirect(302, "/");
    }
    const form = await superValidate(request, UserSettingsSchema);
    if (form.data.theme) {
      cookies.set("colorTheme", form.data.theme, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365
      });
      newTheme = form.data.theme;
    }
    try {
      await prisma.userSettings.upsert({
        where: { userId: session.user.userId },
        update: {
          language: form.data.language,
          theme: form.data.theme
        },
        create: {
          language: form.data.language,
          theme: form.data.theme,
          user: {
            connect: { id: session.user.userId }
          }
        }
      });
    } catch (error2) {
      console.log("error: ", error2);
      return fail(400, { message: "Fail on settings save" });
    }
    console.log("url.searchParams.get(from): ", url.searchParams.get("from"));
    throw redirect(301, `${url.searchParams.get("from")}?theme=${newTheme}`);
  }
};
export {
  actions,
  load,
  ssr
};
