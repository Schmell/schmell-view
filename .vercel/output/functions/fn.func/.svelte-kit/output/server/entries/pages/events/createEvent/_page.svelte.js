import { c as create_ssr_component, a as subscribe, d as createEventDispatcher, v as validate_component } from "../../../../chunks/ssr.js";
import "devalue";
import { p as page } from "../../../../chunks/stores.js";
import "../../../../chunks/form.js";
import "clsx";
import "../../../../chunks/index.js";
import { P as Page } from "../../../../chunks/Page.js";
/* empty css                                                         */import "../../../../chunks/functions.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let orgs;
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  const dispatch = createEventDispatcher();
  let { data } = $$props;
  let orgId = "";
  function setOrgId() {
    dispatch("message", { value: orgId });
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ orgs } = data);
  {
    if (orgs?.length === 1) {
      orgId = orgs[0].id;
      setOrgId();
    }
  }
  $$unsubscribe_page();
  return `${validate_component(Page, "Page").$$render($$result, { title: "Create Event" }, {}, {
    default: () => {
      return `${`<p class="py-4" data-svelte-h="svelte-1ylzea2">You can create a brand new event by entering in the info,races and competitors or you can
			upload a Sailwave series</p> <div class="flex justify-between"><button class="btn btn-outline mb-6" data-svelte-h="svelte-1pwk7cz">Import Sailwave file</button> <a href="/events/edit/new" class="btn btn-outline mb-6" data-svelte-h="svelte-z7f7fn">Enter Event manualy</a></div>`} <a href="/import/update" data-svelte-h="svelte-h38wt2"><p class="mt-4">Use Update event to keep your events in sync.</p></a>`;
    }
  })}`;
});
export {
  Page_1 as default
};
