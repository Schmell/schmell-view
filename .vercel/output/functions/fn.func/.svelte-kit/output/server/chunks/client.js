import { w as writable } from "./index2.js";
import { g as get_store_value, q as onDestroy } from "./ssr.js";
import { t as tick } from "./scheduler.js";
import { B as BROWSER } from "./prod-ssr.js";
import { a as afterNavigate } from "./navigation.js";
const flashStores = /* @__PURE__ */ new WeakMap();
function initFlash(page, options) {
  return _initFlash(page, options);
}
function _initFlash(page, options) {
  if (flashStores.has(page)) {
    return flashStores.get(page).store;
  }
  options = {
    clearArray: false,
    clearOnNavigate: true,
    ...options
  };
  const store = writable();
  const context = { store, options };
  flashStores.set(page, context);
  clearCookieAndUpdateIfNewData(context, get_store_value(page).data.flash);
  const unsubscribeFromPage = page.subscribe(async ($page) => {
    if ($page.data.flash !== void 0) {
      updateFlash(page);
    }
  });
  let unsubscribeClearFlash;
  let flashTimeout = void 0;
  if (options.clearAfterMs && BROWSER) {
    unsubscribeClearFlash = store.subscribe(($flash) => {
      if ($flash) {
        if (flashTimeout)
          clearTimeout(flashTimeout);
        flashTimeout = setTimeout(() => store.set(void 0), options?.clearAfterMs);
      }
    });
  }
  onDestroy(() => {
    if (unsubscribeClearFlash) {
      if (flashTimeout)
        clearTimeout(flashTimeout);
      unsubscribeClearFlash();
    }
    unsubscribeFromPage();
    flashStores.delete(page);
  });
  afterNavigate(async (nav) => {
    if (nav.type != "enter" && options?.clearOnNavigate && nav.from?.url.toString() != nav.to?.url.toString()) {
      store.set(void 0);
    }
    if (["form", "goto"].includes(nav.type)) {
      updateFlash(page);
    }
  });
  return store;
}
function getFlash(page, options) {
  const context = flashStores.get(page);
  if (!context)
    return _initFlash(page, options);
  if (options) {
    throw new Error("getFlash options can only be set at the first call to getFlash. Set the options at the highest level component that calls getFlash.");
  }
  return context.store;
}
async function updateFlash(page, update) {
  const store = flashStores.get(page);
  if (!store)
    throw new Error("Flash store must be initialized with getFlash(page) before calling updateFlash.");
  if (update)
    await update();
  await tick();
  const flashMessage = parseFlashCookie();
  clearCookieAndUpdateIfNewData(store, flashMessage);
  return !!flashMessage;
}
const parseCookieString = (str) => {
  const output = {};
  if (!str)
    return output;
  return str.split(";").map((v) => v.split("=")).reduce((acc, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, output);
};
const varName = "flash";
function parseFlashCookie(cookieString) {
  if (!cookieString && BROWSER)
    cookieString = document.cookie;
  if (!cookieString || !cookieString.includes(varName + "="))
    return void 0;
  const cookies = parseCookieString(cookieString);
  if (cookies[varName]) {
    try {
      return JSON.parse(cookies[varName]);
    } catch (e) {
    }
  }
  return void 0;
}
function clearCookieAndUpdateIfNewData(context, newData) {
  if (newData === void 0)
    return;
  context.store.update((flash) => {
    if (!context.options.clearArray && Array.isArray(newData)) {
      if (Array.isArray(flash)) {
        if (flash.length > 0 && newData.length > 0 && flash[flash.length - 1] === newData[newData.length - 1]) {
          return flash;
        } else {
          return flash.concat(newData);
        }
      }
    }
    return newData;
  });
}
const flashModule = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getFlash,
  initFlash,
  updateFlash
}, Symbol.toStringTag, { value: "Module" }));
export {
  flashModule as f,
  getFlash as g
};
