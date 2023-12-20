import * as server from '../entries/pages/events/_page.server.ts.js';

export const index = 18;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/events/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/events/+page.server.ts";
export const imports = ["_app/immutable/nodes/18.8171d741.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/await_block.df8e621d.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/each.e5af29b3.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/forms.eea97056.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/singletons.f8a34b6d.js","_app/immutable/chunks/paths.9f848c40.js","_app/immutable/chunks/navigation.82bf316a.js","_app/immutable/chunks/stores.b0332cd2.js","_app/immutable/chunks/Page.1107c6af.js","_app/immutable/chunks/index.b20a7130.js","_app/immutable/chunks/ItemCard.b8ad2ed8.js","_app/immutable/chunks/like-count.ca442c40.js","_app/immutable/chunks/Icon.8be3835b.js","_app/immutable/chunks/index.f836e1a8.js","_app/immutable/chunks/control.f2d6eca3.js","_app/immutable/chunks/action.9792744f.js","_app/immutable/chunks/create.c861e22c.js"];
export const stylesheets = ["_app/immutable/assets/Page.6ba75a66.css","_app/immutable/assets/ItemCard.9e4bf529.css"];
export const fonts = [];
