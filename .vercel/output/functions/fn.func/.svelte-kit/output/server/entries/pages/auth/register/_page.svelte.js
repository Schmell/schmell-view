import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { s as superForm, F as Form } from "../../../../chunks/index4.js";
import { e as emailRegisterSchema } from "../../../../chunks/emailRegisterSchema.js";
import "clsx";
import { I as Input } from "../../../../chunks/input.js";
import { B as Button } from "../../../../chunks/button.js";
import { P as Page } from "../../../../chunks/Page.js";
/* empty css                                                         */const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const formObj = superForm(data.form, {
    validators: emailRegisterSchema,
    autoFocusOnError: true
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-u8l8dl_START -->${$$result.title = `<title>Register - Svelte-way</title>`, ""}<!-- HEAD_svelte-u8l8dl_END -->`, ""} ${validate_component(Page, "Page").$$render($$result, { title: "Register" }, {}, {
    default: () => {
      return `<p class="m-0" data-svelte-h="svelte-1pznng7">Already have an account? <a href="/auth/login">Login</a></p> ${validate_component(Form, "Form").$$render($$result, { formObj }, {}, {
        bottomLinks: () => {
          return `<a href="/auth/login" data-svelte-h="svelte-14i773u">Login</a>`;
        },
        default: () => {
          return `${validate_component(Input, "Input").$$render($$result, { name: "email", type: "email", formObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "username", formObj }, {}, {})} ${validate_component(Input, "Input").$$render(
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
              label: "Last name",
              formObj
            },
            {},
            {}
          )} ${validate_component(Input, "Input").$$render($$result, { name: "avatar", formObj }, {}, {})} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "password",
              type: "password",
              formObj
            },
            {},
            {}
          )} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              name: "confirm",
              type: "password",
              label: "Confirm password",
              formObj
            },
            {},
            {}
          )} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `Register`;
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
