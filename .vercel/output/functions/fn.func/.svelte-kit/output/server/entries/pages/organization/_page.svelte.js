import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape, k as each, b as add_attribute } from "../../../chunks/ssr.js";
import { P as Page } from "../../../chunks/Page.js";
import { I as ItemCard } from "../../../chunks/ItemCard.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { p as page } from "../../../chunks/stores.js";
import { g as getHref } from "../../../chunks/index3.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let orgs;
  let user;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ orgs, user } = data);
  {
    console.log("orgs: ", orgs);
  }
  $$unsubscribe_page();
  return `${validate_component(Page, "Page").$$render($$result, { title: "All Organizations" }, {}, {
    trailing: () => {
      return `<div slot="trailing">${user ? `<a href="${"/organization/new/edit?from=" + escape($page.url.pathname, true)}">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon: "material-symbols:add-circle",
          width: "24"
        },
        {},
        {}
      )}</a>` : ``}</div>`;
    },
    default: () => {
      return `${!orgs.length ? `<div data-svelte-h="svelte-1sb1w42">No Organizations available yet</div>` : `${each(orgs, (org) => {
        return `${validate_component(ItemCard, "ItemCard").$$render(
          $$result,
          {
            title: org.name,
            href: "/organization/" + org.id
          },
          {},
          {
            "bottom-right": () => {
              return `<div slot="bottom-right" class="flex justify-end text-primary"> ${data.user?.userId === org?.ownerId ? `<div class="tooltip tooltip-top" data-tip="Organization Edit"><a data-sveltekit-replacestate href="${"/organization/" + escape(org?.id, true) + "/edit?from=" + escape($page.url.pathname, true)}" class="btn btn-ghost">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "material-symbols:edit-outline",
                  width: "24"
                },
                {},
                {}
              )}</a> </div>` : ``} </div>`;
            },
            "bottom-left": () => {
              return `<div slot="bottom-left">${org.createdAt ? `<div class="text-xs text-base-content m-2 ml-2">${escape(org.createdAt.toLocaleString())}</div>` : ``} </div>`;
            },
            "top-right": () => {
              return `<div slot="top-right" class="text-xs"><a href="${"/user/" + escape(org.Owner?.id, true)}">@${escape(org.Owner?.username)}</a> </div>`;
            },
            default: () => {
              return `<div><!-- HTML_TAG_START -->${org.description ?? "No description provided"}<!-- HTML_TAG_END --></div> <a${add_attribute("href", getHref(org.website), 0)} target="_blank" class="pt-2 flex items-center gap-1 text-sm font-semibold text-secondary">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "clarity:pop-out-line",
                  class: "inline"
                },
                {},
                {}
              )}<span>${escape(org.website)}</span></a> `;
            }
          }
        )}`;
      })}`}`;
    }
  })}`;
});
export {
  Page_1 as default
};
