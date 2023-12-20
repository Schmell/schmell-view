import { c as create_ssr_component, h as compute_rest_props, a as subscribe, v as validate_component, i as spread, p as escape_attribute_value, j as escape_object, b as add_attribute } from "./ssr.js";
import { f as formFieldProxy, L as Label } from "./index4.js";
import "devalue";
import "./form.js";
import "./index.js";
import { E as ErrorLabel } from "./input.js";
import { a as cn } from "./index3.js";
const Check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["formObj", "name", "group", "label", "class"]);
  let $$unsubscribe_constraints;
  let $errors, $$unsubscribe_errors;
  let $value, $$unsubscribe_value;
  let { formObj } = $$props;
  let { name } = $$props;
  let { group = void 0 } = $$props;
  let { label = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  const { value, errors, constraints } = formFieldProxy(formObj, name);
  $$unsubscribe_value = subscribe(value, (value2) => $value = value2);
  $$unsubscribe_errors = subscribe(errors, (value2) => $errors = value2);
  $$unsubscribe_constraints = subscribe(constraints, (value2) => value2);
  if ($$props.formObj === void 0 && $$bindings.formObj && formObj !== void 0)
    $$bindings.formObj(formObj);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_constraints();
  $$unsubscribe_errors();
  $$unsubscribe_value();
  return `<span><div class="flex flex-col justify-center items-center my-1 w-full">${validate_component(Label, "Label").$$render(
    $$result,
    {
      class: "text-sm pb-1",
      label,
      name,
      formObj
    },
    {},
    {}
  )} <div class="form-control"><input${spread(
    [
      { type: "checkbox" },
      { size: "2" },
      {
        class: escape_attribute_value(cn("checkbox checkbox-sm checkbox-primary", className))
      },
      escape_object($$restProps)
    ],
    {
      classes: $errors?.[name] ? "input-error" : ""
    }
  )}${add_attribute("checked", $value, 1)}></div> ${validate_component(ErrorLabel, "ErrorLabel").$$render($$result, { name, formObj }, {}, {})}</div></span>`;
});
export {
  Check as C
};
