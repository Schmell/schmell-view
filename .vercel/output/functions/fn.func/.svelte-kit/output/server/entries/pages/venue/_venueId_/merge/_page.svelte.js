import { c as create_ssr_component, v as validate_component, e as escape, b as add_attribute } from "../../../../../chunks/ssr.js";
import { P as Page } from "../../../../../chunks/Page.js";
import "devalue";
import "../../../../../chunks/form.js";
import "clsx";
import "../../../../../chunks/index.js";
import { B as Button } from "../../../../../chunks/button.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let venue;
  let venueToMerge;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ venue, venueToMerge } = data);
  return `${validate_component(Page, "Page").$$render($$result, { title: "Merge Venues" }, {}, {
    default: () => {
      return `${venue?.error ? `<div class="font-bold text-warning">${escape(venue.error)}</div> ${venue?.errCode === "m-001" ? `<p data-svelte-h="svelte-189fjqx">You can request the Publisher to merge this venue with your Series or Events</p> ` : ``}` : ``} ${venue?.data ? `<div class="text-xl font-semibold underline pb-2" data-svelte-h="svelte-1rx1yii">You are trying to merge:</div> <div><div><a href="${"/venue/" + escape(venueToMerge?.id, true)}" class="font-semibold">${escape(venueToMerge?.name && venueToMerge?.name.length > 0 ? venueToMerge?.name : "No name provided")}</a></div> <div class="text-sm" data-svelte-h="svelte-1txxug3">with</div> <div>${venue?.data ? `<a href="${"/venue/" + escape(venue?.data?.id, true)}" class="font-semibold">${escape(venue?.data.name)}</a>` : ``}</div></div> <div class="text-lg pt-4" data-svelte-h="svelte-1slyvqd">Include:</div> <hr class="border-primary pb-2"> <form method="post" action="?/merge"><input type="hidden" name="venueId"${add_attribute("value", venue?.data?.id, 0)}> <input type="hidden" name="toMergeId"${add_attribute("value", venueToMerge?.id, 0)}> <input type="hidden" name="publisherEmail"${add_attribute("value", venue?.data.Publisher?.email, 0)}> <input type="hidden" name="requesterEmail"${add_attribute("value", venueToMerge?.Publisher?.email, 0)}> ${venueToMerge?._count.Series ? `<label for="series" class="label"><div>Series <span class="tex-xs opacity-60">(${escape(venueToMerge._count.Series)})</span></div> <input name="series" type="checkbox" checked class="checkbox"></label>` : ``} ${venueToMerge?._count.Events ? `<label for="events" class="label"><div>Events <span class="tex-xs opacity-60">(${escape(venueToMerge._count.Events)})</span></div> <input name="events" type="checkbox" checked class="checkbox"></label>` : ``} ${venueToMerge?._count.Comments ? `<label for="comments" class="label"><div>Comments <span class="tex-xs opacity-60">(${escape(venueToMerge._count.Comments)})</span></div> <input name="comments" type="checkbox" checked class="checkbox"></label>` : ``} ${venueToMerge?._count.Likes ? `<label for="likes" class="label"><div>Likes <span class="tex-xs opacity-60">(${escape(venueToMerge._count.Likes)})</span></div> <input name="likes" type="checkbox" checked class="checkbox"></label>` : ``} ${venueToMerge?._count.Follows ? `<label for="follows" class="label"><div>Follows <span class="tex-xs opacity-60">(${escape(venueToMerge._count.Follows)})</span></div> <input name="follows" type="checkbox" checked class="checkbox"></label>` : ``} ${venue?.errCode === "m-001" ? `${validate_component(Button, "Button").$$render($$result, { formaction: "?/requestMerge" }, {}, {
        default: () => {
          return `Request Merge`;
        }
      })}` : `${validate_component(Button, "Button").$$render($$result, {}, {}, {
        default: () => {
          return `Merge`;
        }
      })}`}</form>` : `<div data-svelte-h="svelte-gdmtno">An Error Occured</div>`}`;
    }
  })}`;
});
export {
  Page_1 as default
};
