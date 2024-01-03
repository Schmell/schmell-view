import * as server from '../entries/pages/comps/comp/_compId_/edit/_page.server.ts.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/comps/comp/_compId_/edit/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/comps/comp/[compId]/edit/+page.server.ts";
export const imports = ["_app/immutable/nodes/16.1ee87c96.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/index.95d85815.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/paths.b72c4b6f.js","_app/immutable/chunks/form.e9574494.js","_app/immutable/chunks/navigation.0e01e7a5.js","_app/immutable/chunks/singletons.ad6f0023.js","_app/immutable/chunks/index.5b6884f2.js","_app/immutable/chunks/stores.48d4344b.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/forms.ca565ccb.js","_app/immutable/chunks/prod-browser.020bfb54.js","_app/immutable/chunks/index.f836e1a8.js","_app/immutable/chunks/control.f2d6eca3.js","_app/immutable/chunks/textarea.868d061c.js","_app/immutable/chunks/input.cf3d235e.js","_app/immutable/chunks/button.9befc66f.js","_app/immutable/chunks/Page.8a61e897.js","_app/immutable/chunks/index.0ec66d4d.js","_app/immutable/chunks/client.ffb0322b.js"];
export const stylesheets = ["_app/immutable/assets/form.cdc68221.css","_app/immutable/assets/Page.6ba75a66.css"];
export const fonts = [];
