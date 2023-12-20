import { c as create_ssr_component, v as validate_component, k as each, e as escape, b as add_attribute } from "../../../chunks/ssr.js";
import { P as Page } from "../../../chunks/Page.js";
import { L as Like_follow } from "../../../chunks/like-follow.js";
import { I as Icon } from "../../../chunks/Icon.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let venues;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ user, venues } = data);
  return `${validate_component(Page, "Page").$$render($$result, { title: "All Venues" }, {}, {
    default: () => {
      return `${venues ? `${each(venues, (venue) => {
        return `<div class="py-4"><div class="w-full border-r-4 border-b-2 border-base-300 shadow-lg rounded-lg"><div class="flex justify-between items-center p-2 rounded-t-lg shadow-md bg-base-100"><div class="flex gap-2 text-xl font-semibold">${escape(venue.name)} ${venue.burgee?.startsWith("http") ? `<img${add_attribute("src", venue.burgee, 0)} width="24" alt="venue burgee">` : ``}</div> <img${add_attribute("src", venue.Publisher?.avatar, 0)} width="24"${add_attribute("alt", venue.Publisher?.name, 0)}></div> <div class="p-2"><div>${venue._count.Series ? `<a href="${"/series?whereType=venueId&whereId=" + escape(venue.id, true) + "&title=" + escape(venue.name, true) + " Series"}">${escape(venue._count.Series)} Series</a>
								/` : ``} <a href="${"/events?whereType=venueId&whereId=" + escape(venue.id, true) + "&title=" + escape(venue.name, true) + " Events"}">${escape(venue._count.Events)} ${escape(venue._count.Events <= 1 ? "Event" : "Events")} </a></div> <div class="text-sm">${venue._count.Follows ? `${escape(venue._count.Follows)} Follows` : ``} ${venue._count.Likes ? `${escape(venue._count.Likes)} Likes` : ``} </div></div> <div class="flex gap-2 p-2 justify-between items-end"><div class="text-xs"><a href="${"mailto:" + escape(venue.email, true)}" target="_blank">${escape(venue.email)}</a> <a${add_attribute("href", venue.website, 0)} class="flex gap-1 items-center" target="_blank">${validate_component(Icon, "Icon").$$render($$result, { icon: "clarity:pop-out-line" }, {}, {})} ${escape(venue.website)} </a></div> ${validate_component(Like_follow, "LikeFollow").$$render(
          $$result,
          {
            type: "venue",
            item: venue,
            userId: user?.userId
          },
          {},
          {}
        )} </div></div> </div>`;
      })}` : ``}`;
    }
  })}`;
});
export {
  Page_1 as default
};
