import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/ssr.js";
import { s as superForm, F as Form } from "../../../../../chunks/index4.js";
import { f as flashModule } from "../../../../../chunks/client.js";
import "clsx";
import { I as Input } from "../../../../../chunks/input.js";
import { B as Button } from "../../../../../chunks/button.js";
import { P as Page } from "../../../../../chunks/Page.js";
/* empty css                                                            */const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const formObj = superForm(data.form, {
    autoFocusOnError: true,
    flashMessage: {
      module: flashModule,
      onError: ({ result, message }) => {
        const errorMessage = result.error.message;
        message.set({ type: "error", message: errorMessage });
      }
    },
    syncFlashMessage: true
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Page, "Page").$$render($$result, { title: "Reset password" }, {}, {
    default: () => {
      return `${validate_component(Form, "Form").$$render($$result, { formObj }, {}, {
        default: () => {
          return `${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "password",
              type: "password",
              formObj
            },
            {},
            {}
          )} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
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
