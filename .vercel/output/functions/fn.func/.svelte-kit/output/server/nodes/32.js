import * as server from '../entries/pages/series/_seriesId_/_page.server.ts.js';

export const index = 32;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/series/_seriesId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/series/[seriesId]/+page.server.ts";
export const imports = ["_app/immutable/nodes/32.2cbcd02c.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/await_block.df8e621d.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/each.e5af29b3.js","_app/immutable/chunks/stores.b0332cd2.js","_app/immutable/chunks/singletons.f8a34b6d.js","_app/immutable/chunks/paths.9f848c40.js","_app/immutable/chunks/Page.1107c6af.js","_app/immutable/chunks/index.b20a7130.js","_app/immutable/chunks/like-follow.afc69a09.js","_app/immutable/chunks/Icon.8be3835b.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/index.f836e1a8.js","_app/immutable/chunks/control.f2d6eca3.js","_app/immutable/chunks/like-button.2b1ea16a.js","_app/immutable/chunks/navigation.82bf316a.js","_app/immutable/chunks/comments.9f0b5452.js","_app/immutable/chunks/forms.eea97056.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/like-count.ca442c40.js","_app/immutable/chunks/formatters.8e53af36.js","_app/immutable/chunks/index.92f1b852.js","_app/immutable/chunks/form.be75c675.js","_app/immutable/chunks/prod-browser.020bfb54.js","_app/immutable/chunks/input.b0365756.js","_app/immutable/chunks/client.3119d533.js"];
export const stylesheets = ["_app/immutable/assets/ItemCard.9e4bf529.css","_app/immutable/assets/Page.6ba75a66.css","_app/immutable/assets/form.cdc68221.css"];
export const fonts = [];
