import { c as create_ssr_component, v as validate_component, k as each, e as escape } from "../../../../chunks/ssr.js";
import { P as Page } from "../../../../chunks/Page.js";
import { I as ItemCard } from "../../../../chunks/ItemCard.js";
import { f as formatDateTime } from "../../../../chunks/formatters.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let comps;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ user, comps } = data);
  return `${validate_component(Page, "Page").$$render($$result, { title: "Competitiors" }, {}, {
    default: () => {
      return `${comps ? `${each(comps, (comp) => {
        return `${validate_component(ItemCard, "ItemCard").$$render(
          $$result,
          {
            title: comp.boat ? comp.boat : comp.skipper,
            href: "/comps/comp/" + comp.id
          },
          {},
          {
            "bottom-left": () => {
              return `<div slot="bottom-left" class="p-2 text-xs text-base-content"><div>Updated:
						<span class="px-2">${comp.updatedAt ? `${escape(formatDateTime(comp.updatedAt))}` : `No date provided`} </span></div> <div>Created:
						<span class="px-2">${comp.createdAt ? `${escape(formatDateTime(comp.createdAt))}` : `No time provided`} </span></div> </div>`;
            },
            "bottom-right": () => {
              return `<div slot="bottom-right" class="flex justify-end text-primary"><div class="tooltip tooltip-top" data-tip="View Competitor"><a href="${"/comps/comp/" + escape(comp?.id, true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "material-symbols:groups-outline-rounded",
                  width: "30"
                },
                {},
                {}
              )} </a></div>  ${user?.userId === comp.publisherId ? `<div class="tooltip tooltip-top" data-tip="Edit Competitor"><a href="${"/comps/" + escape(comp?.id, true) + "?edit=1"}" class="btn btn-ghost">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "material-symbols:edit-outline",
                  width: "24"
                },
                {},
                {}
              )}</a> </div>` : ``} </div>`;
            },
            default: () => {
              return ` <div class="grid grid-cols-2 gap-4">${comp.skipper ? `<div><div class="text-xs opacity-70" data-svelte-h="svelte-ewuaox">Skipper:</div> <div class="pl-2">${escape(comp.skipper)}</div> </div>` : ``} ${comp.club ? `<div><div class="text-xs opacity-70" data-svelte-h="svelte-13fdsdd">Club:</div> <div class="pl-2">${escape(comp.club)}</div> </div>` : ``} ${comp.fleet ? `<div><div class="text-xs opacity-70" data-svelte-h="svelte-11wngaz">Fleet:</div> <div class="pl-2">${escape(comp.fleet)}</div> </div>` : ``} ${comp.division ? `<div><div class="text-xs opacity-70" data-svelte-h="svelte-1u2gxiu">division:</div> <div class="pl-2">${escape(comp.division)}</div> </div>` : ``} ${comp.rating ? `<div><div class="text-xs opacity-70" data-svelte-h="svelte-1qxhayc">Rating:</div> <div class="pl-2">${escape(comp.rating)}</div> </div>` : ``}</div> `;
            }
          }
        )}`;
      })}` : `<div data-svelte-h="svelte-194gxkm">Loading...</div>`}`;
    }
  })}`;
});
export {
  Page_1 as default
};
