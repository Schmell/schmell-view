import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.dd16acc7.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/stores.b0332cd2.js","_app/immutable/chunks/singletons.f8a34b6d.js","_app/immutable/chunks/paths.9f848c40.js","_app/immutable/chunks/index.b20a7130.js","_app/immutable/chunks/Icon.8be3835b.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/client.3119d533.js","_app/immutable/chunks/prod-browser.020bfb54.js","_app/immutable/chunks/navigation.82bf316a.js"];
export const stylesheets = ["_app/immutable/assets/0.31b8ccc3.css"];
export const fonts = [];
