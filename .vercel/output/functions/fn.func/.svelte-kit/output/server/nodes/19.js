import * as server from '../entries/pages/events/_page.server.ts.js';

export const index = 19;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/events/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/events/+page.server.ts";
export const imports = ["_app/immutable/nodes/19.50eef9ee.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/await_block.df8e621d.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/each.e5af29b3.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/forms.ca565ccb.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/singletons.ad6f0023.js","_app/immutable/chunks/paths.b72c4b6f.js","_app/immutable/chunks/navigation.0e01e7a5.js","_app/immutable/chunks/stores.48d4344b.js","_app/immutable/chunks/Page.8a61e897.js","_app/immutable/chunks/index.5b6884f2.js","_app/immutable/chunks/ItemCard.6ce79eb5.js","_app/immutable/chunks/like-count.b0e23089.js","_app/immutable/chunks/Icon.8be3835b.js","_app/immutable/chunks/index.f836e1a8.js","_app/immutable/chunks/control.f2d6eca3.js","_app/immutable/chunks/action.a3a574a1.js","_app/immutable/chunks/create.55e526e2.js"];
export const stylesheets = ["_app/immutable/assets/Page.6ba75a66.css","_app/immutable/assets/ItemCard.9e4bf529.css"];
export const fonts = [];
