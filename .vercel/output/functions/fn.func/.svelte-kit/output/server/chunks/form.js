import { t as tick } from "./scheduler.js";
import { q as onDestroy } from "./ssr.js";
import { b as beforeNavigate, a as afterNavigate } from "./navigation.js";
const SuperDebug_svelte_svelte_type_style_lang = "";
const isElementInViewport = (el, topOffset = 0) => {
  const rect = el.getBoundingClientRect();
  return rect.top >= topOffset && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};
const scrollToAndCenter = (el, offset = 1.125, behavior = "smooth") => {
  const elementRect = el.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const top = absoluteElementTop - window.innerHeight / (2 * offset);
  window.scrollTo({ left: 0, top, behavior });
};
var FetchStatus;
(function(FetchStatus2) {
  FetchStatus2[FetchStatus2["Idle"] = 0] = "Idle";
  FetchStatus2[FetchStatus2["Submitting"] = 1] = "Submitting";
  FetchStatus2[FetchStatus2["Delayed"] = 2] = "Delayed";
  FetchStatus2[FetchStatus2["Timeout"] = 3] = "Timeout";
})(FetchStatus || (FetchStatus = {}));
const activeTimers = /* @__PURE__ */ new Set();
let _initialized = false;
function Form(formEl, timers, options) {
  let state = FetchStatus.Idle;
  let delayedTimeout, timeoutTimeout;
  let aboutToNavigate = false;
  const Timers = activeTimers;
  function Timers_start() {
    Timers_clear();
    Timers_setState(state != FetchStatus.Delayed ? FetchStatus.Submitting : FetchStatus.Delayed);
    delayedTimeout = window.setTimeout(() => {
      if (delayedTimeout && state == FetchStatus.Submitting)
        Timers_setState(FetchStatus.Delayed);
    }, options.delayMs);
    timeoutTimeout = window.setTimeout(() => {
      if (timeoutTimeout && state == FetchStatus.Delayed)
        Timers_setState(FetchStatus.Timeout);
    }, options.timeoutMs);
    Timers.add(Timers_clear);
  }
  function Timers_clear() {
    clearTimeout(delayedTimeout);
    clearTimeout(timeoutTimeout);
    delayedTimeout = timeoutTimeout = 0;
    Timers.delete(Timers_clear);
    Timers_setState(FetchStatus.Idle);
  }
  function Timers_clearAll() {
    Timers.forEach((t) => t());
    Timers.clear();
  }
  function Timers_setState(s) {
    state = s;
    timers.submitting.set(state >= FetchStatus.Submitting);
    timers.delayed.set(state >= FetchStatus.Delayed);
    timers.timeout.set(state >= FetchStatus.Timeout);
  }
  const ErrorTextEvents = formEl;
  function ErrorTextEvents__selectText(e) {
    const target = e.target;
    if (options.selectErrorText)
      target.select();
  }
  function ErrorTextEvents_addErrorTextListeners() {
    if (!options.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => {
      el.addEventListener("invalid", ErrorTextEvents__selectText);
    });
  }
  function ErrorTextEvents_removeErrorTextListeners() {
    if (!options.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => el.removeEventListener("invalid", ErrorTextEvents__selectText));
  }
  const Form2 = formEl;
  function Form_shouldAutoFocus(userAgent) {
    if (typeof options.autoFocusOnError === "boolean")
      return options.autoFocusOnError;
    else
      return !/iPhone|iPad|iPod|Android/i.test(userAgent);
  }
  const Form_scrollToFirstError = async () => {
    if (options.scrollToError == "off")
      return;
    const selector = options.errorSelector;
    if (!selector)
      return;
    await tick();
    let el;
    el = Form2.querySelector(selector);
    if (!el)
      return;
    el = el.querySelector(selector) ?? el;
    const nav = options.stickyNavbar ? document.querySelector(options.stickyNavbar) : null;
    if (typeof options.scrollToError != "string") {
      el.scrollIntoView(options.scrollToError);
    } else if (!isElementInViewport(el, nav?.offsetHeight ?? 0)) {
      scrollToAndCenter(el, void 0, options.scrollToError);
    }
    if (!Form_shouldAutoFocus(navigator.userAgent))
      return;
    let focusEl;
    focusEl = el;
    if (!["INPUT", "SELECT", "BUTTON", "TEXTAREA"].includes(focusEl.tagName)) {
      focusEl = focusEl.querySelector('input:not([type="hidden"]):not(.flatpickr-input), select, textarea');
    }
    if (focusEl) {
      try {
        focusEl.focus({ preventScroll: true });
        if (options.selectErrorText && focusEl.tagName == "INPUT") {
          focusEl.select();
        }
      } catch (err) {
      }
    }
  };
  {
    ErrorTextEvents_addErrorTextListeners();
    const completed = (cancelled, clearIfNotNavigating = false) => {
      Timers_clear();
      if (!cancelled)
        setTimeout(Form_scrollToFirstError);
      if (clearIfNotNavigating && !aboutToNavigate) {
        Timers_clearAll();
      }
    };
    onDestroy(() => {
      ErrorTextEvents_removeErrorTextListeners();
      completed(true);
    });
    if (!_initialized) {
      beforeNavigate(() => {
        aboutToNavigate = true;
      });
      afterNavigate((nav) => {
        if (nav.type == "enter")
          return;
        aboutToNavigate = false;
        Timers_clearAll();
      });
      _initialized = true;
    }
    return {
      submitting: () => {
        aboutToNavigate = false;
        Timers_start();
      },
      completed,
      scrollToFirstError: () => {
        setTimeout(Form_scrollToFirstError);
      },
      isSubmitting: () => state === FetchStatus.Submitting || state === FetchStatus.Delayed
    };
  }
}
export {
  Form as F
};
