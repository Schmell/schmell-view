import { c as create_ssr_component, a as subscribe, k as each, b as add_attribute, e as escape, v as validate_component } from "./ssr.js";
import "devalue";
import { p as page } from "./stores.js";
import "./form.js";
import "clsx";
import "./index.js";
import { B as Button } from "./button.js";
import { I as Icon } from "./Icon.js";
const ImportForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let data;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { orgs } = $$props;
  let { action } = $$props;
  if ($$props.orgs === void 0 && $$bindings.orgs && orgs !== void 0)
    $$bindings.orgs(orgs);
  if ($$props.action === void 0 && $$bindings.action && action !== void 0)
    $$bindings.action(action);
  ({ orgs, data } = $$props);
  $$unsubscribe_page();
  return `<div><ul class="steps w-full maw-w-md mb-2"><li class="${["step", "step-primary"].join(" ").trim()}" data-svelte-h="svelte-qwgj0q">Add Organization</li> <li class="${["step", ""].join(" ").trim()}" data-svelte-h="svelte-7lsiz8">Import</li> <li class="${["step", ""].join(" ").trim()}" data-svelte-h="svelte-1fgla7s">Verify</li> <li class="${["step", ""].join(" ").trim()}" data-svelte-h="svelte-1qmbx5e">Publish</li></ul> <div class="flex flex-col">${` <label for="org" class="label" data-svelte-h="svelte-vteiai">Organization</label> <div class="flex gap-4 items-center w-full mb-5"><select name="orgId" class="select select-bordered w-72 grow">${orgs ? `${each(orgs, (org) => {
    return `<option${add_attribute("value", org.id, 0)}>${escape(org.name)}</option>`;
  })}` : `<option disabled selected value="" data-svelte-h="svelte-j3dqw9">You have no organizations</option>`}<option${add_attribute("value", null, 0)} data-svelte-h="svelte-89u4a7">None</option></select> <div class="tooltip tooltip-bottom-right" data-tip="Add Organization"><a href="${"/organization/new/edit?from=" + escape($page.url.pathname, true) + escape($page.url.search, true)}" class="btn btn-primary btn-circle btn-sm hover:btn-primary-focus">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      class: "text-3xl",
      icon: "ic:baseline-add"
    },
    {},
    {}
  )}</a></div></div> ${validate_component(Button, "Button").$$render($$result, {}, {}, {
    default: () => {
      return `Add Organization`;
    }
  })} `} ${``}</div></div>`;
});
export {
  ImportForm as I
};
