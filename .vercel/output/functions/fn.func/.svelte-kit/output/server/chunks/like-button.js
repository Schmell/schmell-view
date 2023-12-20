import { c as create_ssr_component, v as validate_component } from "./ssr.js";
import { a as cn } from "./index3.js";
import { I as Icon } from "./Icon.js";
import { e as error } from "./index.js";
const Follow_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: _class = void 0 } = $$props;
  let { type } = $$props;
  let { item } = $$props;
  let { userId } = $$props;
  if (!userId) {
    throw error(400, "Invalid userId in like component");
  }
  function checkForUserFollow(item2) {
    if (!item2.Follows)
      return false;
    if (item2.Follows.some((follow2) => follow2.userId === userId)) {
      return true;
    }
    return false;
  }
  if ($$props.class === void 0 && $$bindings.class && _class !== void 0)
    $$bindings.class(_class);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  if ($$props.userId === void 0 && $$bindings.userId && userId !== void 0)
    $$bindings.userId(userId);
  return `${checkForUserFollow(item) ? `<button>${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      class: cn("text-base-content", _class),
      icon: "mdi:bell-ring"
    },
    {},
    {}
  )}</button>` : `  <button ${userId === item.User?.id || userId === item.publisherId ? "disabled" : ""}>${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      class: cn("text-base-content", _class),
      icon: "mdi:bell-badge-outline"
    },
    {},
    {}
  )}</button>`}`;
});
const Like_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: _class = void 0 } = $$props;
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
  if ($$props.class === void 0 && $$bindings.class && _class !== void 0)
    $$bindings.class(_class);
  if ($$props.userId === void 0 && $$bindings.userId && userId !== void 0)
    $$bindings.userId(userId);
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  return `${checkForUserLike(item) ? `<button>${`${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      class: cn("text-base-100", _class),
      icon: "mdi:thumb-up"
    },
    {},
    {}
  )}`}</button>` : ` <button ${userId === item.User?.id || userId === item.publisherId ? "disabled" : ""}>${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      class: cn("text-base-100", _class),
      icon: "mdi:thumb-up-outline"
    },
    {},
    {}
  )}</button>`}`;
});
export {
  Follow_button as F,
  Like_button as L
};
