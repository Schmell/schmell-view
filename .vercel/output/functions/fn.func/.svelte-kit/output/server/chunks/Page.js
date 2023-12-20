import { c as create_ssr_component, b as add_attribute, v as validate_component } from "./ssr.js";
import { a as cn } from "./index3.js";
const SubNav_svelte_svelte_type_style_lang = "";
const css = {
  code: ".sub-nav.svelte-2ac6ui{@apply border-base-300 bg-base-100 shadow-md;;@apply text-primary;;display:flex;justify-content:space-between;align-items:center;position:fixed;z-index:10;padding-right:2em;padding-top:4.75em;padding-bottom:0.7em;padding-left:1em;min-height:8mem;width:99%;border-width:1px;border-bottom-right-radius:4em}",
  map: null
};
const SubNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css);
  return `<div class="sub-nav svelte-2ac6ui"><div class="h-full items-center tooltip tooltip-bottom"${add_attribute("data-tip", title, 0)}><div class="text-3xl font-semibold select-none line-clamp-1"><!-- HTML_TAG_START -->${title}<!-- HTML_TAG_END --></div></div> <div class="mr-4">${slots.trailing ? slots.trailing({}) : ``}</div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(SubNav, "SubNav").$$render($$result, { title }, {}, {
    trailing: () => {
      return `<div slot="trailing">${slots.trailing ? slots.trailing({}) : ``}</div>`;
    }
  })} <div><div${add_attribute("class", cn(" w-full h-full fixed top-0 overflow-scroll", { className }), 0)}><div class="mt-36 relative"><div class="mx-4 mb-24">${slots.default ? slots.default({}) : ``}</div></div></div></div>`;
});
export {
  Page as P
};
