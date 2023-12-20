import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../../chunks/ssr.js";
import { g as goto } from "../../../../../chunks/navigation.js";
import { p as page } from "../../../../../chunks/stores.js";
import { s as superForm, F as Form } from "../../../../../chunks/index4.js";
import { T as Textarea } from "../../../../../chunks/textarea.js";
import "clsx";
import { I as Input } from "../../../../../chunks/input.js";
import { B as Button } from "../../../../../chunks/button.js";
import { P as Page } from "../../../../../chunks/Page.js";
/* empty css                                                            */import { O as OrganizationSchema } from "../../../../../chunks/InputJsonValueSchema.js";
import { f as flashModule } from "../../../../../chunks/client.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $form, $$unsubscribe_form;
  let $delayed, $$unsubscribe_delayed;
  let $timeout, $$unsubscribe_timeout;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  const formObj = superForm(data.form, {
    autoFocusOnError: true,
    taintedMessage: "Finish filling out the form or your information will be lost?",
    validators: OrganizationSchema,
    onUpdated() {
      const from = $page.url.searchParams.get("from");
      $page.url.searchParams.delete("from");
      goto(from + $page.url.search, { replaceState: true });
    },
    flashMessage: {
      module: flashModule,
      onError: ({ result, message }) => {
        const errorMessage = result.error.message;
        message.set({ type: "error", message: errorMessage });
      }
    }
  });
  const { form, delayed, timeout } = formObj;
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_delayed = subscribe(delayed, (value) => $delayed = value);
  $$unsubscribe_timeout = subscribe(timeout, (value) => $timeout = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_page();
  $$unsubscribe_form();
  $$unsubscribe_delayed();
  $$unsubscribe_timeout();
  return `${validate_component(Page, "Page").$$render(
    $$result,
    {
      title: $form.name === "New Organization" ? "Add a new Organization" : "Edit Organization"
    },
    {},
    {
      default: () => {
        return `${validate_component(Form, "Form").$$render($$result, { formObj }, {}, {
          default: () => {
            return `${validate_component(Input, "Input").$$render($$result, { name: "name", formObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "logo", formObj }, {}, {})} ${validate_component(Textarea, "Textarea").$$render($$result, { name: "description", rows: 3, formObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "website", formObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "email", type: "email", formObj }, {}, {})} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                name: "titleImage",
                label: "Title Image Url",
                formObj
              },
              {},
              {}
            )} ${validate_component(Button, "Button").$$render($$result, { disabled: $delayed }, {}, {
              default: () => {
                return `${$delayed || $timeout ? `<span class="loading loading-dots loading-md"></span>` : `Submit`}`;
              }
            })}`;
          }
        })}`;
      }
    }
  )}`;
});
export {
  Page_1 as default
};
