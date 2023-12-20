import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import "devalue";
import { P as Page } from "../../../../chunks/Page.js";
import "clsx";
/* empty css                                                         */const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `${validate_component(Page, "Page").$$render($$result, { title: "Email verification" }, {}, {
    default: () => {
      return ` <p data-svelte-h="svelte-1fawv5l">Your email verification link was sent to your inbox (i.e. console).</p> <h2 data-svelte-h="svelte-1fgck9o">Resend verification link</h2> <form method="post" data-svelte-h="svelte-1q6nifm"><input type="submit" value="Resend" class="btn btn-sm btn-warning"></form> ${form?.success ? `<p data-svelte-h="svelte-xdzvo2">Your verification link was resent</p>` : ``}`;
    }
  })}`;
});
export {
  Page_1 as default
};
