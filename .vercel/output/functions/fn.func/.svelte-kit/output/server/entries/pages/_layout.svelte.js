import { g as get_store_value, c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, e as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import "clsx";
import { w as writable } from "../../chunks/index2.js";
import { I as Icon } from "../../chunks/Icon.js";
import { g as getFlash } from "../../chunks/client.js";
const TOAST_LIMIT = 20;
const toasts = writable([]);
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    remove(toastId);
  }, 1e3);
  toastTimeouts.set(toastId, timeout);
};
const clearFromRemoveQueue = (toastId) => {
  const timeout = toastTimeouts.get(toastId);
  if (timeout) {
    clearTimeout(timeout);
  }
};
function update(toast2) {
  if (toast2.id) {
    clearFromRemoveQueue(toast2.id);
  }
  toasts.update(($toasts) => $toasts.map((t) => t.id === toast2.id ? { ...t, ...toast2 } : t));
}
function add(toast2) {
  toasts.update(($toasts) => [toast2, ...$toasts].slice(0, TOAST_LIMIT));
}
function upsert(toast2) {
  if (get_store_value(toasts).find((t) => t.id === toast2.id)) {
    update(toast2);
  } else {
    add(toast2);
  }
}
function dismiss(toastId) {
  toasts.update(($toasts) => {
    if (toastId) {
      addToRemoveQueue(toastId);
    } else {
      $toasts.forEach((toast2) => {
        addToRemoveQueue(toast2.id);
      });
    }
    return $toasts.map((t) => t.id === toastId || toastId === void 0 ? { ...t, visible: false } : t);
  });
}
function remove(toastId) {
  toasts.update(($toasts) => {
    if (toastId === void 0) {
      return [];
    }
    return $toasts.filter((t) => t.id !== toastId);
  });
}
const isFunction = (valOrFunction) => typeof valOrFunction === "function";
const resolveValue = (valOrFunction, arg) => isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;
const genId = (() => {
  let count = 0;
  return () => {
    count += 1;
    return count.toString();
  };
})();
const createToast = (message, type = "blank", opts) => ({
  createdAt: Date.now(),
  visible: true,
  type,
  ariaProps: {
    role: "status",
    "aria-live": "polite"
  },
  message,
  pauseDuration: 0,
  ...opts,
  id: opts?.id || genId()
});
const createHandler = (type) => (message, options) => {
  const toast2 = createToast(message, type, options);
  upsert(toast2);
  return toast2.id;
};
const toast = (message, opts) => createHandler("blank")(message, opts);
toast.error = createHandler("error");
toast.success = createHandler("success");
toast.loading = createHandler("loading");
toast.custom = createHandler("custom");
toast.dismiss = (toastId) => {
  dismiss(toastId);
};
toast.remove = (toastId) => remove(toastId);
toast.promise = (promise, msgs, opts) => {
  const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading });
  promise.then((p) => {
    toast.success(resolveValue(msgs.success, p), {
      id,
      ...opts,
      ...opts?.success
    });
    return p;
  }).catch((e) => {
    toast.error(resolveValue(msgs.error, e), {
      id,
      ...opts,
      ...opts?.error
    });
  });
  return promise;
};
const CheckmarkIcon_svelte_svelte_type_style_lang = "";
const ErrorIcon_svelte_svelte_type_style_lang = "";
const LoaderIcon_svelte_svelte_type_style_lang = "";
const ToastIcon_svelte_svelte_type_style_lang = "";
const ToastMessage_svelte_svelte_type_style_lang = "";
const ToastBar_svelte_svelte_type_style_lang = "";
const ToastWrapper_svelte_svelte_type_style_lang = "";
const Toaster_svelte_svelte_type_style_lang = "";
const app = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-imontg.svelte-imontg{@apply bg-base-200;;width:100%;height:100vh;position:absolute}.shadow.svelte-imontg.svelte-imontg{box-shadow:inset 2px 0 10px hsla(0, 0%, 8%, 0.575)}footer.svelte-imontg.svelte-imontg{@apply bg-primary-focus text-base-200;;display:flex;align-items:center;justify-content:center;width:100%;height:2em;position:fixed;bottom:0;border-top-left-radius:2em}.navbar.svelte-imontg.svelte-imontg{@apply bg-primary-focus shadow-md;;display:flex;justify-content:space-between;padding-inline-start:0em;padding-inline-end:2em;border-bottom-right-radius:3em;border-bottom-width:0.25em}.disclosure-panel.svelte-imontg.svelte-imontg{@apply bg-base-100 shadow-lg;;@apply border-base-300;;z-index:10;padding-bottom:3em;padding-top:0.25em;padding-right:0.5em;border-right-width:0.25em;border-bottom-right-radius:3em}.link-list.svelte-imontg>a.svelte-imontg{@apply flex w-full gap-2 items-center px-4 py-2 text-left text-xl;}.link-list.svelte-imontg>a.svelte-imontg:hover{@apply bg-base-300;}.user-nav.svelte-imontg.svelte-imontg{display:flex;gap:0.5em;align-items:center}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let $page, $$unsubscribe_page;
  let $flash, $$unsubscribe_flash;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  const flash = getFlash(page);
  $$unsubscribe_flash = subscribe(flash, (value) => $flash = value);
  flash.subscribe(($flash2) => {
    if (!$flash2)
      return;
    if ($flash2.type == "success") {
      toast.success($flash2.message, {
        icon: "✅",
        position: "bottom-center",
        className: "mb-96 z-10 absolute"
      });
    }
    if ($flash2.type == "error") {
      toast.error($flash2.message, { icon: "❌" });
    }
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  ({ user } = data);
  $$unsubscribe_page();
  $$unsubscribe_flash();
  return ` <div class="fixed top-0 z-20 w-full"><nav class="navbar border-base-300 text-secondary-content svelte-imontg"><button class="btn-ghost btn hover:bg-transparent"><label class="swap swap-rotate"> <input type="checkbox"> ${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      class: "swap-off text-4xl text-primary-content opacity-90",
      icon: "mdi:menu"
    },
    {},
    {}
  )} ${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      class: "swap-on text-4xl text-primary-content opacity-90",
      icon: "mdi:close"
    },
    {},
    {}
  )}</label></button> <div class="user-nav svelte-imontg"> ${data.user ? `<div class="dropdown-end dropdown avatar rounded-full border-2 border-neutral-content bg-black bg-opacity-20 drop-shadow-lg focus:bg-base-100"><div tabindex="-1" class="w-10 rounded-full select-none"><img${add_attribute("src", user?.avatar, 0)}${add_attribute("alt", user?.name, 0)}></div> <ul tabindex="-1" class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 text-base-content drop-shadow-lg"><li><a href="${"/auth/profile?from=" + escape($page.url.pathname, true)}">Profile</a></li> <li><a href="${"/auth/settings?from=" + escape($page.url.pathname, true)}">Settings</a></li>  <li data-svelte-h="svelte-88iacx"><div class="divider m-0 p-0"></div></li> <li data-svelte-h="svelte-1eyvmkn"><form method="POST"><button formaction="/?/logout" type="submit">Logout</button></form></li></ul></div>` : `<a href="/auth/login" class="btn btn-primary btn-xs rounded-full shadow-lg" data-svelte-h="svelte-1czp0bn">Login</a>`}</div></nav> ${``}</div> <main class="svelte-imontg">${slots.default ? slots.default({}) : ``}</main> <footer class="shadow relative svelte-imontg">${$flash ? `<div class="${[
    "w-full flex justify-between items-center absolute bottom-16",
    ($flash.type === "success" ? "bg-success" : "") + " " + ($flash.type == "error" ? "bg-error" : "")
  ].join(" ").trim()}"><div id="flashMessage" class="${[
    "p-2 text-lg font-semibold w-full z-10",
    ($flash.type == "error" ? "text-error-content" : "") + " " + ($flash.type === "success" ? "text-success-content" : "")
  ].join(" ").trim()}">${escape($flash.message)}</div> <button class="${[
    "pr-4",
    ($flash.type == "error" ? "text-error-content" : "") + " " + ($flash.type === "success" ? "text-success-content" : "")
  ].join(" ").trim()}">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:close", width: "24" }, {}, {})}</button></div>` : ``} <div class="btm-nav text-base-content"> <a href="/">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "mdi:home-import-outline",
      width: "24"
    },
    {},
    {}
  )}</a> <a href="/">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "material-symbols:circle-outline",
      width: "34"
    },
    {},
    {}
  )}</a> <button>${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:menu", width: "24" }, {}, {})}</button></div></footer> `;
});
export {
  Layout as default
};
