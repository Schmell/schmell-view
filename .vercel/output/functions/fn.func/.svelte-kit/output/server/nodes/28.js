import * as server from '../entries/pages/policy/_page.server.ts.js';

export const index = 28;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/policy/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/policy/+page.server.ts";
export const imports = ["_app/immutable/nodes/28.220f013f.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/Page.8a61e897.js","_app/immutable/chunks/index.5b6884f2.js","_app/immutable/chunks/paths.b72c4b6f.js"];
export const stylesheets = ["_app/immutable/assets/ItemCard.9e4bf529.css","_app/immutable/assets/Page.6ba75a66.css"];
export const fonts = [];
