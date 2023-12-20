import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, k as each, e as escape } from "./ssr.js";
import { c as capitalizeFirstLetter } from "./index3.js";
import { L as Label } from "./index4.js";
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let { name } = $$props;
  let { items } = $$props;
  let { label = void 0 } = $$props;
  let { formObj } = $$props;
  let { change = "" } = $$props;
  const { form } = formObj;
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.formObj === void 0 && $$bindings.formObj && formObj !== void 0)
    $$bindings.formObj(formObj);
  if ($$props.change === void 0 && $$bindings.change && change !== void 0)
    $$bindings.change(change);
  $$unsubscribe_form();
  return `<div class="flex flex-col my-1 w-full">${validate_component(Label, "Label").$$render($$result, { label, name, formObj }, {}, {})} <select${add_attribute("name", name, 0)} class="select select-bordered w-full max-w-md">${each(items, (item) => {
    return `<option${add_attribute("value", item, 0)} ${item === $form[name] ? "selected" : ""}>${escape(capitalizeFirstLetter(item))} </option>`;
  })}</select></div>`;
});
export {
  Select as S
};
