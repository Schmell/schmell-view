import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, e as escape, k as each } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import { P as Page } from "../../../../chunks/Page.js";
import { L as Like_follow } from "../../../../chunks/like-follow.js";
import { C as Comments } from "../../../../chunks/comments.js";
import { I as Icon } from "../../../../chunks/Icon.js";
function getHref(website) {
  if (!website)
    return null;
  return website && website.startsWith("http://") ? website : `http://${website}`;
}
function checkForImage(imageString) {
  if (!imageString)
    return null;
  if (imageString.startsWith("http://") || imageString.startsWith("https://") || imageString.startsWith("data:image"))
    return imageString;
  return "";
}
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let venue;
  let user;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ venue, user } = data);
  $$unsubscribe_page();
  return `${validate_component(Page, "Page").$$render($$result, { title: venue.name }, {}, {
    default: () => {
      return `<div class="relative w-full">${checkForImage(venue.burgee) ? `<img class="absolute z-10 -left-2 -top-2 rounded-full shadow-xl" width="60px"${add_attribute("src", venue.burgee, 0)}${add_attribute("alt", venue.name, 0)}>` : ``} <div class="relative pb-0"><div class="w-full rounded-tr-xl rounded-tl-xl rounded-bl-xl rounded-br-full"><img class="${["pl-2 rounded-xl w-full", !venue.titleImage ? "blur-sm" : ""].join(" ").trim()}"${add_attribute(
        "src",
        venue.titleImage ? venue.titleImage : "https://cork.org/wp-content/uploads/2011/06/POHBirdsEyeView.jpg",
        0
      )}${add_attribute("alt", venue.name, 0)}></div> <div class="absolute -bottom-3 right-0">${validate_component(Like_follow, "LikeFollow").$$render(
        $$result,
        {
          type: "venue",
          item: venue,
          userId: user?.userId
        },
        {},
        {}
      )}</div></div></div> ${venue.description ? `<div class="mt-8 p-4 relative text-lg bg-base-300 border-base-300 border-b-2 border-l-2 rounded-xl shadow-lg"><div class="absolute uppercase drop-shadow-md line-clamp-1 -top-4 -left-0 tracking-wide text-xl text-accent font-semibold"><!-- HTML_TAG_START -->${venue.name}<!-- HTML_TAG_END --></div> <!-- HTML_TAG_START -->${venue.description}<!-- HTML_TAG_END --></div>` : ``}  <div class="py-2 flex justify-between items-center"><div><div class="flex gap-2 items-center pt-4 text-md font-bold uppercase">${validate_component(Icon, "Icon").$$render($$result, { icon: "gridicons:popout" }, {}, {})} <a${add_attribute("href", getHref(venue.website), 0)}>${escape(venue.website ? venue.website : "no website provided")}</a></div> <div class="flex gap-2 items-center pt-4 text-md font-bold uppercase">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:eye-arrow-right-outline" }, {}, {})} <a href="${"/events?whereType=venueId&whereId=" + escape(venue.id, true) + "&title=" + escape(venue.name, true) + " events"}">View events</a></div></div>  <div class="flex gap-2 items-center"><div class="avatar"><div class="w-8 rounded-full bg-base-content shadow-lg"><img${add_attribute("alt", venue.Publisher?.username, 0)}${add_attribute("src", venue.Publisher?.avatar, 0)}></div></div></div></div> <div class="divider"></div> <div class="flex gap-2 w-full max-w-md justify-between relative"><div class="w-full"><div class="text-sm grid grid-cols-2 gap-2"><div>${each(venue.Addresses, (address) => {
        return `<div class="text-lg font-semibold">${escape(address.label)}</div> <div class="pl-2 pr-4 pb-4">${address.po ? `<div>PO Box: ${escape(address.po)}</div>` : ``} <div>${escape(address.street)},</div> <span>${escape(address.city)},</span> <span>${escape(address.state)},</span> <span>${escape(address.country)},</span> <span>${escape(address.code)}</span> </div>`;
      })}</div> <div> ${each(venue.Contacts, (contact) => {
        return `<div class="text-lg font-semibold">${escape(contact.label)}</div> <ul class="pl-2">${contact.email ? `<li><a href="${"mailto:" + escape(contact.email, true)}" class="flex gap-2 items-center">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:email" }, {}, {})} ${escape(contact.email)}</a> </li>` : ``} ${contact.phone ? `<li><a href="${"tel:" + escape(contact.phone, true)}" class="flex gap-2 items-center">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:phone" }, {}, {})} ${escape(contact.phone)}</a> </li>` : ``} </ul>`;
      })}</div></div></div></div>  <div class="flex justify-end">${data.user?.userId === venue?.publisherId ? `<div class="tooltip tooltip-top" data-tip="Edit Event"><a${add_attribute("data-sveltekit-replacestate", true, 0)} href="${"/venue/" + escape(venue?.id, true) + "/edit?from=" + escape($page.url.pathname, true) + "&" + escape($page.url.searchParams, true)}" class="btn btn-ghost p-1">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          class: "text-3xl text-primary",
          icon: "material-symbols:edit-outline"
        },
        {},
        {}
      )}</a></div>` : ``}</div>  ${validate_component(Comments, "Comments").$$render(
        $$result,
        {
          item: venue,
          type: "venue",
          user: data.user,
          commentForm: data.commentForm,
          comments: venue.Comments
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
