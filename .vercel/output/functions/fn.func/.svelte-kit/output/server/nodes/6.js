import * as server from '../entries/pages/auth/email-verification/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/email-verification/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/email-verification/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.d983746b.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/forms.eea97056.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/singletons.f8a34b6d.js","_app/immutable/chunks/paths.9f848c40.js","_app/immutable/chunks/navigation.82bf316a.js","_app/immutable/chunks/Page.1107c6af.js","_app/immutable/chunks/index.b20a7130.js"];
export const stylesheets = ["_app/immutable/assets/ItemCard.9e4bf529.css","_app/immutable/assets/Page.6ba75a66.css"];
export const fonts = [];
