import { c as create_ssr_component, a as subscribe, v as validate_component, x as is_promise, n as noop, b as add_attribute, e as escape, k as each } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import { P as Page } from "../../../../chunks/Page.js";
import { g as getHref } from "../../../../chunks/index3.js";
/* empty css                                                         */import { L as Like_follow } from "../../../../chunks/like-follow.js";
import { C as Comments } from "../../../../chunks/comments.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_page();
  return `${validate_component(Page, "Page").$$render($$result, { title: "Series" }, {}, {
    default: () => {
      return `${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop);
          return ` <div data-svelte-h="svelte-194gxkm">Loading...</div> `;
        }
        return function(series) {
          return ` ${series ? `<div class="mt-18 mb-8 max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl"><div class="md:flex"><div class="md:shrink-0 flex relative"><img class="h-48 w-full object-cover md:h-full md:w-48 rounded-br-full"${add_attribute(
            "src",
            series?.titleImage ? series?.titleImage : series?.Organization?.titleImage ? series?.Organization.titleImage : "https://picsum.photos/id/384/400/300/",
            0
          )} alt="${"Title for " + escape(series?.name, true)}"> <div class="absolute w-full flex justify-end bottom-0 right-4 p-2"><div>${validate_component(Like_follow, "LikeFollow").$$render(
            $$result,
            {
              item: series,
              type: "series",
              userId: data.user?.userId
            },
            {},
            {}
          )}  <div class="flex justify-end text-sm"><span class="pr-1 flex items-center text-xs">${escape(series?._count.Likes)} ${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              class: "px-1 text-lg",
              icon: "mdi:thumbs-up"
            },
            {},
            {}
          )}</span>
									/
									<span class="pr-2 pl-2 flex items-center text-xs">${escape(series?._count.Follows)} ${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              class: "px-1 text-lg",
              icon: "mdi:bell-ring"
            },
            {},
            {}
          )}</span></div></div></div></div> <div class="pt-8 px-8 w-full"><div class="flex justify-between w-full"><div class="uppercase tracking-wide text-xl text-accent font-semibold line-clamp-1"><!-- HTML_TAG_START -->${series?.name}<!-- HTML_TAG_END --></div></div> <p class="py-2 opacity-70"><!-- HTML_TAG_START -->${series?.description ? series?.description : "No description provided"}<!-- HTML_TAG_END --></p> <div class=""><a href="${"/organization/" + escape(series?.Organization?.id, true)}" class="underline">${escape(series?.Organization?.name)}</a> ${series?.website ? `<a${add_attribute("href", getHref(series?.website), 0)} target="_blank" class="flex items-center gap-1 text-secondary font-semibold uppercase">${validate_component(Icon, "Icon").$$render($$result, { icon: "gridicons:popout" }, {}, {})} <div class="inline line-clamp-1">${escape(series?.website)}</div></a>` : ``}</div></div>  <div class="px-4 pb-4 flex justify-between items-center"><button class="btn btn-ghost btn-xs">${escape("^ Hide Events")}</button> <div><div class="tooltip tooltip-top" data-tip="Edit Races"><a href="${"/races/" + escape(series?.id, true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              class: "text-3xl text-primary",
              icon: "material-symbols:box-edit-outline"
            },
            {},
            {}
          )}</a></div> ${data.user?.userId === series?.publisherId ? `<div class="tooltip tooltip-top" data-tip="Edit Event"><a href="${"/series/" + escape(series?.id, true) + "/edit?from=" + escape($page.url.pathname, true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              class: "text-3xl text-primary",
              icon: "material-symbols:edit-outline"
            },
            {},
            {}
          )}</a></div>` : ``}</div></div></div> ${`${each(series?.Events, (event) => {
            return `<a href="${"/events/" + escape(event.id, true)}"><div class="p-0 m-2 mx-4 border-t text-base-content"><div class="w-full pt-1"><h1 class="text-xl font-semibold">${escape(event.name)}</h1></div> <div class="flex justify-between"><div class="text-xs">${escape(event.createdAt?.toLocaleDateString())}</div> <div class="${[
              "badge badge-xs badge-success text-success-content shadow-md p-3",
              !event.complete ? "badge-warning" : ""
            ].join(" ").trim()}">${event.complete ? `${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:check" }, {}, {})}` : `${validate_component(Icon, "Icon").$$render(
              $$result,
              {
                icon: "material-symbols:progress-activity-sharp"
              },
              {},
              {}
            )}`}</div> </div></div> </a>`;
          })}`} <div class="p-2"> ${validate_component(Comments, "Comments").$$render(
            $$result,
            {
              item: series,
              type: "series",
              user: data.user,
              commentForm: data.commentForm,
              comments: series?.Comments
            },
            {},
            {}
          )}</div></div>` : ``}  `;
        }(__value);
      }(data.series)}`;
    }
  })}`;
});
export {
  Page_1 as default
};
