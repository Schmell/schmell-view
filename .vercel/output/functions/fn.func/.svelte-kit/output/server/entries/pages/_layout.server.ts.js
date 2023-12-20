import { l as loadFlash } from "../../chunks/server.js";
const load = loadFlash(async ({ locals, cookies }) => {
  const session = await locals.auth.validate();
  cookies.get("colorTheme");
  return { user: session?.user };
});
export {
  load
};
