import * as server from '../entries/pages/auth/email-verification/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/email-verification/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/email-verification/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.bf334807.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/forms.df2bde72.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/singletons.6f054266.js","_app/immutable/chunks/paths.10ba7172.js","_app/immutable/chunks/navigation.ff018344.js","_app/immutable/chunks/Page.8a61e897.js","_app/immutable/chunks/index.5b6884f2.js"];
export const stylesheets = ["_app/immutable/assets/ItemCard.9e4bf529.css","_app/immutable/assets/Page.6ba75a66.css"];
export const fonts = [];
