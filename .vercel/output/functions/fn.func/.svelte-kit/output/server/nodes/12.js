import * as server from '../entries/pages/auth/register/_page.server.ts.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/register/+page.server.ts";
export const imports = ["_app/immutable/nodes/12.43b25e8e.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/index.9b6292cb.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/paths.10ba7172.js","_app/immutable/chunks/form.6a1e0de9.js","_app/immutable/chunks/navigation.ff018344.js","_app/immutable/chunks/singletons.6f054266.js","_app/immutable/chunks/index.5b6884f2.js","_app/immutable/chunks/stores.cbd0c8a7.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/forms.df2bde72.js","_app/immutable/chunks/prod-browser.020bfb54.js","_app/immutable/chunks/index.f836e1a8.js","_app/immutable/chunks/control.f2d6eca3.js","_app/immutable/chunks/index.0ec66d4d.js","_app/immutable/chunks/input.24524b2c.js","_app/immutable/chunks/button.9befc66f.js","_app/immutable/chunks/Page.8a61e897.js"];
export const stylesheets = ["_app/immutable/assets/ItemCard.9e4bf529.css","_app/immutable/assets/form.cdc68221.css","_app/immutable/assets/Page.6ba75a66.css"];
export const fonts = [];