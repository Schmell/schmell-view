import { c as create_ssr_component, v as validate_component } from "./ssr.js";
import "clsx";
import "./functions.js";
import "./index.js";
import { L as Like_button, F as Follow_button } from "./like-button.js";
const Like_follow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { item } = $$props;
  let { userId } = $$props;
  let { type } = $$props;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  if ($$props.userId === void 0 && $$bindings.userId && userId !== void 0)
    $$bindings.userId(userId);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  return `<div class="flex items-center gap-1"><div class="p-3 text-xl w-8 h-8 flex items-center justify-center border-2 border-base-300 bg-base-100 rounded-full shadow-lg">${validate_component(Like_button, "LikeButton").$$render(
    $$result,
    {
      class: "text-base-content",
      item,
      userId,
      type
    },
    {},
    {}
  )}</div> <div class="p-4 text-xl w-8 h-8 flex items-center justify-center border-2 border-base-300 bg-base-100 rounded-full shadow-lg">${validate_component(Follow_button, "FollowButton").$$render(
    $$result,
    {
      class: "text-base-content",
      item,
      userId,
      type
    },
    {},
    {}
  )}</div></div>`;
});
export {
  Like_follow as L
};
