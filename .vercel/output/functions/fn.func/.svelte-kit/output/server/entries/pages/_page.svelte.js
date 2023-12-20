import { d as createEventDispatcher, s as setContext, f as getContext, c as create_ssr_component, h as compute_rest_props, a as subscribe, i as spread, j as escape_object, v as validate_component, b as add_attribute, e as escape, k as each } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { P as Page } from "../../chunks/Page.js";
import { F as Follow_button, L as Like_button } from "../../chunks/like-button.js";
import "clsx";
import { I as Icon } from "../../chunks/Icon.js";
import "../../chunks/index.js";
import "dequal";
import { t as toWritableStores, o as omit, a as overridable, b as builder, e as executeCallbacks, c as addMeltEventListener, k as kbd, g as getElementByMeltId, i as isHTMLElement, d as createElHelpers } from "../../chunks/action.js";
import { nanoid } from "nanoid/non-secure";
import { d as derived, w as writable } from "../../chunks/index2.js";
import { t as tick } from "../../chunks/scheduler.js";
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
function generateId() {
  return nanoid(10);
}
const { name, selector } = createElHelpers("accordion");
const defaults = {
  multiple: false,
  disabled: false,
  forceVisible: false
};
const createAccordion = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "onValueChange", "defaultValue"));
  const { disabled, forceVisible } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  const isSelected = (key, v) => {
    if (v === void 0)
      return false;
    if (typeof v === "string")
      return v === key;
    return v.includes(key);
  };
  const isSelectedStore = derived(value, ($value) => {
    return (key) => isSelected(key, $value);
  });
  const ids = {
    root: generateId()
  };
  const root = builder(name(), {
    returned: () => ({
      "data-melt-id": ids.root
    })
  });
  const parseItemProps = (props2) => {
    if (typeof props2 === "string") {
      return { value: props2 };
    } else {
      return props2;
    }
  };
  const parseHeadingProps = (props2) => {
    if (typeof props2 === "number") {
      return { level: props2 };
    } else {
      return props2;
    }
  };
  const item = builder(name("item"), {
    stores: value,
    returned: ($value) => {
      return (props2) => {
        const { value: itemValue, disabled: disabled2 } = parseItemProps(props2);
        return {
          "data-state": isSelected(itemValue, $value) ? "open" : "closed",
          "data-disabled": disabled2 ? true : void 0
        };
      };
    }
  });
  const trigger = builder(name("trigger"), {
    stores: [value, disabled],
    returned: ([$value, $disabled]) => {
      return (props2) => {
        const { value: itemValue, disabled: disabled2 } = parseItemProps(props2);
        return {
          disabled: $disabled || disabled2,
          "aria-expanded": isSelected(itemValue, $value) ? true : false,
          "aria-disabled": disabled2 ? true : false,
          "data-disabled": disabled2 ? true : void 0,
          "data-value": itemValue,
          "data-state": isSelected(itemValue, $value) ? "open" : "closed"
        };
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        const disabled2 = node.dataset.disabled === "true";
        const itemValue = node.dataset.value;
        if (disabled2 || !itemValue)
          return;
        handleValueUpdate(itemValue);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (![kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.HOME, kbd.END].includes(e.key)) {
          return;
        }
        e.preventDefault();
        if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
          const disabled2 = node.dataset.disabled === "true";
          const itemValue = node.dataset.value;
          if (disabled2 || !itemValue)
            return;
          handleValueUpdate(itemValue);
          return;
        }
        const el = e.target;
        const rootEl = getElementByMeltId(ids.root);
        if (!rootEl || !isHTMLElement(el))
          return;
        const items = Array.from(rootEl.querySelectorAll(selector("trigger")));
        const candidateItems = items.filter((item2) => {
          if (!isHTMLElement(item2))
            return false;
          return item2.dataset.disabled !== "true";
        });
        if (!candidateItems.length)
          return;
        const elIdx = candidateItems.indexOf(el);
        if (e.key === kbd.ARROW_DOWN) {
          candidateItems[(elIdx + 1) % candidateItems.length].focus();
        }
        if (e.key === kbd.ARROW_UP) {
          candidateItems[(elIdx - 1 + candidateItems.length) % candidateItems.length].focus();
        }
        if (e.key === kbd.HOME) {
          candidateItems[0].focus();
        }
        if (e.key === kbd.END) {
          candidateItems[candidateItems.length - 1].focus();
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const content = builder(name("content"), {
    stores: [value, disabled, forceVisible],
    returned: ([$value, $disabled, $forceVisible]) => {
      return (props2) => {
        const { value: itemValue } = parseItemProps(props2);
        const isVisible = isSelected(itemValue, $value) || $forceVisible;
        return {
          "data-state": isVisible ? "open" : "closed",
          "data-disabled": $disabled ? true : void 0,
          "data-value": itemValue,
          hidden: isVisible ? void 0 : true,
          style: styleToString({
            display: isVisible ? void 0 : "none"
          })
        };
      };
    },
    action: (node) => {
      tick().then(() => {
        const contentId = generateId();
        const triggerId = generateId();
        const parentTrigger = document.querySelector(`${selector("trigger")}, [data-value="${node.dataset.value}"]`);
        if (!isHTMLElement(parentTrigger))
          return;
        node.id = contentId;
        parentTrigger.setAttribute("aria-controls", contentId);
        parentTrigger.id = triggerId;
      });
    }
  });
  const heading = builder(name("heading"), {
    returned: () => {
      return (props2) => {
        const { level } = parseHeadingProps(props2);
        return {
          role: "heading",
          "aria-level": level,
          "data-heading-level": level
        };
      };
    }
  });
  function handleValueUpdate(itemValue) {
    value.update(($value) => {
      if ($value === void 0) {
        return withDefaults.multiple ? [itemValue] : itemValue;
      }
      if (Array.isArray($value)) {
        if ($value.includes(itemValue)) {
          return $value.filter((v) => v !== itemValue);
        }
        $value.push(itemValue);
        return $value;
      }
      return $value === itemValue ? void 0 : itemValue;
    });
  }
  return {
    elements: {
      root,
      item,
      trigger,
      content,
      heading
    },
    states: {
      value
    },
    helpers: {
      isSelected: isSelectedStore
    },
    options
  };
};
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function getOptionUpdater(options) {
  return function(key, value) {
    if (value === void 0)
      return;
    const store = options[key];
    store.set(value);
  };
}
function createDispatcher() {
  const dispatch = createEventDispatcher();
  return (e) => {
    const { originalEvent } = e.detail;
    const { cancelable } = e;
    const type = originalEvent.type;
    const shouldContinue = dispatch(type, { originalEvent, currentTarget: originalEvent.currentTarget }, { cancelable });
    if (!shouldContinue) {
      e.preventDefault();
    }
  };
}
const NAME = "Accordion";
const ITEM_NAME = "AccordionItem";
const ctx = {
  set,
  get,
  setItem,
  getItemProps,
  getContent,
  getTrigger
};
function set(props) {
  const accordion = createAccordion(removeUndefined(props));
  setContext(NAME, accordion);
  return {
    ...accordion,
    updateOption: getOptionUpdater(accordion.options)
  };
}
function get() {
  return getContext(NAME);
}
function setItem(props) {
  setContext(ITEM_NAME, { ...props });
  const { elements: { item } } = get();
  return { item, props };
}
function getItemProps() {
  const itemProps = getContext(ITEM_NAME);
  return itemProps;
}
function getContent() {
  const { elements: { content }, helpers: { isSelected }, states: { value } } = get();
  const { value: props } = getItemProps();
  return { content, props, isSelected, value };
}
function getTrigger() {
  const { elements: { trigger } } = get();
  const { value: props } = getItemProps();
  return { props, trigger };
}
const Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["multiple", "value", "onValueChange", "disabled", "asChild"]);
  let $root, $$unsubscribe_root;
  let { multiple = false } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { disabled = false } = $$props;
  let { asChild = false } = $$props;
  const { elements: { root }, states: { value: localValue }, updateOption } = ctx.set({
    multiple,
    disabled,
    defaultValue: value,
    onValueChange: ({ next }) => {
      if (value !== next) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0)
    $$bindings.onValueChange(onValueChange);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  {
    localValue.set(value);
  }
  {
    updateOption("multiple", multiple);
  }
  {
    updateOption("disabled", disabled);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder: $root }) : ``}` : (() => {
    let builder2 = $root;
    return ` <div${spread([escape_object(builder2), escape_object($$restProps)], {})}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>`;
  })()}`;
});
const AccordionItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "asChild"]);
  let $item, $$unsubscribe_item;
  let { value } = $$props;
  let { disabled = void 0 } = $$props;
  let { asChild = false } = $$props;
  const { item, props } = ctx.setItem({ value, disabled });
  $$unsubscribe_item = subscribe(item, (value2) => $item = value2);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  $$unsubscribe_item();
  return `${asChild ? `${slots.default ? slots.default({ builder: $item(props) }) : ``}` : (() => {
    let builder2 = $item(props);
    return ` <div${spread([escape_object(builder2), escape_object($$restProps)], {})}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>`;
  })()}`;
});
const AccordionHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["level", "asChild"]);
  let $heading, $$unsubscribe_heading;
  let { level = 3 } = $$props;
  let { asChild = false } = $$props;
  const heading = ctx.get().elements.heading;
  $$unsubscribe_heading = subscribe(heading, (value) => $heading = value);
  if ($$props.level === void 0 && $$bindings.level && level !== void 0)
    $$bindings.level(level);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  $$unsubscribe_heading();
  return `${asChild ? `${slots.default ? slots.default({ builder: $heading(level) }) : ``}` : (() => {
    let builder2 = $heading(level);
    return ` <div${spread([escape_object(builder2), escape_object($$restProps)], {})}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>`;
  })()}`;
});
const AccordionTrigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  const { trigger, props } = ctx.getTrigger();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder: $trigger(props) }) : ``}` : (() => {
    let builder2 = $trigger(props);
    return ` <button${spread([escape_object(builder2), escape_object($$restProps)], {})}>${slots.default ? slots.default({ builder: builder2 }) : ``}</button>`;
  })()}`;
});
const AccordionContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild"
  ]);
  let $isSelected, $$unsubscribe_isSelected;
  let $content, $$unsubscribe_content;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  const { content, isSelected, props } = ctx.getContent();
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_isSelected = subscribe(isSelected, (value) => $isSelected = value);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0)
    $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0)
    $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0)
    $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0)
    $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  $$unsubscribe_isSelected();
  $$unsubscribe_content();
  return `${asChild && $isSelected(props) ? (() => {
    let builder2 = $content(props);
    return ` ${slots.default ? slots.default({ builder: builder2 }) : ``}`;
  })() : `${transition && $isSelected(props) ? (() => {
    let builder2 = $content(props);
    return ` <div${spread([escape_object(builder2), escape_object($$restProps)], {})}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>`;
  })() : `${inTransition && outTransition && $isSelected(props) ? (() => {
    let builder2 = $content(props);
    return ` <div${spread([escape_object(builder2), escape_object($$restProps)], {})}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>`;
  })() : `${inTransition && $isSelected(props) ? (() => {
    let builder2 = $content(props);
    return ` <div${spread([escape_object(builder2), escape_object($$restProps)], {})}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>`;
  })() : `${outTransition && $isSelected(props) ? (() => {
    let builder2 = $content(props);
    return ` <div${spread([escape_object(builder2), escape_object($$restProps)], {})}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>`;
  })() : `${$isSelected(props) ? (() => {
    let builder2 = $content(props);
    return ` <div${spread([escape_object($$restProps)], {})}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>`;
  })() : ``}`}`}`}`}`}`;
});
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let events;
  let series;
  let following;
  let organizations;
  let likes;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ user, events, series, following, organizations, likes } = data);
  $$unsubscribe_page();
  return `${validate_component(Page, "Page").$$render($$result, { title: "Home" }, {}, {
    default: () => {
      return `${!user ? `<h1 data-svelte-h="svelte-o42fxk">No user found</h1>` : `<div class="p-2 pl-4 w-full flex gap-4 items-center rounded-xl shadow-md border-l-4 border-b-4 border-base-300"><div class="p-1 bg-base-200 rounded-full shadow-md"><img width="82rem" class="rounded-full bg-neutral-content"${add_attribute("src", user.avatar, 0)}${add_attribute("alt", user.username, 0)}></div> <div class="w-full"><h2 class="m-0 text-xl tracking-wide text-base-content font-semibold">${escape(user.username)}</h2> <hr class="border border-accent"> <div class="text-md text-base-content">${escape(user.name)}</div></div></div> ${!organizations.length ? `  <dialog id="my_modal_5" ${"open"} class="modal sm:modal-middle"><div class="modal-box"><h3 class="font-bold text-lg" data-svelte-h="svelte-12i2mzw">Hello!</h3> <p class="py-4" data-svelte-h="svelte-10g179o">Press ESC key or click the button below to close</p> <div class="modal-action"><form method="dialog"> <a href="${"/organization/new/edit?from=" + escape($page.url.pathname, true) + escape($page.url.search, true)}" class="btn btn-primary w-full">Create Organization</a></form></div></div></dialog>` : `${validate_component(Accordion, "Accordion.Root").$$render(
        $$result,
        {
          value: ["events", "following"],
          class: "pt-4",
          multiple: true
        },
        {},
        {
          default: () => {
            return `${validate_component(AccordionItem, "Accordion.Item").$$render(
              $$result,
              {
                value: "events",
                class: "py-2 text-base-content"
              },
              {},
              {
                default: () => {
                  return `${validate_component(AccordionHeader, "Accordion.Header").$$render(
                    $$result,
                    {
                      class: "p-2 border-b border-base-100 w-full flex items-start"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(AccordionTrigger, "Accordion.Trigger").$$render($$result, { class: "flex w-full justify-between" }, {}, {
                          default: () => {
                            return `<div data-svelte-h="svelte-1mu2npi">Your Events / Series</div> ${validate_component(Icon, "Icon").$$render(
                              $$result,
                              {
                                icon: "material-symbols:arrow-drop-down-circle-outline"
                              },
                              {},
                              {}
                            )}`;
                          }
                        })}`;
                      }
                    }
                  )} ${validate_component(AccordionContent, "Accordion.Content").$$render($$result, { class: "p-2" }, {}, {
                    default: () => {
                      return `<div class="flex flex-col gap-2">${!events.length && !series.length ? `<div class="text-sm" data-svelte-h="svelte-1v0ovtf">You have no Events or Series yet!</div> <a href="/events/createEvent" class="btn btn-primary rounded-full" data-svelte-h="svelte-o52c39">Add event</a>` : `${each(events, (event) => {
                        return `<a href="${"/events/" + escape(event?.id, true)}" class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-accent w-full rounded-lg shadow-xl"><div class="capitalize w-full p-2 font-bold rounded-t-xl bg-info bg-opacity-10"><div class="flex justify-between"><div class="line-clamp-1">${escape(event.name)}</div> <div class="flex gap-1 items-center min-w-fit text-xs pr-2">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:thumb-up" }, {}, {})} ${escape(event._count.Likes)} /
													${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:bell-ring" }, {}, {})} ${escape(event._count.Follows)}</div> </div></div> <div class="px-4"><!-- HTML_TAG_START -->${event?.name}<!-- HTML_TAG_END --> -
											<span class="text-xs"><!-- HTML_TAG_START -->${event?.Venue?.name}<!-- HTML_TAG_END --></span> <div class="flex justify-between"><div>${escape(event?._count.Races)} of ${escape(event.Races.length)} races sailed</div>  ${event._count.Races === event.Races.length || event.complete ? `<div class="badge badge-success">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:check" }, {}, {})}  </div>` : `<div class="badge badge-warning">${validate_component(Icon, "Icon").$$render(
                          $$result,
                          {
                            icon: "material-symbols:progress-activity"
                          },
                          {},
                          {}
                        )} </div>`} </div></div>  <div class="flex justify-between items-end w-full px-4"><div><div class="flex items-center text-xs gap-4"><div>${escape(event?.Organization?.name)}</div> <div class="flex items-center gap-1"><div class="flex items-center gap-1 min-w-fit">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:thumb-up" }, {}, {})} ${escape(event._count.Likes)}</div>
														/
														<div class="flex items-center gap-1">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:bell-ring" }, {}, {})} ${escape(event._count.Follows)} </div></div> </div></div> <div class="text-xs opacity-40">${escape(event?.createdAt?.toLocaleDateString())} </div></div> </a>`;
                      })} ${each(series, (ser) => {
                        return `<a href="${"/series/" + escape(ser?.id, true)}" class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"><div class="capitalize w-full p-2 font-bold rounded-t-xl bg-secondary bg-opacity-10"><div class="flex justify-between"><div class="line-clamp-1">${escape(ser.name)}</div> <div class="flex gap-1 items-center min-w-fit text-xs pr-2">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:thumb-up" }, {}, {})} ${escape(ser._count.Likes)} /
													${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:bell-ring" }, {}, {})} ${escape(ser._count.Follows)}</div> </div></div> <div class="p-2 px-4"><!-- HTML_TAG_START -->${ser.description}<!-- HTML_TAG_END --></div> <a href="${"/organization/" + escape(ser.Organization?.id, true)}" class="flex justify-between w-full px-4"><div class="flex gap-2 items-center text-xs">${validate_component(Icon, "Icon").$$render($$result, { icon: "clarity:organization-line" }, {}, {})} ${escape(ser.Organization?.name)}</div> <div class="text-xs opacity-40">${escape(ser?.createdAt?.toLocaleDateString())} </div></a> </a>`;
                      })}`}</div>`;
                    }
                  })}`;
                }
              }
            )}  ${validate_component(AccordionItem, "Accordion.Item").$$render(
              $$result,
              {
                value: "following",
                class: "py-2 text-base-content"
              },
              {},
              {
                default: () => {
                  return `${validate_component(AccordionHeader, "Accordion.Header").$$render(
                    $$result,
                    {
                      class: "p-2 border-b border-base-100 w-full flex items-start"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(AccordionTrigger, "Accordion.Trigger").$$render($$result, { class: "flex w-full justify-between" }, {}, {
                          default: () => {
                            return `<div data-svelte-h="svelte-4fmjy9">Following</div> ${validate_component(Icon, "Icon").$$render(
                              $$result,
                              {
                                icon: "material-symbols:arrow-drop-down-circle-outline"
                              },
                              {},
                              {}
                            )}`;
                          }
                        })}`;
                      }
                    }
                  )} ${validate_component(AccordionContent, "Accordion.Content").$$render($$result, { class: "p-2" }, {}, {
                    default: () => {
                      return `${!following.length ? `<div class="text-sm" data-svelte-h="svelte-2fjtgg">You are not Following anything yet</div>` : `${each(following, (follow) => {
                        return `${follow.type === "event" ? `<a href="${"/events/" + escape(follow.Event?.id, true)}" class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-accent w-full rounded-lg shadow-xl"><a href="${"/events/" + escape(follow.Event?.id, true)}"><div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-info bg-opacity-10">${escape(follow.type)} </div></a> <div class="flex justify-between w-full pl-4"><a href="${"/events/" + escape(follow.Event?.id, true)}"><div><!-- HTML_TAG_START -->${follow.Event?.name}<!-- HTML_TAG_END --> <div class="text-xs opacity-40">${escape(follow.createdAt.toLocaleDateString())}</div> </div></a> <div class="pr-4">${validate_component(Follow_button, "FollowButton").$$render(
                          $$result,
                          {
                            type: "event",
                            item: follow.Event,
                            userId: user.userId
                          },
                          {},
                          {}
                        )} </div></div> </a>` : ``} ${follow.type === "venue" ? `<div class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"><a href="${"/venue/" + escape(follow.Venue?.id, true)}"><div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-secondary bg-opacity-10">${escape(follow.type)} </div></a> <div class="flex justify-between w-full pl-4"><a href="${"/venue/" + escape(follow.Venue?.id, true)}"><div><!-- HTML_TAG_START -->${follow.Venue?.name}<!-- HTML_TAG_END --> <div class="text-xs opacity-40">${escape(follow.createdAt.toLocaleDateString())}</div> </div></a> <div class="pr-4">${validate_component(Follow_button, "FollowButton").$$render(
                          $$result,
                          {
                            item: follow.Venue,
                            type: "venue",
                            userId: user.userId
                          },
                          {},
                          {}
                        )} </div></div> </div>` : ``}  ${follow.type === "organization" ? `<div class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-warning w-full rounded-lg shadow-xl"><a href="${"/organization/" + escape(follow.Organization?.id, true)}"><div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-warning bg-opacity-10">${escape(follow.type)} </div></a> <div class="flex justify-between w-full pl-4"><a href="${"/organization/" + escape(follow.Organization?.id, true)}"><div><!-- HTML_TAG_START -->${follow.Organization?.name}<!-- HTML_TAG_END --> <div class="text-xs opacity-40">${escape(follow.createdAt.toLocaleDateString())}</div> </div></a> <div class="pr-4">${validate_component(Follow_button, "FollowButton").$$render(
                          $$result,
                          {
                            item: follow.Organization,
                            type: "organization",
                            userId: user.userId
                          },
                          {},
                          {}
                        )} </div></div> </div>` : ``} ${follow.type === "comp" ? `<div class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-success w-full rounded-lg shadow-xl"><a href="${"/comp/" + escape(follow.Comp?.id, true)}"><div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-success bg-opacity-10">${escape(follow.type)} </div></a> <div class="flex justify-between w-full pl-4"><a href="${"/comp/" + escape(follow.Comp?.id, true)}"><div><!-- HTML_TAG_START -->${follow.Comp?.boat ?? follow.Comp?.skipper ?? "No Competitor name"}<!-- HTML_TAG_END --> <div class="text-xs opacity-40">${escape(follow.createdAt.toLocaleDateString())}</div> </div></a> <div class="pr-4">${validate_component(Follow_button, "FollowButton").$$render(
                          $$result,
                          {
                            item: follow.Comp,
                            type: "comp",
                            userId: user.userId
                          },
                          {},
                          {}
                        )} </div></div> </div>` : ``}`;
                      })}`}`;
                    }
                  })}`;
                }
              }
            )}  ${validate_component(AccordionItem, "Accordion.Item").$$render(
              $$result,
              {
                value: "orgs",
                class: "py-2 text-base-content"
              },
              {},
              {
                default: () => {
                  return `${validate_component(AccordionHeader, "Accordion.Header").$$render(
                    $$result,
                    {
                      class: "p-2 border-b border-base-100 w-full flex items-start"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(AccordionTrigger, "Accordion.Trigger").$$render($$result, { class: "flex w-full justify-between" }, {}, {
                          default: () => {
                            return `<div data-svelte-h="svelte-b11mut">Your Organizations</div> ${validate_component(Icon, "Icon").$$render(
                              $$result,
                              {
                                icon: "material-symbols:arrow-drop-down-circle-outline"
                              },
                              {},
                              {}
                            )}`;
                          }
                        })}`;
                      }
                    }
                  )} ${validate_component(AccordionContent, "Accordion.Content").$$render($$result, { class: "p-2" }, {}, {
                    default: () => {
                      return `<div class="flex flex-col gap-2">${!organizations.length ? `<div class="text-sm" data-svelte-h="svelte-1vxi0gt">You have no Organizations yet</div> <a href="/organization/edit" class="btn btn-primary rounded-full" data-svelte-h="svelte-1uyqz95">Add organization</a>` : `${each(organizations, (org) => {
                        return `<a href="${"/organization/" + escape(org.id, true)}" class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-warning w-full rounded-lg shadow-xl"><div class="capitalize w-full p-2 font-bold rounded-t-xl bg-warning bg-opacity-10"><div class="flex justify-between"><div>${escape(org.name)}</div> <div class="flex gap-1 items-center text-xs pr-2">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:thumb-up" }, {}, {})} ${escape(org._count.Likes)} /
													${validate_component(Icon, "Icon").$$render(
                          $$result,
                          {
                            icon: "material-symbols:bookmark-add-outline-rounded"
                          },
                          {},
                          {}
                        )} ${escape(org._count.Follows)}</div> </div></div> <div class="flex justify-between items-end w-full px-4"><div><div class="pb-4"><!-- HTML_TAG_START -->${org.description}<!-- HTML_TAG_END --></div> <div class="text-sm">${escape(org._count.Series)} Series / ${escape(org._count.Events)} Events</div> <div class="text-xs opacity-40">${escape(org.createdAt?.toLocaleDateString())}</div> </div></div> </a>`;
                      })}`}</div>`;
                    }
                  })}`;
                }
              }
            )} ${validate_component(AccordionItem, "Accordion.Item").$$render(
              $$result,
              {
                value: "likes",
                class: "py-2 text-base-content"
              },
              {},
              {
                default: () => {
                  return `${validate_component(AccordionHeader, "Accordion.Header").$$render(
                    $$result,
                    {
                      class: "p-2 border-b border-base-100 w-full flex items-start"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(AccordionTrigger, "Accordion.Trigger").$$render($$result, { class: "flex w-full justify-between" }, {}, {
                          default: () => {
                            return `<div data-svelte-h="svelte-1urjyuq">Likes</div> ${validate_component(Icon, "Icon").$$render(
                              $$result,
                              {
                                icon: "material-symbols:arrow-drop-down-circle-outline"
                              },
                              {},
                              {}
                            )}`;
                          }
                        })}`;
                      }
                    }
                  )} ${validate_component(AccordionContent, "Accordion.Content").$$render($$result, { class: "p-2 pl-4" }, {}, {
                    default: () => {
                      return `${!likes.length ? `<div class="text-sm" data-svelte-h="svelte-1lpye7s">You have not liked anything yet</div>` : `${each(likes, (like) => {
                        return `${like.type === "event" ? `<div class="relative p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-accent w-full rounded-lg shadow-xl"><a href="${"/events/" + escape(like.Event?.id, true)}"><div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-info bg-opacity-10">${escape(like.type)} </div></a> <div class="flex justify-between w-full pl-4"><a href="${"/events/" + escape(like.Event?.id, true)}"><div><!-- HTML_TAG_START -->${like.Event?.name}<!-- HTML_TAG_END --> <div class="text-xs opacity-40">${escape(like.createdAt.toLocaleDateString())}</div> </div></a> ${validate_component(Like_button, "LikeButton").$$render(
                          $$result,
                          {
                            class: "text-base-content mr-3 ",
                            type: "event",
                            item: like.Event,
                            userId: user.userId
                          },
                          {},
                          {}
                        )}</div> </div>` : ``} ${like.type === "comment" ? `<div class="p-0 pb-2 flex flex-col gap-4 mb-4 border-l-4 border-success w-full rounded-lg shadow-xl"><div class="flex justify-between w-full pl-2 py-2 pr-4 rounded-t-xl bg-success bg-opacity-10"><div class="capitalize tracking-wide font-bold">${escape(like.Comment?.type)} ${escape(like.type)}</div> <div>${like.Comment?.type === "venue" ? `${escape(like.Comment.Venue?.name)}` : ``} ${like.Comment?.type === "event" ? `${escape(like.Comment.Event?.name)}` : ``} ${like.Comment?.type === "organization" ? `${escape(like.Comment.Organization?.name)}` : ``} ${like.Comment?.type === "Comp" ? `${escape(like.Comment.Comp?.boat ?? like.Comment.Comp?.skipper)}` : ``} ${like.Comment?.type === "User" ? `${escape(like.Comment.User?.name)}` : ``} </div></div> <div class="flex justify-between w-full pl-4"><div><!-- HTML_TAG_START -->${like.Comment?.comment}<!-- HTML_TAG_END --> <div class="text-xs">${escape(like.Comment?.User.username)}</div> <div class="text-xs opacity-40">${escape(like.createdAt.toLocaleDateString())} </div></div> <div class="pr-4 flex gap-2">${validate_component(Like_button, "LikeButton").$$render(
                          $$result,
                          {
                            item: like.Comment,
                            type: "comment",
                            userId: user.userId,
                            class: "text-base-content"
                          },
                          {},
                          {}
                        )} </div></div> </div>` : ``} ${like.type === "venue" ? `<div class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-secondary w-full rounded-lg shadow-xl"><a href="${"/venue/" + escape(like.Venue?.id, true)}"><div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-secondary bg-opacity-10">${escape(like.type)} </div></a> <div class="flex justify-between w-full pl-4"><a href="${"/venue/" + escape(like.Venue?.id, true)}"><div>${escape(like.Venue?.name)} <div class="text-xs opacity-40">${escape(like.createdAt.toLocaleDateString())}</div> </div></a> <div class="pr-4">${validate_component(Like_button, "LikeButton").$$render(
                          $$result,
                          {
                            item: like.Venue,
                            type: "venue",
                            userId: user.userId,
                            class: "text-base-content"
                          },
                          {},
                          {}
                        )} </div></div> </div>` : ``} ${like.type === "organization" ? `<div class="p-0 pb-4 flex flex-col gap-4 mb-4 border-l-4 border-warning w-full rounded-lg shadow-xl"><a href="${"/venue/" + escape(like.Organization?.id, true)}"><div class="capitalize w-full pl-2 font-bold rounded-t-xl bg-warning bg-opacity-10">${escape(like.type)} </div></a> <div class="flex justify-between w-full pl-4"><a href="${"/venue/" + escape(like.Organization?.id, true)}"><div>${escape(like.Organization?.name)} <div class="text-xs opacity-40">${escape(like.createdAt.toLocaleDateString())}</div> </div></a> <div class="pr-4">${validate_component(Like_button, "LikeButton").$$render(
                          $$result,
                          {
                            type: "organization",
                            item: like.Organization,
                            userId: user.userId,
                            class: "text-base-content"
                          },
                          {},
                          {}
                        )} </div></div> </div>` : ``}`;
                      })}`}`;
                    }
                  })}`;
                }
              }
            )}`;
          }
        }
      )}`}`}`;
    }
  })}`;
});
export {
  Page_1 as default
};
