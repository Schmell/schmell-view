import { c as create_ssr_component, v as validate_component, e as escape } from "../../../../chunks/ssr.js";
import { P as Page } from "../../../../chunks/Page.js";
import "clsx";
/* empty css                                                         */import { I as ImportForm } from "../../../../chunks/ImportForm.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let event;
  let orgs;
  let duplicate;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ event, orgs, duplicate } = data);
  return `${validate_component(Page, "Page").$$render($$result, { title: "Update event" }, {}, {
    default: () => {
      return `${data.error ? `` : `${duplicate ? `<p class="text-xl underline underline-offset-2 decoration-neutral-content">${escape(event?.name)}</p> <p class="text-lg pb-2" data-svelte-h="svelte-1omphcp">is an event that already exists</p> <p data-svelte-h="svelte-1bcetip">You can use this for to update here.</p>` : ``}`} ${validate_component(ImportForm, "ImportForm").$$render($$result, { orgs, action: "/import?/update" }, {}, {})} <div class="pt-4" data-svelte-h="svelte-ly6hjd"><p class="text-error">CAUTION!</p> <p class="text-warning">Make sure your external file is in sync with this server version.<br>You can potentailly
			overwrtie work you have done in this app.</p></div>`;
    }
  })}`;
});
export {
  Page_1 as default
};
