import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, e as escape } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import { P as Page } from "../../../../chunks/Page.js";
import { g as getHref } from "../../../../chunks/index3.js";
/* empty css                                                         */import { L as Like_follow } from "../../../../chunks/like-follow.js";
import { C as Comments } from "../../../../chunks/comments.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let org;
  let user;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ org, user } = data);
  $$unsubscribe_page();
  return `${validate_component(Page, "Page").$$render($$result, { title: org?.name }, {}, {
    default: () => {
      return `${!org ? `<div data-svelte-h="svelte-19q21nb">No Organization provided</div>` : `<div class="max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl"><div class="md:flex"><div class="relative">${org.logo ? `<div class="absolute z-10 top-1 left-1 w-10"><img${add_attribute("src", org.logo, 0)}${add_attribute("alt", org.name, 0)}></div>` : ``} <img class="h-48 w-full object-cover md:h-full md:w-48 rounded-br-full"${add_attribute(
        "src",
        org.titleImage ? org.titleImage : "https://picsum.photos/id/384/400/300/",
        0
      )} alt="${"Title image for " + escape(org.name, true)}">  <div class="right-4 bottom-0 absolute">${validate_component(Like_follow, "LikeFollow").$$render(
        $$result,
        {
          item: org,
          userId: user?.userId,
          type: "organization"
        },
        {},
        {}
      )}</div></div> <div class="pt-8 pb-4 px-8"><div class="uppercase tracking-wide text-2xl text-accent font-semibold"><!-- HTML_TAG_START -->${org.name}<!-- HTML_TAG_END --></div> ${org.email ? `<a href="${"mailto:" + escape(org.email, true)}" class="block mt-1 text-lg leading-tight font-medium text-base-content hover:underline">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon: "mdi:email-outline",
          class: "inline"
        },
        {},
        {}
      )} ${escape(org.email)}</a>` : ``} <p class="mt-2 p-4"><!-- HTML_TAG_START -->${org.description ? org.description : " "}<!-- HTML_TAG_END --></p> ${org.website ? `<a${add_attribute("href", getHref(org.website), 0)} class="text-secondary">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:link", class: "inline" }, {}, {})} ${escape(org.website)}</a>` : ``}</div></div> <div class="px-4 flex flex-col"><a href="/">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon: "clarity:organization-line",
          class: "inline"
        },
        {},
        {}
      )}
					View Series</a> <a href="${"/events?whereType=organizationId&whereId=" + escape(org.id, true) + "&title=" + escape(org.name, true) + " Events"}">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon: "mdi:calendar-blank-outline",
          class: "inline"
        },
        {},
        {}
      )}
					View Events</a> <a href="/">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:map-marker", class: "inline" }, {}, {})}
					View Venues</a></div>  <div class="px-4 pb-4 flex justify-end"><div class="tooltip tooltip-top" data-tip="View Events"><a href="${"/events?whereType=organizationId&whereId=" + escape(org.id, true) + "&title=" + escape(org.name, true) + " Events"}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          class: "text-3xl text-primary",
          icon: "material-symbols:preview"
        },
        {},
        {}
      )}</a></div> ${user?.userId === org.ownerId ? `<div class="tooltip tooltip-top" data-tip="Edit Organization"><a${add_attribute("data-sveltekit-replacestate", true, 0)} href="${"/organization/" + escape(org.id, true) + "/edit?from=/organization/" + escape(org.id, true) + "&" + escape($page.url.searchParams.toString(), true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          class: "text-3xl  text-primary",
          icon: "material-symbols:edit-outline"
        },
        {},
        {}
      )}</a></div>` : ``}</div></div>`} ${validate_component(Comments, "Comments").$$render(
        $$result,
        {
          item: org,
          type: "organization",
          user: data.user,
          commentForm: data.commentForm,
          comments: org?.Comments
        },
        {},
        {}
      )}`;
    }
  })}`;
});
export {
  Page_1 as default
};
