import { c as create_ssr_component, v as validate_component } from "../../../../../../chunks/ssr.js";
import { s as superForm, F as Form } from "../../../../../../chunks/index4.js";
import { T as Textarea } from "../../../../../../chunks/textarea.js";
import "clsx";
import { I as Input } from "../../../../../../chunks/input.js";
import { B as Button } from "../../../../../../chunks/button.js";
import { P as Page } from "../../../../../../chunks/Page.js";
import { c as compSchema } from "../../../../../../chunks/schema.js";
import { f as flashModule } from "../../../../../../chunks/client.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const formObj = superForm(data.form, {
    taintedMessage: "Finish filling out the form or your data will be lost?",
    validators: compSchema,
    dataType: "json",
    flashMessage: {
      module: flashModule,
      onError: ({ result, message }) => {
        result.error.message;
        message.set({ type: "error", message: "Error" });
      }
    }
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Page, "Page").$$render($$result, { title: "Edit Competitior" }, {}, {
    default: () => {
      return `${validate_component(Form, "Form").$$render($$result, { formObj }, {}, {
        default: () => {
          return `${validate_component(Input, "Input").$$render($$result, { name: "boat", formObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "skipper", formObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "sailno", formObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "club", formObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "rating", formObj }, {}, {})} ${validate_component(Textarea, "Textarea").$$render($$result, { name: "description", formObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "image", formObj }, {}, {})} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `Submit`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
export {
  Page_1 as default
};
