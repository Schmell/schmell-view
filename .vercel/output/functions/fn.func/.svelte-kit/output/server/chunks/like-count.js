import { c as create_ssr_component, e as escape, v as validate_component } from "./ssr.js";
import { a as cn } from "./index3.js";
import { I as Icon } from "./Icon.js";
import { e as error } from "./index.js";
const Like_count = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: className = void 0 } = $$props;
  let { userId } = $$props;
  if (!userId) {
    throw error(400, "Invalid userId in like component");
  }
  let { item } = $$props;
  let { type } = $$props;
  function checkForUserLike(item2) {
    if (!item2.Likes)
      return false;
    if (item2.Likes.some((like2) => like2.userId === userId)) {
      return true;
    }
    return false;
  }
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.userId === void 0 && $$bindings.userId && userId !== void 0)
    $$bindings.userId(userId);
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  return `<div class="${[
    escape(cn("flex items-center gap-2 px-2 rounded-full", className), true),
    (checkForUserLike(item) ? "bg-accent" : "") + " " + (!checkForUserLike(item) ? "bg-base-100" : "")
  ].join(" ").trim()}">${checkForUserLike(item) ? `<button>${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      class: "text-base-100",
      icon: "mdi:thumb-up"
    },
    {},
    {}
  )}</button>` : ` <button ${userId === item.User?.id || userId === item.publisherId ? "disabled" : ""}>${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:thumb-up-outline" }, {}, {})}</button>`} <div class="${[
    "border-l-2 border-base-200 pl-2 cursor-default",
    checkForUserLike(item) ? "text-base-100" : ""
  ].join(" ").trim()}">${escape(item._count ? item._count.Likes : 0)}</div></div>`;
});
export {
  Like_count as L
};
