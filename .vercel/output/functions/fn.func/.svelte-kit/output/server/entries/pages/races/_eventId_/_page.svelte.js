import { c as create_ssr_component, v as validate_component, k as each, e as escape } from "../../../../chunks/ssr.js";
import { P as Page } from "../../../../chunks/Page.js";
import { I as ItemCard } from "../../../../chunks/ItemCard.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let event;
  let { data } = $$props;
  const formatDateTime = (date) => {
    try {
      return new Intl.DateTimeFormat(void 0, { dateStyle: "short", timeStyle: "short" }).format(date);
    } catch (error) {
      console.error("error: ", error);
    }
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ event } = data);
  {
    console.log("data: ", data);
  }
  return `${validate_component(Page, "Page").$$render($$result, { title: event?.name }, {}, {
    default: () => {
      return `${data ? ` ${each(event.Races, (race) => {
        return `${validate_component(ItemCard, "ItemCard").$$render($$result, { title: race.name, href: "" }, {}, {
          "bottom-left": () => {
            return `<div slot="bottom-left" class="relative"> <div class="absolute"><span class="px-2 text-xs">${race.createdAt ? `${escape(formatDateTime(race.createdAt))}` : `No time provided`} </span></div> </div>`;
          },
          "bottom-right": () => {
            return `<div slot="bottom-right" class="flex justify-end text-primary"><div class="tooltip tooltip-top" data-tip="View Competitors"><a href="${"/comps/" + escape(event?.id, true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
              $$result,
              {
                icon: "material-symbols:groups-outline-rounded",
                width: "30"
              },
              {},
              {}
            )} </a></div> ${data.user?.userId === event?.publisherId ? `<div class="tooltip tooltip-top" data-tip="Race Edit"><a href="${"/event/" + escape(event?.id, true)}" class="btn btn-ghost">${validate_component(Icon, "Icon").$$render(
              $$result,
              {
                icon: "material-symbols:edit-outline",
                width: "24"
              },
              {},
              {}
            )}</a> </div>` : ``} </div>`;
          },
          "top-right": () => {
            return `<div slot="top-right"><a href="${"/results/" + escape(race.id, true)}" class="btn btn-accent btn-xs">View Results</a> </div>`;
          },
          default: () => {
            return `${race.notes ? `<div class="text-xs text-primary-focus underline" data-svelte-h="svelte-1h4idve">Notes:</div> <div class="px-2 pb-4">${escape(race.notes)} </div>` : `<div class="opacity-0 select-none" data-svelte-h="svelte-1j60o6r">I</div>`} <div class="flex justify-between items-center"><div class="${[
              "badge",
              (race.sailed === "1" ? "badge-success" : "") + " " + (race.sailed === "1" ? "text-success-content" : "") + " " + (race.sailed === "0" ? "badge-error" : "") + " " + (race.sailed === "0" ? "text-error-content" : "")
            ].join(" ").trim()}">${escape(race.sailed === "1" ? "Complete" : "Un-Sailed")}</div> <div class="p-2 text-sm pr-6">${escape(race.date ? race.date : "TBA")} - ${escape(race.time ? race.time : "")} </div></div> `;
          }
        })}`;
      })}` : ``}`;
    }
  })}`;
});
export {
  Page_1 as default
};
