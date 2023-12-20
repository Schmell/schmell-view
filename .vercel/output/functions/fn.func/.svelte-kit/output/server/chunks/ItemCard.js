import { c as create_ssr_component, e as escape, w as null_to_empty, b as add_attribute } from "./ssr.js";
import { a as cn } from "./index3.js";
/* empty css                                        */const css = {
  code: ".smaller.svelte-11z8bik.svelte-11z8bik{@apply text-xl;}.item-card.svelte-11z8bik.svelte-11z8bik{@apply bg-base-100 shadow-md;;@apply border-x-base-300 border-t-base-100 border-b-base-300;;min-height:8em;border-width:1px;border-bottom-right-radius:2em;border-top-left-radius:1em;border-bottom-width:0.25em;border-top-width:1px;border-left-width:1px}.item-card.svelte-11z8bik>header.svelte-11z8bik{@apply flex justify-between pb-0 text-xl font-semibold;;cursor:pointer;user-select:none}",
  map: null
};
const ItemCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { href } = $$props;
  let { class: _class = void 0 } = $$props;
  let slot;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.class === void 0 && $$bindings.class && _class !== void 0)
    $$bindings.class(_class);
  $$result.css.add(css);
  return `<div class="${escape(null_to_empty(cn("item-card mb-4 snap-center", _class)), true) + " svelte-11z8bik"}"><header class="min-h-12 flex items-center rounded-tl-xl shadow-md bg-gradient-to-l from-base-100 to-base-300 svelte-11z8bik"><button class="${["pl-4 svelte-11z8bik", title && title.length >= 28 ? "smaller" : ""].join(" ").trim()}"><!-- HTML_TAG_START -->${title}<!-- HTML_TAG_END --></button> <div class="pr-4 py-3">${slots["top-right"] ? slots["top-right"]({}) : ``}</div></header> <hr class="border-base-content opacity-25"> <div class="hidden"${add_attribute("this", slot, 0)}>${slots.default ? slots.default({}) : ``}</div> <div class="${[
    "pt-2 pl-4 pb-2 relative min-h-8 bg-gradient-to-r from-base-100 to-base-200",
    "line-clamp-3"
  ].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</div> <div class="relative">${`<button class="btn btn-xs bg-opacity-80 z-10 shadow-md absolute -bottom-1 right-0 mr-2" data-svelte-h="svelte-19v8mrj">read more</button>`}</div> <hr class="border-base-content opacity-25"> <div class="pr-4 pb-2 text-neutral-content flex justify-between realtive"><div>${slots["bottom-left"] ? slots["bottom-left"]({}) : ``}</div> <div>${slots["bottom-right"] ? slots["bottom-right"]({}) : ``}</div></div> </div>`;
});
export {
  ItemCard as I
};
