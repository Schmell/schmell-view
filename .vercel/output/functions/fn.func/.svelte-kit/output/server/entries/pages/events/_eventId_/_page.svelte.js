import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, e as escape, x as is_promise, n as noop, k as each } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import { P as Page } from "../../../../chunks/Page.js";
import { i as isUrl } from "../../../../chunks/index3.js";
/* empty css                                                         */import { L as Like_follow } from "../../../../chunks/like-follow.js";
import { C as Comments } from "../../../../chunks/comments.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "devalue";
function getHref(website) {
  if (!website)
    return null;
  return website && website.startsWith("http://") || website.startsWith("https://") ? website : `http://${website}`;
}
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let event;
  let user;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ event, user } = data);
  $$unsubscribe_page();
  return `${data ? `${validate_component(Page, "Page").$$render($$result, { title: event?.name }, {}, {
    default: () => {
      return `<div class="mt-18 mb-8 max-w-md mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl"><div class="md:flex"><div class="md:shrink-0 flex relative">${!event.public ? `<div class="badge badge-error absolute right-2 top-2 shadow-md" data-svelte-h="svelte-evmnrb">Private</div> ` : ``} ${isUrl(event.Venue?.burgee) ? `<img class="absolute z-10 left-2 top-2 rounded-full shadow-xl" width="60px"${add_attribute("src", event.Venue?.burgee, 0)}${add_attribute("alt", event.Venue?.name, 0)}>` : ``} <img class="h-48 w-full object-cover md:h-full md:w-48 rounded-br-full"${add_attribute(
        "src",
        event?.titleImage ? event?.titleImage : event.Organization?.titleImage ? event.Organization.titleImage : "https://picsum.photos/200/400",
        0
      )} alt="${"Title for " + escape(event?.name, true)}"> <div class="absolute w-full flex justify-end bottom-0 right-4 p-2"><div> ${validate_component(Like_follow, "LikeFollow").$$render(
        $$result,
        {
          item: event,
          userId: user?.userId,
          type: "event"
        },
        {},
        {}
      )} <div class="flex justify-end text-sm"><span class="pr-1 flex items-center text-xs">${escape(event._count.Likes)} ${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          class: "px-1 text-lg",
          icon: "mdi:thumbs-up"
        },
        {},
        {}
      )}</span>
								/
								<span class="pr-2 pl-2 flex items-center text-xs">${escape(event._count.Follows)} ${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          class: "px-1 text-lg",
          icon: "mdi:bell-ring"
        },
        {},
        {}
      )}</span></div></div></div></div> <div class="pt-2 px-8 w-full"><div class="flex justify-end">${event.complete ? `<div class="badge badge-success shadow-md" data-svelte-h="svelte-fmzruk">complete</div>` : `<div class="badge badge-warning shadow-md w-36" data-svelte-h="svelte-15q0gyf">In progress</div>`}</div> <div class="flex justify-between w-full"><div class="uppercase tracking-wide text-xl text-accent font-semibold line-clamp-1"><!-- HTML_TAG_START -->${event?.name}<!-- HTML_TAG_END --></div></div> ${event?.Venue ? `<div class="flex items-center gap-4"><a${add_attribute("href", `/venue/${event?.venueId}`, 0)} class="mt-1 text-lg leading-tight text-base-content hover:underline">${escape(event.Venue.name ? event.Venue.name : "No venue provided")}</a> ${event.Venue.website ? `<div data-svelte-h="svelte-fd8uot">-</div> <a${add_attribute("href", getHref(event.Venue.website), 0)} class="mt-1 line-clamp-1 flex gap-1 items-center text-xs leading-tight text-base-content hover:underline">${validate_component(Icon, "Icon").$$render($$result, { icon: "gridicons:popout" }, {}, {})} ${escape(event.Venue.website)}</a>` : ``}</div>` : ``} <p class="py-2 opacity-70"><!-- HTML_TAG_START -->${event?.description ? event?.description : "No description provided"}<!-- HTML_TAG_END --></p> <div class=""><a href="${"/organization/" + escape(event.Organization?.id, true)}" class="underline">${escape(event.Organization?.name)}</a> ${event?.eventwebsite ? `<a${add_attribute("href", getHref(event?.eventwebsite), 0)} target="_blank" class="flex items-center gap-1 text-secondary font-semibold uppercase">${validate_component(Icon, "Icon").$$render($$result, { icon: "gridicons:popout" }, {}, {})} <div class="inline line-clamp-1">${escape(event?.eventwebsite)}</div></a>` : ``}  <div class="flex justify-end text-sm"><span class="pr-1 flex items-center text-xs">${escape(event._count.Likes)} ${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          class: "px-1 text-lg",
          icon: "mdi:thumbs-up"
        },
        {},
        {}
      )}</span>
							/
							<span class="pr-2 pl-2 flex items-center text-xs">${escape(event._count.Follows)} ${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          class: "px-1 text-lg",
          icon: "mdi:bell-ring"
        },
        {},
        {}
      )}</span></div></div></div></div> <div class="px-4 pb-4 flex justify-between items-center"><button class="btn btn-ghost btn-xs">${escape("^ Hide Races")}</button> <div><div class="tooltip tooltip-top" data-tip="View Competitors"><a href="${"/comps/" + escape(event?.id, true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          class: "text-3xl text-primary",
          icon: "material-symbols:groups-outline-rounded"
        },
        {},
        {}
      )}</a></div> <div class="tooltip tooltip-top" data-tip="Edit Races"><a href="${"/races/" + escape(event?.id, true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          class: "text-3xl text-primary",
          icon: "material-symbols:box-edit-outline"
        },
        {},
        {}
      )}</a></div> ${data.user?.userId === event?.publisherId ? `<div class="tooltip tooltip-top" data-tip="Edit Event"> <button class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          class: "text-3xl text-primary",
          icon: "material-symbols:edit-outline"
        },
        {},
        {}
      )}</button></div> <div class="tooltip tooltip-top" data-tip="Delete Event"><form method="post"><button formaction="${"?/deleteEvent&itemId=" + escape(event.id, true) + "&from=" + escape($page.url.pathname, true) + "&" + escape($page.url.searchParams.toString(), true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          class: "text-3xl text-primary",
          width: "24",
          icon: "mdi:trash-outline"
        },
        {},
        {}
      )}</button></form></div>` : ``}</div></div>  ${`${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop);
          return ` <progress class="progress progress-accent px-4 w-full"></progress> `;
        }
        return function(races) {
          return ` ${each(races, (race) => {
            return `<a href="${"/results/" + escape(race.id, true)}"><div class="p-2 px-8 border-b-4 border-l-4 rounded-lg border-base-200 m-4"><div class="w-full pt-1"><h1 class="text-xl font-semibold">${escape(race.name)}</h1></div> <div class="flex justify-between pb-2"><div class="text-xs">${escape(race.date ?? "")} ${escape(race.time ? `- ${race.time}` : "")}</div> <div class="${[
              "badge badge-success shadow-md",
              !Number(race.sailed) ? "badge-error" : ""
            ].join(" ").trim()}">${escape(Number(race.sailed) ? "Sailed" : "Unsailed")}</div> </div></div> </a>`;
          })} `;
        }(__value);
      }(data.await.races)}`} <div class="p-4 pb-12">${validate_component(Comments, "Comments").$$render(
        $$result,
        {
          type: "event",
          item: event,
          comments: data.comments,
          user,
          commentForm: data.commentForm
        },
        {},
        {}
      )}</div></div>`;
    }
  })}` : ``}`;
});
export {
  Page_1 as default
};
