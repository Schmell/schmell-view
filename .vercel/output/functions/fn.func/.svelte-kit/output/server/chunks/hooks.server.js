import { a as auth } from "./lucia.js";
function sequence(...handlers) {
  const length = handlers.length;
  if (!length)
    return ({ event, resolve }) => resolve(event);
  return ({ event, resolve }) => {
    return apply_handle(0, event, {});
    function apply_handle(i, event2, parent_options) {
      const handle2 = handlers[i];
      return handle2({
        event: event2,
        resolve: (event3, options) => {
          const transformPageChunk = async ({ html, done }) => {
            if (options?.transformPageChunk) {
              html = await options.transformPageChunk({ html, done }) ?? "";
            }
            if (parent_options?.transformPageChunk) {
              html = await parent_options.transformPageChunk({ html, done }) ?? "";
            }
            return html;
          };
          const filterSerializedResponseHeaders = parent_options?.filterSerializedResponseHeaders ?? options?.filterSerializedResponseHeaders;
          const preload = parent_options?.preload ?? options?.preload;
          return i < length - 1 ? apply_handle(i + 1, event3, {
            transformPageChunk,
            filterSerializedResponseHeaders,
            preload
          }) : resolve(event3, { transformPageChunk, filterSerializedResponseHeaders, preload });
        }
      });
    }
  };
}
const luciaHandle = async ({ event, resolve }) => {
  event.locals.auth = auth.handleRequest(event);
  return await resolve(event);
};
const themeHandle = async ({ resolve, event }) => {
  let theme = null;
  const newTheme = event.url.searchParams.get("theme");
  const cookieTheme = event.cookies.get("colorTheme");
  if (cookieTheme) {
    theme = cookieTheme;
  } else if (newTheme) {
    theme = newTheme;
  }
  if (theme) {
    return await resolve(event, {
      transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
    });
  }
  return resolve(event);
};
const handle = sequence(luciaHandle, themeHandle);
export {
  handle,
  luciaHandle,
  themeHandle
};
