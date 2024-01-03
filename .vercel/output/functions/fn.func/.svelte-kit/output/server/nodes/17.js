import * as server from '../entries/pages/comps/comp/_compId_/merge/_page.server.ts.js';

export const index = 17;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/comps/comp/_compId_/merge/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/comps/comp/[compId]/merge/+page.server.ts";
export const imports = ["_app/immutable/nodes/17.71c03ffc.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/forms.ca565ccb.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/singletons.ad6f0023.js","_app/immutable/chunks/paths.b72c4b6f.js","_app/immutable/chunks/navigation.0e01e7a5.js","_app/immutable/chunks/button.9befc66f.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/index.5b6884f2.js","_app/immutable/chunks/Page.8a61e897.js"];
export const stylesheets = ["_app/immutable/assets/Page.6ba75a66.css"];
export const fonts = [];
