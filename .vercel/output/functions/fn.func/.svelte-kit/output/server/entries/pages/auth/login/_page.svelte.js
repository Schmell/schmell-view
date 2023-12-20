import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { s as superForm, F as Form } from "../../../../chunks/index4.js";
import { f as flashModule } from "../../../../chunks/client.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import "clsx";
import { I as Input } from "../../../../chunks/input.js";
import { B as Button } from "../../../../chunks/button.js";
import { P as Page } from "../../../../chunks/Page.js";
/* empty css                                                         */const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  return `${$$result.head += `<!-- HEAD_svelte-tf6u4f_START -->${$$result.title = `<title>Login - Svelte-way</title>`, ""}<!-- HEAD_svelte-tf6u4f_END -->`, ""} ${validate_component(Page, "Page").$$render($$result, { title: "Login" }, {}, {
    default: () => {
      return `<p class="m-0" data-svelte-h="svelte-13m7vst">Don&#39;t have an account? <a href="/auth/register">Register</a></p> ${validate_component(Form, "Form").$$render($$result, { formObj }, {}, {
        bottomLinks: () => {
          return `<div slot="bottomLinks" class="mt-1"><a href="/auth/password-reset" data-svelte-h="svelte-r0tkfp">Reset password</a>  <div class="flex flex-col gap-1"><a class="btn btn-ghost" href="/auth/login/github">${validate_component(Icon, "Icon").$$render($$result, { icon: "fa6-brands:github" }, {}, {})} Sign in with Github</a> <a class="btn btn-ghost" href="/auth/login/google">${validate_component(Icon, "Icon").$$render($$result, { icon: "devicon:google" }, {}, {})} Sign in with Google</a> <a class="btn btn-ghos btn-disabled" href="/auth/login/facebook">${validate_component(Icon, "Icon").$$render($$result, { icon: "devicon:facebook" }, {}, {})} Sign in with facebook</a></div></div>`;
        },
        default: () => {
          return `${validate_component(Input, "Input").$$render($$result, { name: "email", type: "email", formObj }, {}, {})} ${validate_component(Input, "Input").$$render(
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
              return `submit`;
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
