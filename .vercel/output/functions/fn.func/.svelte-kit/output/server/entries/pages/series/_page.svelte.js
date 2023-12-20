import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape, x as is_promise, n as noop, k as each, b as add_attribute, y as add_classes } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import { P as Page } from "../../../chunks/Page.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { I as ItemCard } from "../../../chunks/ItemCard.js";
import { L as Like_count } from "../../../chunks/like-count.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ user } = data);
  $$unsubscribe_page();
  return `${validate_component(Page, "Page").$$render($$result, { title: "Series" }, {}, {
    trailing: () => {
      return `<div slot="trailing"><a href="${"/series/new/edit?from=" + escape($page.url.pathname, true)}" class="rounded-full shadow-lg">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:plus-circle", width: "44" }, {}, {})}</a></div>`;
    },
    default: () => {
      return `${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop);
          return ` <div data-svelte-h="svelte-194gxkm">Loading...</div> `;
        }
        return function() {
          return ` ${!data.series ? `<div data-svelte-h="svelte-1qya8kd">No series available</div>` : `${each(data.series, (ser) => {
            return `${validate_component(ItemCard, "ItemCard").$$render(
              $$result,
              {
                title: ser.name,
                href: "/series/" + ser.id
              },
              {},
              {
                "bottom-right": () => {
                  return `<div slot="bottom-right">${data.user?.userId === ser?.publisherId ? `<div class="tooltip tooltip-top" data-tip="Edit Series"><a${add_attribute("data-sveltekit-replacestate", true, 0)} href="${"/series/" + escape(ser?.id, true) + "/edit?from=" + escape($page.url.pathname, true) + "\r\n									&" + escape($page.url.searchParams.toString(), true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
                    $$result,
                    {
                      class: "text-3xl text-primary",
                      icon: "material-symbols:edit-outline"
                    },
                    {},
                    {}
                  )}</a> </div>` : ``} <div class="text-xs text-base-content pr-2 pb-1">${escape(ser.createdAt?.toLocaleDateString())}</div> </div>`;
                },
                "bottom-left": () => {
                  return `<div slot="bottom-left" class="p-2 text-base-content">${ser.Organization ? `<a href="${"/organization/" + escape(ser.Organization?.id, true)}" class="flex items-center gap-2 line-clamp-1">${validate_component(Icon, "Icon").$$render($$result, { icon: "clarity:organization-solid" }, {}, {})} <!-- HTML_TAG_START -->${ser.Organization?.name}<!-- HTML_TAG_END --> </a>` : ``} ${ser.Venues ? `${each(ser.Venues, (venue) => {
                    return `<a href="${"/venue/" + escape(venue?.id, true)}" class="flex items-center gap-2 line-clamp-1">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:map-marker" }, {}, {})} <!-- HTML_TAG_START -->${venue.name}<!-- HTML_TAG_END --> </a>`;
                  })}` : ``} </div>`;
                },
                "top-right": () => {
                  return `<div slot="top-right" class="text-xs flex gap-2">${validate_component(Like_count, "LikeCount").$$render(
                    $$result,
                    {
                      userId: user?.userId,
                      item: ser,
                      type: "series"
                    },
                    {},
                    {}
                  )} </div>`;
                },
                default: () => {
                  return `<div${add_classes((!ser.description ? "opacity-60" : "").trim())}><!-- HTML_TAG_START -->${ser.description ?? "No description provided"}<!-- HTML_TAG_END --></div> `;
                }
              }
            )}`;
          })}`} `;
        }();
      }(data.series)}`;
    }
  })}`;
});
export {
  Page_1 as default
};
