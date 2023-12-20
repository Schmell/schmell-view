import * as server from '../entries/pages/comps/comp/_compId_/merge/_page.server.ts.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/comps/comp/_compId_/merge/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/comps/comp/[compId]/merge/+page.server.ts";
export const imports = ["_app/immutable/nodes/16.67985213.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/forms.eea97056.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/singletons.f8a34b6d.js","_app/immutable/chunks/paths.9f848c40.js","_app/immutable/chunks/navigation.82bf316a.js","_app/immutable/chunks/button.0888a59b.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/index.b20a7130.js","_app/immutable/chunks/Page.1107c6af.js"];
export const stylesheets = ["_app/immutable/assets/Page.6ba75a66.css"];
export const fonts = [];
