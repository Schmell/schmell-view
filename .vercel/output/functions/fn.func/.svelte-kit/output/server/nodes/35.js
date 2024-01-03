import * as server from '../entries/pages/venue/_page.server.ts.js';

export const index = 35;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/venue/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/venue/+page.server.ts";
export const imports = ["_app/immutable/nodes/35.af02faa7.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/each.e5af29b3.js","_app/immutable/chunks/Page.8a61e897.js","_app/immutable/chunks/index.5b6884f2.js","_app/immutable/chunks/like-follow.a5f7e744.js","_app/immutable/chunks/paths.10ba7172.js","_app/immutable/chunks/Icon.8be3835b.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/index.f836e1a8.js","_app/immutable/chunks/control.f2d6eca3.js","_app/immutable/chunks/like-button.a9b19676.js","_app/immutable/chunks/navigation.ff018344.js","_app/immutable/chunks/singletons.6f054266.js"];
export const stylesheets = ["_app/immutable/assets/Page.6ba75a66.css"];
export const fonts = [];
