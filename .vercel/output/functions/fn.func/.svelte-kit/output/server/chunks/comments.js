import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, v as validate_component, n as noop, k as each, y as add_classes } from "./ssr.js";
import "devalue";
import { p as page } from "./stores.js";
import { L as Like_count } from "./like-count.js";
import { f as formatDateTime } from "./formatters.js";
import { I as Icon } from "./Icon.js";
import { s as superForm, F as Form } from "./index4.js";
import "clsx";
import { I as Input } from "./input.js";
import { f as flashModule } from "./client.js";
const Comment = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { item } = $$props;
  let { user } = $$props;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  $$unsubscribe_page();
  return `<div class="flex items-start gap-2"><div class="avatar pt-1"><div class="w-8 h-8 rounded-full"><img${add_attribute("alt", item.User.username, 0)}${add_attribute("src", item.User.avatar, 0)}></div></div> <div class="flex gap-2 py-2 items-end w-full justify-between pr-4"><div class="w-full"><div class="font-bold pb-2"><a href="${"/user/" + escape(item.User.id, true)}">${escape(`@${item.User.username}`)}</a></div> <div><!-- HTML_TAG_START -->${item.comment}<!-- HTML_TAG_END --></div> <div class="text-xs text-accent">${escape(formatDateTime(item?.createdAt ?? /* @__PURE__ */ new Date()))}</div></div> ${user.userId === item.User?.id || user?.userId === item.publisherId ? `<div class="dropdown dropdown-top dropdown-end pb-1"> <label tabindex="-1">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:dots-vertical" }, {}, {})}</label> <div tabindex="-1" class="dropdown-content menu shadow-lg bg-base-200 rounded-box w-24"><a href="${escape($page.url.pathname, true) + "?editComment=" + escape(item.id, true)}" class="btn btn-xs">Edit</a>  <form method="post" action="/api/comment/?/delete"><input type="hidden" name="id"${add_attribute("value", item.id, 0)}> <button class="btn btn-xs w-full text-error" data-svelte-h="svelte-ehj3td">Delete</button></form></div></div>` : ``} <div class="flex flex-col gap-4 justify-between relative">${validate_component(Like_count, "LikeCount").$$render(
    $$result,
    {
      userId: user?.userId,
      type: "comment",
      item
    },
    {},
    {}
  )}</div></div></div>`;
});
const CommentForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let delayed;
  let $delayed, $$unsubscribe_delayed = noop, $$subscribe_delayed = () => ($$unsubscribe_delayed(), $$unsubscribe_delayed = subscribe(delayed, ($$value) => $delayed = $$value), delayed);
  let { commentForm } = $$props;
  let { itemId } = $$props;
  let { type } = $$props;
  let { action } = $$props;
  let { user } = $$props;
  const formObj = superForm(commentForm, {
    onSubmit() {
    },
    onResult() {
    },
    flashMessage: {
      module: flashModule,
      onError: ({ result, message }) => {
        message.set({
          type: "error",
          message: result.error.message
        });
      }
    }
  });
  if ($$props.commentForm === void 0 && $$bindings.commentForm && commentForm !== void 0)
    $$bindings.commentForm(commentForm);
  if ($$props.itemId === void 0 && $$bindings.itemId && itemId !== void 0)
    $$bindings.itemId(itemId);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.action === void 0 && $$bindings.action && action !== void 0)
    $$bindings.action(action);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  $$subscribe_delayed({ delayed } = formObj);
  $$unsubscribe_delayed();
  return `${validate_component(Form, "Form").$$render($$result, { action, formObj }, {}, {
    default: () => {
      return `<input type="hidden" name="itemId"${add_attribute("value", itemId, 0)}> <input type="hidden" name="type"${add_attribute("value", type, 0)}> <input type="hidden" name="userId"${add_attribute("value", user?.userId, 0)}> <div class="join w-full">${validate_component(Input, "Input").$$render(
        $$result,
        {
          formObj,
          name: "comment",
          label: " ",
          placeholder: "add a comment",
          class: "rounded-r-none shadow-lg"
        },
        {},
        {}
      )} ${$delayed ? `<button class="join-item btn btn-primary w-24 mt-1" ${$delayed ? "disabled" : ""}><span class="loading loading-dots loading-md"></span></button>` : `<button class="join-item btn btn-primary w-24 mt-1" data-svelte-h="svelte-1pxqro9">post</button>`}</div>`;
    }
  })}`;
});
const Comments = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pageComments;
  let { comments } = $$props;
  let { item } = $$props;
  let { user } = $$props;
  let { commentForm } = $$props;
  let { type } = $$props;
  function uniqueAvatars() {
    const array = comments?.map((comment) => {
      return comment.User?.avatar;
    });
    return new Set(array);
  }
  let newBatch = [];
  if ($$props.comments === void 0 && $$bindings.comments && comments !== void 0)
    $$bindings.comments(comments);
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  if ($$props.commentForm === void 0 && $$bindings.commentForm && commentForm !== void 0)
    $$bindings.commentForm(commentForm);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  pageComments = [...comments, ...newBatch];
  return `<div class="mt-4"><div class="flex gap-2 justify-between items-end"><div class="font-semibold" data-svelte-h="svelte-148kom4">Comments:</div> <div class="avatar-group -space-x-4">${comments ? `${each(uniqueAvatars(), (avatar) => {
    return `<div class="avatar"><div class="w-6 bg-base-300"><img alt=""${add_attribute("src", avatar, 0)}></div> </div>`;
  })}` : ``} <div class="avatar placeholder"><div class="w-6 bg-neutral-focus text-neutral-content"><span${add_classes((item._count.Comments >= 10 ? "text-xs" : "").trim())}>+${escape(item._count.Comments)}</span></div></div></div></div> <hr> ${validate_component(CommentForm, "CommentForm").$$render(
    $$result,
    {
      action: "/api/comment/?/comment",
      commentForm,
      type,
      user,
      itemId: item.id ?? ""
    },
    {},
    {}
  )} <div>${each(pageComments, (i) => {
    return `${validate_component(Comment, "Comment").$$render($$result, { user, item: i }, {}, {})}`;
  })}  </div>  ${item._count.Comments > 4 ? `<div class="py-4"><button class="btn btn-outline btn-sm w-full" ${""}>${`See more`}</button></div>` : ``} </div>`;
});
export {
  Comments as C
};
