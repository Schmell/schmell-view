import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape, x as is_promise, n as noop, k as each, i as spread, j as escape_object, y as add_classes } from "../../../chunks/ssr.js";
import "devalue";
import { p as page } from "../../../chunks/stores.js";
import { P as Page } from "../../../chunks/Page.js";
import { I as ItemCard } from "../../../chunks/ItemCard.js";
import { L as Like_count } from "../../../chunks/like-count.js";
import { I as Icon } from "../../../chunks/Icon.js";
import "dequal";
import "../../../chunks/action.js";
import { c as createPagination } from "../../../chunks/create.js";
let pageSize = 10;
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let events;
  let awaited;
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
    count: data.count ?? 0,
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
  function excludeSortSearchParams() {
    $page.url.searchParams.delete("sortBy");
    $page.url.searchParams.delete("sortOrder");
    return $page.url.searchParams.toString();
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ user, events, awaited } = data);
  $$unsubscribe_page();
  $$unsubscribe_root();
  $$unsubscribe_range();
  $$unsubscribe_prevButton();
  $$unsubscribe_pages();
  $$unsubscribe_pageTrigger();
  $$unsubscribe_currentPage();
  $$unsubscribe_nextButton();
  return `${validate_component(Page, "Page").$$render($$result, { title: data.title ?? "All Events" }, {}, {
    trailing: () => {
      return `<div slot="trailing"><a class="br-primary" href="/events/createEvent">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon: "material-symbols:add-circle",
          width: "34"
        },
        {},
        {}
      )}</a></div>`;
    },
    default: () => {
      return `<div class="navbar flex gap-2 bg-base-100 mb-2 rounded-xl">${$page.url.searchParams.get("sortBy") !== "org" ? `<a href="${"/events?sortBy=org&" + escape(excludeSortSearchParams(), true)}" class="btn btn-primary btn-xs">Sort by Org</a>` : ``} ${$page.url.searchParams.get("sortBy") !== "venue" ? `<a href="${"/events?sortBy=venue&" + escape(excludeSortSearchParams(), true)}" class="btn btn-primary btn-xs">Sort by Venue</a>` : ``} ${$page.url.searchParams.get("whereType") !== "publisherId" ? `<a href="${"/events?whereType=publisherId&whereId=" + escape(user?.userId, true) + "&title=Your Events"}" class="btn btn-primary btn-xs">Your events</a>` : `<a href="/events" class="btn btn-primary btn-xs" data-svelte-h="svelte-15rbhei">All events</a>`}</div> ${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop);
          return ` <progress class="progress w-full"></progress> `;
        }
        return function(events2) {
          return ` ${!events2.length ? `<h1 class="text-xl font-semibold" data-svelte-h="svelte-5t9z6a">You do not have any events yet.</h1> <a class="link-primary hover:link-hover" href="/import" data-svelte-h="svelte-bb1zmx">Upload events here</a>` : ``} ${each(events2, (event) => {
            return ` ${validate_component(ItemCard, "ItemCard").$$render(
              $$result,
              {
                title: event.name,
                href: "/events/" + event.id + $page.url.search
              },
              {},
              {
                "bottom-right": () => {
                  return `<div slot="bottom-right">${data.user?.userId === event?.publisherId ? `<div class="flex items-center"><div class="tooltip tooltip-top" data-tip="Edit Event"><a href="${"/events/" + escape(event?.id, true) + "/edit?from=" + escape($page.url.pathname, true) + "\r\n									&" + escape($page.url.searchParams.toString(), true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
                    $$result,
                    {
                      class: "text-3xl text-primary",
                      width: "24",
                      icon: "mdi:pencil-outline"
                    },
                    {},
                    {}
                  )} </a></div> <div class="tooltip tooltip-top" data-tip="Delete Event"><form method="post"><button formaction="${"?/deleteEvent&itemId=" + escape(event.id, true) + "&from=" + escape($page.url.pathname, true) + "&" + escape($page.url.searchParams.toString(), true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
                    $$result,
                    {
                      class: "text-3xl text-primary",
                      width: "24",
                      icon: "mdi:trash-outline"
                    },
                    {},
                    {}
                  )}</button> </form></div> </div>` : ``} <div class="text-xs text-base-content pr-2 pb-1">${escape(event.createdAt?.toLocaleDateString())}</div> </div>`;
                },
                "bottom-left": () => {
                  return `<div slot="bottom-left" class="p-2 text-base-content"><a href="${"/organization/" + escape(event.Organization?.id, true)}" class="flex items-center gap-2 line-clamp-1">${validate_component(Icon, "Icon").$$render($$result, { icon: "clarity:organization-solid" }, {}, {})} <!-- HTML_TAG_START -->${event.Organization?.name}<!-- HTML_TAG_END --></a> <a href="${"/venue/" + escape(event.Venue?.id, true)}" class="flex items-center gap-2 line-clamp-1">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:map-marker" }, {}, {})} <!-- HTML_TAG_START -->${event.Venue?.name}<!-- HTML_TAG_END --></a> </div>`;
                },
                "top-right": () => {
                  return `<div slot="top-right" class="text-xs flex gap-2">${validate_component(Like_count, "LikeCount").$$render(
                    $$result,
                    {
                      userId: user?.userId,
                      item: event,
                      type: "event"
                    },
                    {},
                    {}
                  )} </div>`;
                },
                default: () => {
                  return `<div${add_classes((!event.description ? "opacity-60" : "").trim())}><!-- HTML_TAG_START -->${event.description ?? "No description provided"}<!-- HTML_TAG_END --></div> `;
                }
              }
            )}`;
          })}  ${data.count && data.count > pageSize ? `<div class="divider"></div> <nav${spread([escape_object($root), { class: "" }], {})}><p class="flex justify-center text-sm">Showing items ${escape($range.start)} - ${escape($range.end)}</p> <div class="join flex justify-center"><button${spread([escape_object($prevButton), { class: "join-item btn btn-xs" }], {})}>${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:chevron-left" }, {}, {})}</button> ${each($pages, (page2, idx) => {
            return `${page2.type === "ellipsis" ? `<span data-svelte-h="svelte-9cz974">...</span>` : `<a${spread(
              [
                {
                  href: "/events?take=" + escape(pageSize, true) + "&skip=" + escape(pageSize * idx, true) + "\r\n									&" + escape(excludePaginationSearchParams(), true)
                },
                escape_object($pageTrigger(page2)),
                { class: "join-item btn btn-xs" }
              ],
              {
                classes: $currentPage === idx + 1 ? "btn-active" : ""
              }
            )}>${escape(page2.value)} </a>`}`;
          })} <button${spread([escape_object($nextButton), { class: "join-item btn btn-xs" }], {})}>${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:chevron-right" }, {}, {})}</button></div></nav>` : ``} `;
        }(__value);
      }(awaited.events)}`;
    }
  })}`;
});
export {
  Page_1 as default
};
