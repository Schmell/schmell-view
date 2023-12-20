import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, e as escape } from "./ssr.js";
import { E as ErrorLabel } from "./input.js";
import { L as Label } from "./index4.js";
import { a as cn } from "./index3.js";
const Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let { name } = $$props;
  let { formObj } = $$props;
  let { rows = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  const { form } = formObj;
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.formObj === void 0 && $$bindings.formObj && formObj !== void 0)
    $$bindings.formObj(formObj);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_form();
  return `<div class="flex flex-col my-1 w-full">${validate_component(Label, "Label").$$render($$result, { name, formObj }, {}, {})} <textarea${add_attribute("class", cn("textarea textarea-bordered max-w-lg", className), 0)}${add_attribute("name", name, 0)}${add_attribute("rows", rows, 0)}>${escape($form[name] || "")}</textarea> ${validate_component(ErrorLabel, "ErrorLabel").$$render($$result, { name, formObj }, {}, {})}</div>`;
});
export {
  Textarea as T
};
