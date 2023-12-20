import { c as create_ssr_component, a as subscribe, z as set_store_value, v as validate_component, b as add_attribute, k as each, e as escape, n as noop } from "../../../../../chunks/ssr.js";
import { P as Page } from "../../../../../chunks/Page.js";
import "clsx";
/* empty css                                                            */import { p as page } from "../../../../../chunks/stores.js";
import { g as goto } from "../../../../../chunks/navigation.js";
import { s as superForm, F as Form, L as Label } from "../../../../../chunks/index4.js";
import { T as Textarea } from "../../../../../chunks/textarea.js";
import { I as Input } from "../../../../../chunks/input.js";
import { C as Check } from "../../../../../chunks/check.js";
import { B as Button } from "../../../../../chunks/button.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { f as flashModule } from "../../../../../chunks/client.js";
import { e as eventSchema } from "../../../../../chunks/eventSchema.js";
const EventEdit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let form;
  let message;
  let delayed;
  let $form, $$unsubscribe_form = noop, $$subscribe_form = () => ($$unsubscribe_form(), $$unsubscribe_form = subscribe(form, ($$value) => $form = $$value), form);
  let $message, $$unsubscribe_message = noop, $$subscribe_message = () => ($$unsubscribe_message(), $$unsubscribe_message = subscribe(message, ($$value) => $message = $$value), message);
  let $page, $$unsubscribe_page;
  let $delayed, $$unsubscribe_delayed = noop, $$subscribe_delayed = () => ($$unsubscribe_delayed(), $$unsubscribe_delayed = subscribe(delayed, ($$value) => $delayed = $$value), delayed);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  const formObj = superForm(data.form, {
    taintedMessage: "Finish filling out the form or you will loose your data?",
    autoFocusOnError: true,
    validators: eventSchema,
    dataType: "json",
    onUpdated() {
      const from = $page.url.searchParams.get("from");
      $page.url.searchParams.delete("from");
      if (from) {
        goto(from + $page.url.search, { replaceState: true });
      } else {
        history.replaceState({ from: "here" }, "");
      }
    },
    onError({ result }) {
      set_store_value(message, $message = result.error.message, $message);
    },
    flashMessage: {
      module: flashModule,
      onError: ({ result, message: message2 }) => {
        message2.set({
          type: "error",
          message: result.error.message
        });
      }
    },
    syncFlashMessage: false
  });
  function getUniqueIdString() {
    return $form.name.toLowerCase().trim().split(" ").join("_") + "-" + $form.eventeid + "-" + $form.Venue.name.toLowerCase().trim().split(" ").join("_");
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$subscribe_form({ form, message, delayed } = formObj, $$subscribe_message(), $$subscribe_delayed());
  $$unsubscribe_form();
  $$unsubscribe_message();
  $$unsubscribe_page();
  $$unsubscribe_delayed();
  return `${validate_component(Form, "Form").$$render($$result, { formObj }, {}, {
    default: () => {
      return `<div class="flex items-center gap-6">${$form.eventeid ? `<input name="eventeid" type="hidden"${add_attribute("value", $form.eventeid, 0)}>` : `${validate_component(Input, "Input").$$render($$result, { name: "eventeid", formObj }, {}, {})}`}   ${!$form.uniqueIdString ? `<input name="uniqueIdString" type="hidden"${add_attribute("value", getUniqueIdString, 0)}>` : ``}  <div class="form-control"><label class="label cursor-pointer"><span class="label-text pr-4" data-svelte-h="svelte-1dvix5h">Public</span> <input type="checkbox" name="public" class="toggle toggle-success"${add_attribute("checked", $form.public, 1)}></label></div> <div class="form-control"><label class="label cursor-pointer"><span class="label-text pr-4" data-svelte-h="svelte-1ylu0yf">Complete</span> <input type="checkbox" name="complete" class="toggle toggle-success"${add_attribute("checked", $form.complete, 1)}></label></div></div> ${validate_component(Input, "Input").$$render($$result, { name: "name", formObj }, {}, {})} ${validate_component(Textarea, "Textarea").$$render($$result, { name: "description", formObj }, {}, {})} ${validate_component(Input, "Input").$$render(
        $$result,
        {
          name: "eventwebsite",
          label: "Website",
          formObj
        },
        {},
        {}
      )} ${validate_component(Input, "Input").$$render($$result, { name: "email", formObj }, {}, {})} ${validate_component(Label, "Label").$$render($$result, { name: "Venue", formObj }, {}, {})} <div class="pb-4 flex gap-2 justify-between items-center"><select name="venueId" class="select select-bordered w-full"><option${add_attribute("value", null, 0)} ${!!$form.venueId ? "selected" : ""}>None </option>${each(data.venues, (venue) => {
        return `<option${add_attribute("value", venue.id, 0)} ${!!$form.venueId ? "selected" : ""}>${escape(venue.name)} </option>`;
      })}</select> <a href="${"/venue/new/edit?" + escape($page.url.searchParams.toString(), true)}" class="text-primary rounded-full shadow-lg">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon: "material-symbols:add-circle",
          width: "44"
        },
        {},
        {}
      )}</a></div> ${validate_component(Input, "Input").$$render(
        $$result,
        {
          name: "titleImage",
          label: "Title Image Url",
          formObj
        },
        {},
        {}
      )} <fieldset name="resultColumns"><legend class="pb-2 w-full" data-svelte-h="svelte-1shajew"><div class="text-2xl">Result Columns:</div></legend> <div class="w-full p-2 font-semibold bg-gradient-to-r from-base-200 to-base-300 rounded-br-2xl border-t border-accent shadow-md" data-svelte-h="svelte-15nuxxj">Event Rankings</div> <div class="flex gap-4 px-2 py-1">${validate_component(Check, "Check").$$render(
        $$result,
        {
          label: "Rank",
          name: "resultColumns.rank",
          formObj
        },
        {},
        {}
      )} ${validate_component(Check, "Check").$$render(
        $$result,
        {
          label: "Nett",
          name: "resultColumns.nett",
          formObj
        },
        {},
        {}
      )} ${validate_component(Check, "Check").$$render(
        $$result,
        {
          label: "Total",
          name: "resultColumns.total",
          formObj
        },
        {},
        {}
      )}</div> <div class="w-full p-2 font-semibold bg-gradient-to-r from-base-200 to-base-300 rounded-br-2xl border-t border-accent shadow-md" data-svelte-h="svelte-6zv2i6">Display names</div> <div class="flex gap-4 px-2 py-1">${validate_component(Check, "Check").$$render(
        $$result,
        {
          label: "Boat",
          name: "resultColumns.boat",
          formObj
        },
        {},
        {}
      )} ${validate_component(Check, "Check").$$render(
        $$result,
        {
          label: "Skipper",
          name: "resultColumns.skipper",
          formObj
        },
        {},
        {}
      )} ${validate_component(Check, "Check").$$render(
        $$result,
        {
          label: "Sail No.",
          name: "resultColumns.sailNo",
          formObj
        },
        {},
        {}
      )}</div> <div class="w-full p-2 font-semibold bg-gradient-to-r from-base-200 to-base-300 rounded-br-2xl border-t border-accent shadow-md" data-svelte-h="svelte-1sqswwa">Race Outcomes</div> <div class="flex gap-4 px-2 py-1">${validate_component(Check, "Check").$$render(
        $$result,
        {
          label: "Points",
          name: "resultColumns.points",
          formObj
        },
        {},
        {}
      )} ${validate_component(Check, "Check").$$render(
        $$result,
        {
          label: "Position",
          name: "resultColumns.position",
          formObj
        },
        {},
        {}
      )} ${validate_component(Check, "Check").$$render(
        $$result,
        {
          label: "Finish",
          name: "resultColumns.finish",
          formObj
        },
        {},
        {}
      )} ${validate_component(Check, "Check").$$render(
        $$result,
        {
          label: "Corrected",
          name: "resultColumns.corrected",
          formObj
        },
        {},
        {}
      )} ${validate_component(Check, "Check").$$render(
        $$result,
        {
          label: "Elapsed",
          name: "elapsed",
          formObj
        },
        {},
        {}
      )}</div></fieldset> ${validate_component(Button, "Button").$$render($$result, { disabled: $delayed }, {}, {
        default: () => {
          return `${$delayed ? `<span class="loading loading-dots loading-lg"></span>` : `Submit`}`;
        }
      })}`;
    }
  })}`;
});
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    console.log($page);
  }
  $$unsubscribe_page();
  return `${validate_component(Page, "Page").$$render($$result, { title: data.form.data.name }, {}, {
    default: () => {
      return `${validate_component(EventEdit, "EventEdit").$$render($$result, { data }, {}, {})}`;
    }
  })}`;
});
export {
  Page_1 as default
};
