import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape } from "../../../../../chunks/ssr.js";
import { P as Page } from "../../../../../chunks/Page.js";
import { p as page } from "../../../../../chunks/stores.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${validate_component(Page, "Page").$$render($$result, { title: "error" }, {}, {
    default: () => {
      return `<h1>${escape($page.error?.message)}</h1>`;
    }
  })}`;
});
export {
  Error as default
};
