import { c as create_ssr_component, v as validate_component, e as escape, b as add_attribute } from "../../../../../../chunks/ssr.js";
import "devalue";
import { B as Button } from "../../../../../../chunks/button.js";
import { P as Page } from "../../../../../../chunks/Page.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let comp;
  let user;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ comp, user } = data);
  return `${validate_component(Page, "Page").$$render($$result, { title: "Add competitor" }, {}, {
    default: () => {
      return `<div>${comp ? `<div>${escape(comp.boat ?? comp.skipper ?? comp.sailno)}</div> <form method="post" action="?/addCompToUser"><input name="compId"${add_attribute("value", comp.id, 0)} type="hidden"> <input name="userId"${add_attribute("value", user?.userId, 0)} type="hidden"> ${validate_component(Button, "Button").$$render($$result, {}, {}, {
        default: () => {
          return `Add to User`;
        }
      })}</form>` : ``}</div>`;
    }
  })}`;
});
export {
  Page_1 as default
};
