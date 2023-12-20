import { c as create_ssr_component, v as validate_component, e as escape, b as add_attribute } from "../../../../chunks/ssr.js";
import { P as Page } from "../../../../chunks/Page.js";
import "clsx";
/* empty css                                                         */import { s as superForm, F as Form } from "../../../../chunks/index4.js";
import { I as Input } from "../../../../chunks/input.js";
import { B as Button } from "../../../../chunks/button.js";
import { f as flashModule } from "../../../../chunks/client.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
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
  ({ user } = data);
  return `${validate_component(Page, "Page").$$render($$result, { title: user?.username }, {}, {
    default: () => {
      return `<hgroup><div class="flex justify-between items-center"><h3>${escape(user?.email)}</h3> <a class="btn btn-xs" href="/auth/change-email" data-svelte-h="svelte-gvv7bk">change</a></div></hgroup> ${validate_component(Form, "Form").$$render($$result, { formObj }, {}, {
        default: () => {
          return `${validate_component(Input, "Input").$$render($$result, { name: "username", formObj }, {}, {})} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "firstname",
              label: "First name",
              formObj
            },
            {},
            {}
          )} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "lastname",
              label: " Last name",
              formObj
            },
            {},
            {}
          )} <div class="flex items-center gap-2 w-full max-w-lg">${validate_component(Input, "Input").$$render($$result, { name: "avatar", formObj }, {}, {})} <div class="w-14 rounded-full border-2 flex justify-center items-center border-base-100 z-10"><img class="z-0"${add_attribute("src", user?.avatar, 0)}${add_attribute("alt", user?.name, 0)}></div></div> ${validate_component(Button, "Button").$$render($$result, {}, {}, {
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
