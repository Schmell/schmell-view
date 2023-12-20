import * as server from '../entries/pages/comps/_eventId_/_page.server.ts.js';

export const index = 17;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/comps/_eventId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/comps/[eventId]/+page.server.ts";
export const imports = ["_app/immutable/nodes/17.ce078447.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/each.e5af29b3.js","_app/immutable/chunks/Page.1107c6af.js","_app/immutable/chunks/index.b20a7130.js","_app/immutable/chunks/ItemCard.b8ad2ed8.js","_app/immutable/chunks/navigation.82bf316a.js","_app/immutable/chunks/singletons.f8a34b6d.js","_app/immutable/chunks/paths.9f848c40.js","_app/immutable/chunks/formatters.8e53af36.js","_app/immutable/chunks/Icon.8be3835b.js","_app/immutable/chunks/spread.8a54911c.js"];
export const stylesheets = ["_app/immutable/assets/Page.6ba75a66.css","_app/immutable/assets/ItemCard.9e4bf529.css"];
export const fonts = [];
