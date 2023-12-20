import { t as set_current_component, n as noop, A as blank_object, r as run_all, B as children, C as detach, o as is_function, D as is_empty, E as run, u as current_component, F as start_hydrating, G as end_hydrating, g as get_store_value, l as safe_not_equal, c as create_ssr_component, v as validate_component, e as escape, H as text, I as claim_text, J as insert_hydration, K as set_data, a as subscribe, k as each, b as add_attribute, m as missing_component } from "../../../../chunks/ssr.js";
import { P as Page } from "../../../../chunks/Page.js";
import "clsx";
/* empty css                                                         */import { createTable, getCoreRowModel, getSortedRowModel } from "@tanstack/table-core";
import { f as flush, a as add_render_callback, b as flush_render_callbacks, d as dirty_components, s as schedule_update } from "../../../../chunks/scheduler.js";
import { r as readable, w as writable, d as derived } from "../../../../chunks/index2.js";
import { Temporal } from "@js-temporal/polyfill";
import { I as Icon } from "../../../../chunks/Icon.js";
import { a as cn } from "../../../../chunks/index3.js";
import "devalue";
const outroing = /* @__PURE__ */ new Set();
let outros;
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
function create_component(block) {
  block && block.c();
}
function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}
function mount_component(component, target, anchor) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles = null, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  /**
   * ### PRIVATE API
   *
   * Do not use, may change at any time
   *
   * @type {any}
   */
  $$ = void 0;
  /**
   * ### PRIVATE API
   *
   * Do not use, may change at any time
   *
   * @type {any}
   */
  $$set = void 0;
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true;
      this.$$set(props);
      this.$$.skip_bound = false;
    }
  }
}
/**
 * svelte-table
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function create_fragment$1(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*content*/
        ctx[0]
      );
    },
    l(nodes) {
      t = claim_text(
        nodes,
        /*content*/
        ctx[0]
      );
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*content*/
      1)
        set_data(
          t,
          /*content*/
          ctx2[0]
        );
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { content } = $$props;
  $$self.$$set = ($$props2) => {
    if ("content" in $$props2)
      $$invalidate(0, content = $$props2.content);
  };
  return [content];
}
class Placeholder$1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment$1, safe_not_equal, { content: 0 });
  }
}
const PlaceholderServer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${escape($$props.content)}`;
});
var Placeholder = typeof document === "undefined" ? PlaceholderServer : Placeholder$1;
function create_fragment(ctx, Comp, props) {
  let c;
  let current;
  c = new Comp({
    props,
    $$inline: true
  });
  return {
    c() {
      create_component(c.$$.fragment);
    },
    l(nodes) {
      claim_component(c.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(c, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(c.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(c.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(c, detaching);
    }
  };
}
function renderClient(Comp, props) {
  return class WrapperComp extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, (ctx) => create_fragment(ctx, Comp, props), safe_not_equal, {}, void 0);
    }
  };
}
function renderServer(Comp, props) {
  const WrapperComp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    return `${validate_component(Comp, "TableComponent").$$render($$result, props, {}, {})}`;
  });
  return WrapperComp;
}
const renderComponent = typeof window === "undefined" ? renderServer : renderClient;
function isSvelteServerComponent(component) {
  return typeof component === "object" && typeof component.$$render === "function" && typeof component.render === "function";
}
function isSvelteClientComponent(component) {
  var _component$name, _component$name2;
  let isHMR = "__SVELTE_HMR" in window;
  return component.prototype instanceof SvelteComponent || isHMR && ((_component$name = component.name) == null ? void 0 : _component$name.startsWith("Proxy<")) && ((_component$name2 = component.name) == null ? void 0 : _component$name2.endsWith(">"));
}
function isSvelteComponent(component) {
  if (typeof document === "undefined") {
    return isSvelteServerComponent(component);
  } else {
    return isSvelteClientComponent(component);
  }
}
function wrapInPlaceholder(content) {
  return renderComponent(Placeholder, {
    content
  });
}
function flexRender(component, props) {
  if (!component)
    return null;
  if (isSvelteComponent(component)) {
    return renderComponent(component, props);
  }
  if (typeof component === "function") {
    const result = component(props);
    if (result === null || result === void 0)
      return null;
    if (isSvelteComponent(result)) {
      return renderComponent(result, props);
    }
    return wrapInPlaceholder(result);
  }
  return wrapInPlaceholder(component);
}
function createSvelteTable(options) {
  let optionsStore;
  if ("subscribe" in options) {
    optionsStore = options;
  } else {
    optionsStore = readable(options);
  }
  let resolvedOptions = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...get_store_value(optionsStore)
  };
  let table = createTable(resolvedOptions);
  let stateStore = writable(
    /** @type {number} */
    table.initialState
  );
  let stateOptionsStore = derived([stateStore, optionsStore], (s) => s);
  const tableReadable = readable(table, function start(set) {
    const unsubscribe = stateOptionsStore.subscribe((_ref) => {
      let [state, options2] = _ref;
      table.setOptions((prev) => {
        return {
          ...prev,
          ...options2,
          state: {
            ...state,
            ...options2.state
          },
          // Similarly, we'll maintain both our internal state and any user-provided
          // state.
          onStateChange: (updater) => {
            if (updater instanceof Function) {
              stateStore.update(updater);
            } else {
              stateStore.set(updater);
            }
            resolvedOptions.onStateChange == null || resolvedOptions.onStateChange(updater);
          }
        };
      });
      set(table);
    });
    return function stop() {
      unsubscribe();
    };
  });
  return tableReadable;
}
const AscSort = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="w-4">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:chevron-down" }, {}, {})}</div>`;
});
const Cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: className = void 0 } = $$props;
  let { info } = $$props;
  let { discard = false } = $$props;
  let { useCode = false } = $$props;
  function infoValue() {
    if (useCode) {
      return info.getValue() ? info.getValue() : info.row.original.code;
    }
    return info.getValue() ?? "";
  }
  function discarded() {
    if (Number(info.row.original.discard) && discard)
      return true;
    return false;
  }
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.info === void 0 && $$bindings.info && info !== void 0)
    $$bindings.info(info);
  if ($$props.discard === void 0 && $$bindings.discard && discard !== void 0)
    $$bindings.discard(discard);
  if ($$props.useCode === void 0 && $$bindings.useCode && useCode !== void 0)
    $$bindings.useCode(useCode);
  return `<div class="${[
    escape(cn("p-0 m-0 flex justify-center", className), true),
    discarded() ? "opacity-60" : ""
  ].join(" ").trim()}">${escape(discarded() ? `(${infoValue()})` : infoValue())}</div>`;
});
const DscSort = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="w-4">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:chevron-up" }, {}, {})}</div>`;
});
const Empty = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="w-4"></div>`;
});
const FleetTable_svelte_svelte_type_style_lang = "";
const css = {
  code: ".odd.svelte-qfbrhw{@apply bg-base-100;}.even.svelte-qfbrhw{@apply bg-base-200;}.selectedEven.svelte-qfbrhw{@apply bg-info text-neutral-focus;}.selectedOdd.svelte-qfbrhw{--tw-bg-opacity:0.8 !important;background-color:hsl(var(--in) / var(--tw-bg-opacity)) !important;@apply text-neutral-focus;}",
  map: null
};
const FleetTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $table, $$unsubscribe_table;
  let { race } = $$props;
  let { results } = $$props;
  let { fleetName } = $$props;
  const notypecheck = (x) => x;
  let columnVisibility;
  race.starts.map((start) => {
    if (start.fleet[1] === fleetName || start.fleet[5] === fleetName) {
      return start.finishType;
    }
  });
  function getRaceDate() {
    if (!race.date) {
      return Temporal.Now.plainDateISO("Europe/London").toPlainDateTime();
    }
    const raceDateArray = race.date.split("/");
    return Temporal.PlainDate.from({
      day: raceDateArray[0],
      month: raceDateArray[1],
      year: raceDateArray[2]
    }).toPlainDateTime();
  }
  function calculateElapsed(start, finish, elapsed) {
    if (elapsed)
      return elapsed;
    if (!start || !finish)
      return null;
    const raceDate = getRaceDate();
    const startArray = start.split(":");
    const startTime = raceDate.with({
      hour: startArray[0],
      minute: startArray[1],
      second: startArray[2]
    });
    const finishArray = finish.split(":");
    const finishTime = raceDate.with({
      hour: finishArray[0],
      minute: finishArray[1],
      second: finishArray[2]
    });
    const elapsedTime = startTime.until(finishTime);
    if (elapsedTime.total({ unit: "minute" }) < 0)
      return "ERROR";
    return Math.round(elapsedTime.total({ unit: "minute" }) * 100) / 100;
  }
  let resultRows = results.map((result) => {
    const elapsedTime = calculateElapsed(result.start, result.finish, result.elapsed);
    return {
      points: Number(result.points),
      // convert to number
      position: Number(result.position),
      // named place on table
      discard: Number(result.discard),
      rank: Number(result.Comp?.rank),
      total: Number(result.Comp?.total),
      nett: Number(result.Comp?.nett),
      finish: result.finish,
      elapsed: elapsedTime,
      elapsedWin: result.elapsedWin,
      ratingWin: result.ratingWin,
      start: result.start,
      corrected: result.corrected,
      code: result.code,
      fleet: result.Comp?.fleet ?? result.Comp?.division,
      boat: result.Comp?.boat,
      skipper: result.Comp?.skipper ?? ""
    };
  });
  const columns = [
    {
      header: `Name`,
      columns: [
        {
          accessorKey: "boat",
          header: "Boat",
          cell: (info) => flexRender(Cell, { info, class: "justify-start" })
        },
        {
          accessorKey: "skipper",
          header: "Skipper",
          cell: (info) => flexRender(Cell, { info, class: "justify-start" })
        },
        {
          accessorKey: "sailno",
          header: "SailNo",
          cell: (info) => flexRender(Cell, { info, class: "justify-start" })
        }
      ]
    },
    {
      header: `Score`,
      columns: [
        {
          accessorKey: "points",
          header: "Points",
          cell: (info) => flexRender(Cell, {
            info,
            discard: true,
            class: "justify-start"
          })
        },
        {
          accessorKey: "position",
          header: "Place",
          cell: (info) => flexRender(Cell, { info, class: "justify-start" })
        },
        {
          accessorKey: "corrected",
          header: "Corrected",
          cell: (info) => flexRender(Cell, {
            info,
            discard: true,
            useCode: true,
            class: "justify-start"
          })
        },
        {
          accessorKey: "elapsed",
          header: "Elapsed",
          cell: (info) => flexRender(Cell, {
            info,
            discard: true,
            useCode: true,
            class: "justify-start"
          })
        },
        {
          accessorKey: "elapsedWin",
          header: "elapsedWin",
          cell: (info) => flexRender(Cell, {
            info,
            discard: true,
            useCode: true,
            class: "justify-start"
          })
        },
        {
          accessorKey: "ratingWin",
          header: "ratingWin",
          cell: (info) => flexRender(Cell, {
            info,
            discard: true,
            useCode: true,
            class: "justify-start"
          })
        },
        {
          accessorKey: "finish",
          header: "Finish",
          cell: (info) => flexRender(Cell, {
            info,
            discard: true,
            useCode: true,
            class: "justify-start"
          })
        }
      ]
    },
    {
      header: "Overall",
      columns: [
        {
          accessorKey: "rank",
          header: "Rank",
          cell: (info) => flexRender(Cell, { info, class: "justify-start" })
        },
        {
          accessorKey: "nett",
          header: "Nett",
          cell: (info) => flexRender(Cell, { info, class: "justify-start" })
        },
        {
          accessorKey: "total",
          header: "Total",
          cell: (info) => flexRender(Cell, { info, class: "justify-start" })
        }
      ]
    }
  ];
  let sorting = [{ id: "points", desc: false }];
  function getSortSymbol(isSorted) {
    return isSorted ? isSorted === "asc" ? AscSort : DscSort : Empty;
  }
  const setSorting = (updater) => {
    if (updater instanceof Function) {
      sorting = updater(sorting);
    } else {
      sorting = updater;
    }
    options.update((old) => ({ ...old, state: { ...old.state, sorting } }));
  };
  function setColumnVisibility(updater) {
    if (updater instanceof Function) {
      columnVisibility = updater(columnVisibility);
    } else {
      columnVisibility = updater;
    }
    options.update((old) => ({
      ...old,
      state: { ...old.state, columnVisibility }
    }));
  }
  function getResultColumns() {
    const defaultColumns = {
      points: true,
      position: false,
      skipper: false,
      boat: true,
      sailno: false,
      elapsed: false,
      elapsedWin: false,
      ratingWin: false,
      total: false,
      start: false,
      finish: false,
      nett: true
    };
    if (race?.resultColumns) {
      return {
        ...defaultColumns,
        ...race?.resultColumns
      };
    }
    if (race?.Event?.resultColumns) {
      return {
        ...defaultColumns,
        ...race?.Event?.resultColumns
      };
    }
    return defaultColumns;
  }
  const options = writable({
    data: resultRows,
    columns,
    state: { sorting, columnVisibility },
    enableRowSelection: true,
    // enableMultiRowSelection: false,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility
  });
  const table = createSvelteTable(options);
  $$unsubscribe_table = subscribe(table, (value) => $table = value);
  function isVisible(colString) {
    const resCols = getResultColumns();
    return resCols[colString];
  }
  if ($$props.race === void 0 && $$bindings.race && race !== void 0)
    $$bindings.race(race);
  if ($$props.results === void 0 && $$bindings.results && results !== void 0)
    $$bindings.results(results);
  if ($$props.fleetName === void 0 && $$bindings.fleetName && fleetName !== void 0)
    $$bindings.fleetName(fleetName);
  $$result.css.add(css);
  {
    setColumnVisibility(getResultColumns());
  }
  $$unsubscribe_table();
  return `<div class="w-fit mt-8 border-r-2 border-b-4 border-base-300 rounded-lg"><div class="flex justify-between items-center py-4 mb-2 px-2 bg-gradient-to-r from-base-200 to-base-300 rounded-t-lg shadow-lg"><h2 class="text-4xl tracking-wide font-medium">${escape(fleetName ?? "Fleet")}</h2> <p class="pr-2">${escape(race.name)}</p></div> <table class="table table-md table-zebra md:table-sm shadow-lg w-fit"><thead>${each($table.getHeaderGroups(), (headerGroup) => {
    return `<tr>${each(headerGroup.headers, (header) => {
      return `<th${add_attribute("colspan", header.colSpan, 0)}>${!header.isPlaceholder ? ` ${["Overall", "Name", "Score"].includes(header.column.id) ? `<div class="dropdown"> <label for="" tabindex="0" class="link link-hover decoration-none flex items-center gap-2">${validate_component(notypecheck(flexRender(header.column.columnDef.header, header.getContext())) || missing_component, "svelte:component").$$render($$result, {}, {}, {})} ${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon: "material-symbols:arrow-drop-down-circle-outline"
        },
        {},
        {}
      )}</label>  <ul tabindex="0" class="p-2 w-32 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">${header.column.id === "Overall" ? `<form method="post" class="text-xs font-normal"><div class="join"><label class="label"><span class="label-text" data-svelte-h="svelte-iyyant">Rank</span> <input ${isVisible("rank") ? "checked" : ""} class="join-item checkbox checkbox-xs" type="checkbox" name="rank" aria-label="Overall Event Ranking"></label> <label class="label"><span class="label-text" data-svelte-h="svelte-1k5ma54">Nett</span> <input ${isVisible("nett") ? "checked" : ""} class="join-item checkbox checkbox-xs" type="checkbox" name="nett" aria-label="Nett Overall Score"></label> <label class="label"><span class="label-text" data-svelte-h="svelte-mc6toh">Total</span> <input ${isVisible("total") ? "checked" : ""} class="join-item checkbox checkbox-xs" type="checkbox" name="total" aria-label="Overall total before drops"> </label></div> </form>` : `${header.column.id === "Name" ? `<form method="post" class="text-xs font-normal"><label class="label"><span class="label-text" data-svelte-h="svelte-1vz89jt">Boat</span> <input ${isVisible("boat") ? "checked" : ""} class="checkbox checkbox-xs" type="checkbox" name="boat" aria-label="Boat"></label> <label class="label"><span class="label-text" data-svelte-h="svelte-13eqdv1">Skipper</span> <input ${isVisible("skipper") ? "checked" : ""} class="checkbox checkbox-xs" type="checkbox" name="skipper" aria-label="Skipper"></label> <label class="label"><span class="label-text" data-svelte-h="svelte-1dymjjt">Sail No.</span> <input ${isVisible("sailno") ? "checked" : ""} class="checkbox checkbox-xs" type="checkbox" name="sailno" aria-label="Sail Number"></label> </form>` : `${header.column.id === "Score" ? `<form method="post" class="text-xs font-normal"><label class="label"><span class="label-text" data-svelte-h="svelte-1k1sfbq">Points</span> <input ${isVisible("points") ? "checked" : ""} class="checkbox checkbox-xs" type="checkbox" name="points" aria-label="Points"></label> <label class="label"><span class="label-text" data-svelte-h="svelte-1053w0s">Corrected</span> <input ${isVisible("corrected") ? "checked" : ""} class="checkbox checkbox-xs" type="checkbox" name="corrected" aria-label="Corrected"></label> <label class="label"><span class="label-text" data-svelte-h="svelte-s6ozwf">Elapsed</span> <input ${isVisible("elapsed") ? "checked" : ""} class="checkbox checkbox-xs" type="checkbox" name="elapsed" aria-label="Elapsed"></label> <label class="label"><span class="label-text" data-svelte-h="svelte-1dzvyxa">Rating Win</span> <input ${isVisible("ratingWin") ? "checked" : ""} class="checkbox checkbox-xs" type="checkbox" name="ratingWin" aria-label="Rating Win"></label> <label class="label"><span class="label-text" data-svelte-h="svelte-1p9heq5">Elapsed Win</span> <input ${isVisible("elapsedWin") ? "checked" : ""} class="checkbox checkbox-xs" type="checkbox" name="elapsedWin" aria-label="Elapsed Win"></label> <label class="label"><span class="label-text" data-svelte-h="svelte-1xp5qei">Finish</span> <input ${isVisible("finish") ? "checked" : ""} class="checkbox checkbox-xs" type="checkbox" name="finish" aria-label="Finish"></label> </form>` : ``}`}`}</ul> </div>` : `<button class="${[
        "flex",
        (header.column.getCanSort() ? "cursor-pointer" : "") + " " + (header.column.getCanSort() ? "select-none" : "")
      ].join(" ").trim()}">${validate_component(flexRender(header.column.columnDef.header, header.getContext()) || missing_component, "svelte:component").$$render($$result, {}, {}, {})} <span class="pl-1">${validate_component(getSortSymbol(header.column.getIsSorted()) || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</span> </button>`}` : ``} </th>`;
    })} </tr>`;
  })}</thead>  <tbody>${each($table.getRowModel().rows, (row, i) => {
    return `<tr class="${[
      "svelte-qfbrhw",
      (row.getIsSelected() && i % 2 == 0 ? "selectedEven" : "") + " " + (row.getIsSelected() && !(i % 2 == 0) ? "selectedOdd" : "") + " " + (i % 2 == 0 && !row.getIsSelected() ? "odd" : "") + " " + (!(i % 2 == 0) && !row.getIsSelected() ? "even" : "")
    ].join(" ").trim()}">${each(row.getVisibleCells(), (cell) => {
      return `<td>${validate_component(flexRender(cell.column.columnDef.cell, cell.getContext()) || missing_component, "svelte:component").$$render($$result, {}, {}, {})} </td>`;
    })} </tr>`;
  })}</tbody> <tfoot class="bg-gradient-to-r from-base-300 to-base-200 rounded-b-lg">${each($table.getFooterGroups(), (footerGroup) => {
    return `<tr>${each(footerGroup.headers, (header) => {
      return `<th${add_attribute("colspan", header.colSpan, 0)}>${!header.isPlaceholder ? `${validate_component(flexRender(header.column.columnDef.footer, header.getContext()) || missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : ``} </th>`;
    })} </tr>`;
  })}</tfoot></table> </div>`;
});
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  function getUniqueFleetsArray() {
    return [
      ...new Set(data.results?.map((item) => {
        if (item.Comp?.fleet) {
          return item.Comp?.fleet;
        }
        return item.Comp?.division;
      }))
    ];
  }
  function getFleetResults(key) {
    return data.results?.filter((result) => {
      if (result.Comp?.fleet) {
        return result.Comp?.fleet === key;
      } else if (result.Comp?.division) {
        return result.Comp?.division === key;
      }
      return result;
    });
  }
  function fleetsTables() {
    let fleetsTables2 = [];
    const unique = getUniqueFleetsArray();
    unique.forEach((uf) => {
      let fleetResults = getFleetResults(uf);
      if (fleetResults)
        fleetsTables2.push(fleetResults);
    });
    return fleetsTables2;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Page, "Page").$$render($$result, { title: data.race?.Event?.name }, {}, {
    default: () => {
      return `${!Number(data.race?.sailed) ? `<div class="bg-error w-full p-2 text-error-content rounded-md" data-svelte-h="svelte-1rkns6x">This Race was not sailed</div>` : `<div class="pt-2 flex flex-col items-center">${each(fleetsTables(), (table) => {
        return `${validate_component(FleetTable, "FleetTable").$$render(
          $$result,
          {
            race: data.race,
            results: table,
            fleetName: table[0].Comp?.fleet ?? table[0].Comp?.division
          },
          {},
          {}
        )}`;
      })}</div>`}`;
    }
  })}`;
});
export {
  Page_1 as default
};
