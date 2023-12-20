import * as server from '../entries/pages/venue/_page.server.ts.js';

export const index = 35;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/venue/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/venue/+page.server.ts";
export const imports = ["_app/immutable/nodes/35.b93dd49a.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/each.e5af29b3.js","_app/immutable/chunks/Page.1107c6af.js","_app/immutable/chunks/index.b20a7130.js","_app/immutable/chunks/like-follow.afc69a09.js","_app/immutable/chunks/paths.9f848c40.js","_app/immutable/chunks/Icon.8be3835b.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/index.f836e1a8.js","_app/immutable/chunks/control.f2d6eca3.js","_app/immutable/chunks/like-button.2b1ea16a.js","_app/immutable/chunks/navigation.82bf316a.js","_app/immutable/chunks/singletons.f8a34b6d.js"];
export const stylesheets = ["_app/immutable/assets/Page.6ba75a66.css"];
export const fonts = [];
