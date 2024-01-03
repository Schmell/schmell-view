

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.64bb676b.js","_app/immutable/chunks/scheduler.60fdcb34.js","_app/immutable/chunks/index.c7b4b125.js","_app/immutable/chunks/stores.48d4344b.js","_app/immutable/chunks/singletons.ad6f0023.js","_app/immutable/chunks/paths.b72c4b6f.js"];
export const stylesheets = [];
export const fonts = [];
