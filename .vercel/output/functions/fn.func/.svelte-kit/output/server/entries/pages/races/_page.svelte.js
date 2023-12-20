import { c as create_ssr_component, a as subscribe, v as validate_component, k as each, i as spread, j as escape_object, e as escape } from "../../../chunks/ssr.js";
import { P as Page } from "../../../chunks/Page.js";
import { I as ItemCard } from "../../../chunks/ItemCard.js";
import { p as page } from "../../../chunks/stores.js";
import { I as Icon } from "../../../chunks/Icon.js";
import "dequal";
import "../../../chunks/action.js";
import { c as createPagination } from "../../../chunks/create.js";
let pageSize = 10;
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let races;
  let $page, $$unsubscribe_page;
  let $root, $$unsubscribe_root;
  let $range, $$unsubscribe_range;
  let $prevButton, $$unsubscribe_prevButton;
  let $pages, $$unsubscribe_pages;
  let $pageTrigger, $$unsubscribe_pageTrigger;
  let $currentPage, $$unsubscribe_currentPage;
  let $nextButton, $$unsubscribe_nextButton;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  const { elements: { root, pageTrigger, prevButton, nextButton }, states: { pages, range, page: currentPage } } = createPagination({
    count: data.count,
    perPage: pageSize,
    defaultPage: 1,
    siblingCount: 1
  });
  $$unsubscribe_root = subscribe(root, (value) => $root = value);
  $$unsubscribe_pageTrigger = subscribe(pageTrigger, (value) => $pageTrigger = value);
  $$unsubscribe_prevButton = subscribe(prevButton, (value) => $prevButton = value);
  $$unsubscribe_nextButton = subscribe(nextButton, (value) => $nextButton = value);
  $$unsubscribe_pages = subscribe(pages, (value) => $pages = value);
  $$unsubscribe_range = subscribe(range, (value) => $range = value);
  $$unsubscribe_currentPage = subscribe(currentPage, (value) => $currentPage = value);
  function excludePaginationSearchParams() {
    $page.url.searchParams.delete("skip");
    $page.url.searchParams.delete("take");
    return $page.url.searchParams.toString();
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ races } = data);
  $$unsubscribe_page();
  $$unsubscribe_root();
  $$unsubscribe_range();
  $$unsubscribe_prevButton();
  $$unsubscribe_pages();
  $$unsubscribe_pageTrigger();
  $$unsubscribe_currentPage();
  $$unsubscribe_nextButton();
  return `${validate_component(Page, "Page").$$render($$result, { title: data.title ?? "All Races" }, {}, {
    default: () => {
      return `${!races ? `<div data-svelte-h="svelte-dvqaiz">No races</div>` : `${each(races, (race) => {
        return `${validate_component(ItemCard, "ItemCard").$$render($$result, { title: race.name, href: "" }, {}, {
          "bottom-left": () => {
            return `<div slot="bottom-left" class="relative">  <div class="text-base-content px-4 text-sm"><a href="${"/events/" + escape(race.Event?.id, true)}" class="flex gap-2 items-center">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:calendar-blank" }, {}, {})} <div class="line-clamp-1"><!-- HTML_TAG_START -->${race.Event?.name}<!-- HTML_TAG_END --></div></a> <a href="${"/organization/" + escape(race.Event?.Organization?.id, true)}" class="flex gap-2 items-center">${validate_component(Icon, "Icon").$$render($$result, { icon: "clarity:organization-solid" }, {}, {})} <div class="line-clamp-1"><!-- HTML_TAG_START -->${race.Event?.Organization?.name}<!-- HTML_TAG_END --></div></a> <a href="${"/venue/" + escape(race.Event?.Venue?.id, true)}" class="flex gap-2 items-center">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:map-marker" }, {}, {})} <div class="line-clamp-1"><!-- HTML_TAG_START -->${race.Event?.Venue?.name}<!-- HTML_TAG_END --></div> </a></div> </div>`;
          },
          "bottom-right": () => {
            return `<div slot="bottom-right" class="text-primary"><div class="flex justify-end"><div class="tooltip tooltip-top" data-tip="View Competitors"><a href="${"/comps/" + escape(race?.id, true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
              $$result,
              {
                icon: "material-symbols:groups-outline-rounded",
                width: "30"
              },
              {},
              {}
            )} </a></div> ${data.user?.userId === race?.publisherId ? `<div class="tooltip tooltip-top" data-tip="Race Edit"><a href="${"/event/" + escape(race?.id, true)}" class="btn btn-ghost">${validate_component(Icon, "Icon").$$render(
              $$result,
              {
                icon: "material-symbols:edit-outline",
                width: "24"
              },
              {},
              {}
            )}</a> </div>` : ``}</div> <span class="px-2 text-xs text-secondary">${race.createdAt ? `${escape(race.createdAt.toLocaleDateString())}` : `No time provided`}</span> </div>`;
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
      })}  ${data.count > pageSize ? `<div class="divider"></div> <nav${spread([escape_object($root), { class: "" }], {})}><p class="flex justify-center text-sm">Showing items ${escape($range.start)} - ${escape($range.end)}</p> <div class="join flex justify-center"><button${spread([escape_object($prevButton), { class: "join-item btn btn-xs" }], {})}>${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:chevron-left" }, {}, {})}</button> ${each($pages, (page2, idx) => {
        return `${page2.type === "ellipsis" ? `<span data-svelte-h="svelte-9cz974">...</span>` : `<a${spread(
          [
            {
              href: "/races?take=" + escape(pageSize, true) + "&skip=" + escape(pageSize * idx, true) + "\r\n									&" + escape(excludePaginationSearchParams(), true)
            },
            escape_object($pageTrigger(page2)),
            { class: "join-item btn btn-xs" }
          ],
          {
            classes: $currentPage === idx + 1 ? "btn-active" : ""
          }
        )}>${escape(page2.value)} </a>`}`;
      })} <button${spread([escape_object($nextButton), { class: "join-item btn btn-xs" }], {})}>${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:chevron-right" }, {}, {})}</button></div></nav>` : ``}`}`;
    }
  })}`;
});
export {
  Page_1 as default
};
