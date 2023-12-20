import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, e as escape } from "../../../../../chunks/ssr.js";
import "devalue";
import { p as page } from "../../../../../chunks/stores.js";
import { P as Page } from "../../../../../chunks/Page.js";
import "clsx";
import { I as Icon } from "../../../../../chunks/Icon.js";
import "../../../../../chunks/index.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let comp;
  let user;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let { form } = $$props;
  let my_modal_2;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  ({ comp, user } = data);
  $$unsubscribe_page();
  return `${comp ? `${validate_component(Page, "Page").$$render($$result, { title: comp?.boat }, {}, {
    default: () => {
      return `<div class="max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl"><div class="md:flex"><div class="md:shrink-0 relative"><img class="h-48 w-full object-cover md:h-full md:w-48 rounded-br-full"${add_attribute(
        "src",
        comp?.image ? comp?.image : "https://picsum.photos/id/384/400/300/",
        0
      )} alt="${"Title for " + escape(comp?.boat, true)}"> <div class="flex items-center absolute right-2 bottom-2"><a href="${"/api/claimComp?compId=" + escape(comp.id, true)}" class="btn btn-secondary btn-sm absolute right-10 bottom-0 rounded-full">Claim</a> <button class="btn btn-xs btn-ghost absolute right-3 bottom-4 rounded-full">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon: "material-symbols:info-outline",
          width: "20"
        },
        {},
        {}
      )}</button></div></div> <dialog class="modal"${add_attribute("this", my_modal_2, 0)} data-svelte-h="svelte-1yrumqu"><div class="modal-box"><h3 class="font-bold text-lg">Claim your vessel</h3> <p class="py-4">If this is your boat/vessel this button will send a request to the publisher of the
							event and they can connect this boat to your profile</p> <div class="modal-action m-0"><form method="dialog"><button class="btn">close</button></form></div></div> <form method="dialog" class="modal-backdrop"><button>close</button></form></dialog> <div class="pt-8 pb-4 px-8"><div class="uppercase tracking-wide text-2xl text-accent font-semibold"><!-- HTML_TAG_START -->${comp?.boat ?? comp.sailno}<!-- HTML_TAG_END --></div> ${comp.skipper ? `<div class="flex gap-4 justify-between items-center"><a href="/" class="text-secondary block">${escape(comp?.skipper)}</a> <div class="font-semibold text-lg">${escape(comp.club ?? "")}</div></div>` : ``} <div class="grid grid-cols-2">${comp.club ? `<div><span class="text-xs text-primary" data-svelte-h="svelte-zsfv1k">Club:</span> <span>${escape(comp?.club)}</span></div>` : ``} ${comp.sailno ? `<div><span class="text-xs text-primary" data-svelte-h="svelte-12thc64">Sail No:</span> <span>${escape(comp?.sailno)}</span></div>` : ``} ${comp.rest?.class ? `<div class=""><span class="text-xs text-primary" data-svelte-h="svelte-ch1no8">Class:</span> <a href="${"https://sailboatdata.com/?keyword=" + escape(comp?.rest.class, true)}" target="_blank">${escape(comp?.rest.class)}</a></div>` : ``} ${comp.fleet ?? comp.division ? `<div class=""><span class="text-xs text-primary" data-svelte-h="svelte-58auj0">Fleet:</span> <span>${escape(comp?.fleet)}</span> ${comp.division ? `- <span>${escape(comp.division)}</span>` : ``}</div>` : ``} ${comp.rating ? `<div class=""><span class="text-xs text-primary" data-svelte-h="svelte-ddkkmj">Rating:</span> <span>${escape(comp.rating)}</span></div>` : ``}</div> <p class="py-6 px-2 text-lg shadow-lg border-r-4 border-accent rounded-lg">${escape(comp.description ?? "No description provided")}</p> <div class="py-2 text-xs text-secondary flex justify-end">${escape(comp.createdAt?.toLocaleDateString())}</div></div></div> <div class="pl-2"><form method="post" action="?/getEvents"><button class="btn btn-ghost btn-xs">${escape("⌄ Show Races")}</button></form></div>  ${``}  <div class="px-4 pb-4 flex justify-end"> <div class="tooltip tooltip-top" data-tip="View Races"><a href="${"/races?whereType=compId&whereId=" + escape(comp.id, true) + "&title=" + escape(comp.boat ?? comp.skipper ?? comp.sailno, true) + " Races"}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          class: "text-3xl text-primary",
          icon: "material-symbols:preview"
        },
        {},
        {}
      )}</a></div> <div class="tooltip tooltip-top" data-tip="Edit Event"><a href="${"/comps/comp/" + escape(comp?.id, true) + "/edit?from=" + escape($page.url.pathname, true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          class: "text-3xl  text-primary",
          icon: "mdi:pencil-outline"
        },
        {},
        {}
      )}</a></div></div></div>`;
    }
  })}` : `<div data-svelte-h="svelte-194gxkm">Loading...</div>`}`;
});
export {
  Page_1 as default
};
