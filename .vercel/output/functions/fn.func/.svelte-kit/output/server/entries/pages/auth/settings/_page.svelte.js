import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../chunks/ssr.js";
import { s as superForm, F as Form } from "../../../../chunks/index4.js";
import { t as themes } from "../../../../chunks/index3.js";
import { S as Select } from "../../../../chunks/select.js";
import { B as Button } from "../../../../chunks/button.js";
import { P as Page } from "../../../../chunks/Page.js";
/* empty css                                                         */const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $delayed, $$unsubscribe_delayed;
  let { data } = $$props;
  let langMap = ["english", "french", "spanish", "italian"];
  const formObj = superForm(data.form);
  const { form, delayed } = formObj;
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_delayed = subscribe(delayed, (value) => $delayed = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    if ($form.theme) {
      document.documentElement.setAttribute("data-theme", $form.theme);
    }
  }
  $$unsubscribe_form();
  $$unsubscribe_delayed();
  return `${validate_component(Page, "Page").$$render($$result, { title: "User Settings" }, {}, {
    default: () => {
      return `${validate_component(Form, "Form").$$render($$result, { formObj }, {}, {
        default: () => {
          return `${validate_component(Select, "Select").$$render(
            $$result,
            {
              name: "language",
              formObj,
              items: langMap
            },
            {},
            {}
          )} ${validate_component(Select, "Select").$$render($$result, { name: "theme", formObj, items: themes }, {}, {})} ${validate_component(Button, "Button").$$render($$result, { class: "mt-6", disabled: $delayed }, {}, {
            default: () => {
              return `${$delayed ? `<span class="loading loading-dots loading-md"></span>` : `Submit`}`;
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
