import { c as create_ssr_component, v as validate_component, b as add_attribute, n as noop, a as subscribe, e as escape } from "../../../../chunks/ssr.js";
import "../../../../chunks/form.js";
import "clsx";
import "devalue";
import "../../../../chunks/index.js";
import { L as Label, F as Form, s as superForm } from "../../../../chunks/index4.js";
import { T as Textarea } from "../../../../chunks/textarea.js";
import { S as Select } from "../../../../chunks/select.js";
import { I as Input } from "../../../../chunks/input.js";
import { C as Check } from "../../../../chunks/check.js";
import { B as Button } from "../../../../chunks/button.js";
import { f as flashModule } from "../../../../chunks/client.js";
import { P as Page } from "../../../../chunks/Page.js";
/* empty css                                                         */const File = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { formObj } = $$props;
  let { label } = $$props;
  let { name } = $$props;
  if ($$props.formObj === void 0 && $$bindings.formObj && formObj !== void 0)
    $$bindings.formObj(formObj);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div class="flex flex-col my-1 w-full">${validate_component(Label, "Label").$$render($$result, { label, name, formObj }, {}, {})} <input type="file"${add_attribute("name", name, 0)} class="file-input file-input-bordered file-input-accent w-full max-w-lg"></div>`;
});
const Hidden = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let form;
  let $form, $$unsubscribe_form = noop, $$subscribe_form = () => ($$unsubscribe_form(), $$unsubscribe_form = subscribe(form, ($$value) => $form = $$value), form);
  let { name } = $$props;
  let { formObj } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.formObj === void 0 && $$bindings.formObj && formObj !== void 0)
    $$bindings.formObj(formObj);
  $$subscribe_form({ form } = formObj);
  $$unsubscribe_form();
  return `<input${add_attribute("name", name, 0)} type="hidden"${add_attribute("value", $form[name], 0)}>`;
});
const formItems = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button,
  Check,
  File,
  Form,
  Hidden,
  Input,
  Label,
  Select,
  Textarea
}, Symbol.toStringTag, { value: "Module" }));
const SuperForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $message, $$unsubscribe_message;
  let $$unsubscribe_debug;
  let { formData } = $$props;
  let { noDebug = false } = $$props;
  const formObj = superForm(formData, {
    autoFocusOnError: true,
    flashMessage: {
      module: flashModule,
      onError: ({ result, message: message2 }) => {
        const errorMessage = result.error.message;
        message2.set({ type: "error", message: errorMessage });
      }
    },
    syncFlashMessage: true
  });
  const { form: debug, message } = formObj;
  $$unsubscribe_debug = subscribe(debug, (value) => value);
  $$unsubscribe_message = subscribe(message, (value) => $message = value);
  if ($$props.formData === void 0 && $$bindings.formData && formData !== void 0)
    $$bindings.formData(formData);
  if ($$props.noDebug === void 0 && $$bindings.noDebug && noDebug !== void 0)
    $$bindings.noDebug(noDebug);
  if ($$props.formObj === void 0 && $$bindings.formObj && formObj !== void 0)
    $$bindings.formObj(formObj);
  $$unsubscribe_message();
  $$unsubscribe_debug();
  return `<form method="post"><div class="flex justify-end text-warning min-h-7"><div class="min-h-7">${$message ? `${escape($message)}` : ``}</div></div> ${slots.default ? slots.default({ ...formItems, formObj }) : ``} ${slots.bottomLinks ? slots.bottomLinks({}) : ``}</form> ${``}`;
});
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Page, "Page").$$render($$result, { title: "Link Accounts" }, {}, {
    default: () => {
      return `${validate_component(SuperForm, "SuperForm").$$render($$result, { formData: data.form }, {}, {
        default: ({ Button: Button2, Input: Input2, Textarea: Textarea2, formObj }) => {
          return `${validate_component(Input2, "Input").$$render($$result, { name: "name", formObj }, {}, {})} ${validate_component(Button2, "Button").$$render($$result, {}, {}, {
            default: () => {
              return `Submit`;
            }
          })}`;
        }
      })}`;
    }
  })} `;
});
export {
  Page_1 as default
};
