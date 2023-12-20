import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, v as validate_component } from "./ssr.js";
import { L as Label } from "./index4.js";
import { a as cn } from "./index3.js";
const ErrorLabel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $errors, $$unsubscribe_errors;
  let { name } = $$props;
  let { formObj } = $$props;
  let { class: className = void 0 } = $$props;
  const { errors } = formObj;
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.formObj === void 0 && $$bindings.formObj && formObj !== void 0)
    $$bindings.formObj(formObj);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_errors();
  return `<label${add_attribute("for", name, 0)}${add_attribute("class", cn("flex justify-end label text-sm text-warning p-0 pt-4 h-2 text-right w-full max-w-md", className), 0)}>${$errors[name] ? `${escape($errors[name])}` : ``}</label>`;
});
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_constraints;
  let $errors, $$unsubscribe_errors;
  let $form, $$unsubscribe_form;
  let { formObj } = $$props;
  let { name } = $$props;
  let { placeholder = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { label = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  const { form, errors, constraints } = formObj;
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$unsubscribe_constraints = subscribe(constraints, (value) => value);
  if ($$props.formObj === void 0 && $$bindings.formObj && formObj !== void 0)
    $$bindings.formObj(formObj);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_constraints();
  $$unsubscribe_errors();
  $$unsubscribe_form();
  return `<div class="flex flex-col my-1 w-full">${validate_component(Label, "Label").$$render($$result, { label, name, formObj }, {}, {})} ${type === "password" ? `<input${add_attribute("name", name, 0)} type="password"${add_attribute("placeholder", placeholder ?? "", 0)}${add_attribute("aria-invalid", $errors.password ? "true" : void 0, 0)} class="${[
    escape(cn("input input-bordered w-full max-w-lg", className), true),
    $errors[name] ? "input-error" : ""
  ].join(" ").trim()}"${add_attribute("value", $form[name], 0)}>` : `${type === "email" ? `<input${add_attribute("name", name, 0)} type="email"${add_attribute("placeholder", placeholder ?? "", 0)}${add_attribute("aria-invalid", $errors.email ? "true" : void 0, 0)} class="${[
    escape(cn("input input-bordered w-full max-w-lg", className), true),
    $errors[name] ? "input-error" : ""
  ].join(" ").trim()}"${add_attribute("value", $form[name], 0)}>` : `${type === "address" ? `<input${add_attribute("name", name, 0)} type="text"${add_attribute("placeholder", placeholder ?? "", 0)}${add_attribute("aria-invalid", $errors[name] ? "true" : void 0, 0)} class="${[
    escape(cn("input input-bordered w-full max-w-lg", className), true),
    $errors[name] ? "input-error" : ""
  ].join(" ").trim()}"${add_attribute("value", $form.address[name], 0)}>` : `<input${add_attribute("name", name, 0)}${add_attribute("placeholder", placeholder ?? "", 0)}${add_attribute("aria-invalid", $errors[name] ? "true" : void 0, 0)} class="${[
    escape(cn("input input-bordered w-full max-w-lg", className), true),
    $errors[name] ? "input-error" : ""
  ].join(" ").trim()}"${add_attribute("value", $form[name], 0)}>`}`}`} ${validate_component(ErrorLabel, "ErrorLabel").$$render($$result, { name, formObj }, {}, {})}</div>`;
});
export {
  ErrorLabel as E,
  Input as I
};
