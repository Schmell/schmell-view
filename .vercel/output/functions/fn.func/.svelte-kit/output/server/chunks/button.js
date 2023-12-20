import { c as create_ssr_component, h as compute_rest_props, i as spread, p as escape_attribute_value, j as escape_object } from "./ssr.js";
import { a as cn } from "./index3.js";
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["type", "position", "class"]);
  let { type = "submit" } = $$props;
  let { position = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${position === "float" ? `<button${spread(
    [
      { type: escape_attribute_value(type) },
      {
        class: escape_attribute_value(cn("btn btn-primary mt-4 shadow-lg px-10 rounded-full fixed bottom-24 right-8", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</button>` : `<button${spread(
    [
      { type: escape_attribute_value(type) },
      {
        class: escape_attribute_value(cn("btn btn-primary mt-4 shadow-lg px-10 w-full max-w-md rounded-br-3xl", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</button>`}`;
});
export {
  Button as B
};
