import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { P as Page } from "../../../chunks/Page.js";
import "clsx";
/* empty css                                                      */import { I as ImportForm } from "../../../chunks/ImportForm.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let orgs;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ orgs } = data);
  return `${validate_component(Page, "Page").$$render($$result, { title: "Import from File" }, {}, {
    default: () => {
      return `${validate_component(ImportForm, "ImportForm").$$render($$result, Object.assign({}, { orgs }, $$props, { action: "?/newImport" }), {}, {})}`;
    }
  })}`;
});
export {
  Page_1 as default
};
