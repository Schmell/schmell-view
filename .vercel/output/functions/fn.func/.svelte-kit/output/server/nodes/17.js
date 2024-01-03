import * as server from '../entries/pages/comps/_eventId_/_page.server.ts.js';

export const index = 17;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/comps/_eventId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/comps/[eventId]/+page.server.ts";
export const imports = ["_app/immutable/nodes/17.322b540d.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/each.e5af29b3.js","_app/immutable/chunks/Page.8a61e897.js","_app/immutable/chunks/index.5b6884f2.js","_app/immutable/chunks/ItemCard.bd1a73ab.js","_app/immutable/chunks/navigation.ff018344.js","_app/immutable/chunks/singletons.6f054266.js","_app/immutable/chunks/paths.10ba7172.js","_app/immutable/chunks/formatters.8e53af36.js","_app/immutable/chunks/Icon.8be3835b.js","_app/immutable/chunks/spread.8a54911c.js"];
export const stylesheets = ["_app/immutable/assets/Page.6ba75a66.css","_app/immutable/assets/ItemCard.9e4bf529.css"];
export const fonts = [];
