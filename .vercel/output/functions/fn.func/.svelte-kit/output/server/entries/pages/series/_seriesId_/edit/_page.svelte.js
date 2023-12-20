import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, k as each, e as escape, n as noop, z as set_store_value } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import { s as superForm, F as Form } from "../../../../../chunks/index4.js";
import { T as Textarea } from "../../../../../chunks/textarea.js";
import "clsx";
import { I as Input } from "../../../../../chunks/input.js";
import { B as Button } from "../../../../../chunks/button.js";
import { P as Page } from "../../../../../chunks/Page.js";
import { g as goto } from "../../../../../chunks/navigation.js";
/* empty css                                                            */import { I as Icon } from "../../../../../chunks/Icon.js";
import { f as flashModule } from "../../../../../chunks/client.js";
import { s as seriesSchema } from "../../../../../chunks/seriesSchema.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let form;
  let events;
  let supaForm;
  let message;
  let delayed;
  let $message, $$unsubscribe_message = noop, $$subscribe_message = () => ($$unsubscribe_message(), $$unsubscribe_message = subscribe(message, ($$value) => $message = $$value), message);
  let $page, $$unsubscribe_page;
  let $supaForm, $$unsubscribe_supaForm = noop, $$subscribe_supaForm = () => ($$unsubscribe_supaForm(), $$unsubscribe_supaForm = subscribe(supaForm, ($$value) => $supaForm = $$value), supaForm);
  let $delayed, $$unsubscribe_delayed = noop, $$subscribe_delayed = () => ($$unsubscribe_delayed(), $$unsubscribe_delayed = subscribe(delayed, ($$value) => $delayed = $$value), delayed);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  const formObj = superForm(data.form, {
    taintedMessage: "Finish filling out the form or you will loose your data?",
    autoFocusOnError: true,
    validators: seriesSchema,
    dataType: "json",
    onUpdated() {
      const from = $page.url.searchParams.get("from");
      $page.url.searchParams.delete("from");
      if (from) {
        goto(from + $page.url.search, { replaceState: true });
      } else {
        history.replaceState({ from: "/" }, "");
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
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ form, events } = data);
  $$subscribe_supaForm({ form: supaForm, message, delayed } = formObj, $$subscribe_message(), $$subscribe_delayed());
  $$unsubscribe_message();
  $$unsubscribe_page();
  $$unsubscribe_supaForm();
  $$unsubscribe_delayed();
  return `${validate_component(Page, "Page").$$render(
    $$result,
    {
      title: form.data.name === "new" ? "New Series" : form.data.name
    },
    {},
    {
      default: () => {
        return `${validate_component(Form, "Form").$$render(
          $$result,
          {
            action: "?/series&" + $page.url.searchParams.toString(),
            formObj
          },
          {},
          {
            default: () => {
              return `${validate_component(Input, "Input").$$render($$result, { name: "name", formObj }, {}, {})} ${validate_component(Textarea, "Textarea").$$render($$result, { name: "description", rows: 4, formObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "logo", formObj }, {}, {})} ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  name: "titleImage",
                  label: "Title Image",
                  formObj
                },
                {},
                {}
              )} <label for="organizationId" class="label" data-svelte-h="svelte-185nqhk">Organization</label> <div class="pb-4 flex gap-2 justify-between items-center"><div class="w-full items-center"><select name="organizationId" class="select select-bordered w-full"><option${add_attribute("value", null, 0)} data-svelte-h="svelte-1sl0qdz">None </option>${each(data.orgs, (org) => {
                return `<option${add_attribute("value", org.id, 0)} ${($supaForm.organizationId ? true : false) ? "selected" : ""}>${escape(org.name)} </option>`;
              })}</select></div> <a href="${"/organization/new/edit?" + escape($page.url.searchParams.toString(), true)}" class="text-primary rounded-full shadow-lg">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "material-symbols:add-circle",
                  width: "44"
                },
                {},
                {}
              )}</a></div> <div class="pb-4">${form.data.Events ? `${each(form.data.Events, (event) => {
                return `<div class="flex justify-between items-center"><button formaction="${"?/deleteEvent&eventId=" + escape(event.id, true)}">${escape(event.name)}</button> ${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:delete-circle" }, {}, {})} </div>`;
              })}` : ``}</div> <hr class="p-0 pb-4 border-success"> <div>${each(events, (event) => {
                return `<div class="flex justify-between items-center"><button formaction="${"?/addEvent&eventId=" + escape(event.id, true)}">${escape(event.name)}</button> ${validate_component(Icon, "Icon").$$render($$result, { icon: "material-symbols:add-circle" }, {}, {})} </div>`;
              })}</div> ${validate_component(Button, "Button").$$render($$result, {}, {}, {
                default: () => {
                  return `${$delayed ? `<span class="loading loading-dots loading-lg"></span>` : `Submit`}`;
                }
              })}`;
            }
          }
        )}`;
      }
    }
  )}`;
});
export {
  Page_1 as default
};
