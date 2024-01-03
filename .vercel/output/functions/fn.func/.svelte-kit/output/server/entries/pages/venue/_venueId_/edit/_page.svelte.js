import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, e as escape, k as each } from "../../../../../chunks/ssr.js";
import "devalue";
import { g as goto } from "../../../../../chunks/navigation.js";
import { p as page } from "../../../../../chunks/stores.js";
import { s as superForm, F as Form } from "../../../../../chunks/index4.js";
import { T as Textarea } from "../../../../../chunks/textarea.js";
import "clsx";
import { I as Input } from "../../../../../chunks/input.js";
import { B as Button } from "../../../../../chunks/button.js";
import { P as Page } from "../../../../../chunks/Page.js";
/* empty css                                                            */import { I as Icon } from "../../../../../chunks/Icon.js";
import { f as flashModule } from "../../../../../chunks/client.js";
import { v as venueSchema, a as addressSchema, c as contactSchema } from "../../../../../chunks/schemas.js";
const Page_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $errors, $$unsubscribe_errors;
  let $form, $$unsubscribe_form;
  let $delayed, $$unsubscribe_delayed;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let showAddressForm = false;
  let showContactForm = false;
  let showNameField = false;
  if ($page.params.venueId === "new") {
    showNameField = true;
  }
  const formObj = superForm(data.venueForm, {
    id: data.venueForm?.id,
    autoFocusOnError: true,
    taintedMessage: "Finish filling out the form or your information will be lost?",
    validators: venueSchema,
    onUpdated() {
      const from = $page.url.searchParams.get("from");
      $page.url.searchParams.delete("editContact");
      $page.url.searchParams.delete("from");
      goto(from + $page.url.search, { replaceState: true });
    },
    flashMessage: {
      module: flashModule,
      onError: ({ result, message }) => {
        const errorMessage = result.error.message;
        message.set({ type: "error", message: errorMessage });
      }
    }
  });
  const { form, errors, delayed } = formObj;
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$unsubscribe_delayed = subscribe(delayed, (value) => $delayed = value);
  const addressFormObj = superForm(data.addressForm, {
    taintedMessage: "Finish filling out the form or your information will be lost?",
    validators: addressSchema,
    onResult: ({ cancel, result }) => {
      if (result.type === "success")
        showAddressForm = false;
    }
  });
  const contactFormObj = superForm(data.contactForm, {
    taintedMessage: "Finish filling out the form or your information will be lost?",
    validators: contactSchema,
    onResult: ({ cancel, result }) => {
      if (result.type === "success")
        showContactForm = false;
    }
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_page();
  $$unsubscribe_errors();
  $$unsubscribe_form();
  $$unsubscribe_delayed();
  return `${validate_component(Page, "Page").$$render($$result, { title: "Edit Venue" }, {}, {
    default: () => {
      return `${validate_component(Form, "Form").$$render(
        $$result,
        {
          action: "?/details&" + $page.url.searchParams.toString(),
          formObj
        },
        {},
        {
          default: () => {
            return `${showNameField ? `<div class="relative join rounded-lg w-full items-center">${validate_component(Input, "Input").$$render(
              $$result,
              {
                name: "name",
                formObj,
                class: "join-item"
              },
              {},
              {}
            )} <button class="btn btn-primary join-item rounded-r-lg absolute right-0 top-7" data-svelte-h="svelte-7jt8p1">cancel</button> <label for="name" class="${["text-sm absolute top-16 pt-3", $errors.name ? "text-warning" : ""].join(" ").trim()}" data-svelte-h="svelte-ic8er3">Must be Unique</label></div> ${$errors.name?.includes("Duplicate name") ? `<a href="${"/venue/" + escape($page.params.venueId, true) + "/merge?name=" + escape($form.name, true)}" class="btn btn-xs btn-primary">Merge this venue</a>` : ``}` : `<div class="flex justify-between items-center py-2"><input type="hidden" name="name"${add_attribute("value", $form.name, 0)}> <div class="text-lg font-semibold">${escape($form.name)}</div> <button class="btn btn-xs btn-outline" data-svelte-h="svelte-cqfk2n">change</button></div>`} ${validate_component(Textarea, "Textarea").$$render($$result, { name: "description", rows: 3, formObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "website", formObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "email", formObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "burgee", formObj }, {}, {})} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                name: "titleImage",
                label: "Title Image",
                formObj
              },
              {},
              {}
            )} ${validate_component(Button, "Button").$$render($$result, { disabled: $delayed }, {}, {
              default: () => {
                return `${$delayed ? `<span class="loading loading-dots loading-md"></span>` : `Submit`}`;
              }
            })}`;
          }
        }
      )} ${showAddressForm ? `<dialog id="my_modal_2" ${showAddressForm ? "open" : ""} class="modal pt-16 w-full"><div class="modal-box">${validate_component(Form, "Form").$$render(
        $$result,
        {
          action: "?/address",
          formObj: addressFormObj
        },
        {},
        {
          default: () => {
            return `${$page.url.searchParams.get("editAddress") ? `<input name="id" type="hidden"${add_attribute("value", $page.url.searchParams.get("editAddress"), 0)}>` : ``} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                name: "label",
                label: "Label",
                placeholder: "Mailing Address",
                formObj: addressFormObj
              },
              {},
              {}
            )} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                name: "po",
                label: "PO box",
                formObj: addressFormObj
              },
              {},
              {}
            )} ${validate_component(Input, "Input").$$render($$result, { name: "street", formObj: addressFormObj }, {}, {})} <div class="grid grid-cols-2 gap-2">${validate_component(Input, "Input").$$render($$result, { name: "city", formObj: addressFormObj }, {}, {})} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                name: "state",
                label: "State/Province",
                formObj: addressFormObj
              },
              {},
              {}
            )} ${validate_component(Input, "Input").$$render($$result, { name: "country", formObj: addressFormObj }, {}, {})} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                name: "code",
                label: "Zip/Postal",
                formObj: addressFormObj
              },
              {},
              {}
            )}</div> <input type="submit" value="submit" class="btn btn-primary w-full">`;
          }
        }
      )}</div></dialog>` : ``} ${showContactForm ? `<dialog id="my_modal_2" ${showContactForm ? "open" : ""} class="modal pt-16 w-full"><div class="modal-box">${validate_component(Form, "Form").$$render(
        $$result,
        {
          action: "?/contact",
          formObj: contactFormObj
        },
        {},
        {
          default: () => {
            return `${$page.url.searchParams.get("editContact") ? `<input name="id" type="hidden"${add_attribute("value", $page.url.searchParams.get("editContact"), 0)}>` : ``} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                name: "label",
                placeholder: "Inquiries",
                formObj: contactFormObj
              },
              {},
              {}
            )} ${validate_component(Input, "Input").$$render($$result, { name: "email", formObj: contactFormObj }, {}, {})} ${validate_component(Input, "Input").$$render($$result, { name: "phone", formObj: contactFormObj }, {}, {})} <input type="submit" value="submit" class="btn btn-primary w-full">`;
          }
        }
      )}</div></dialog>` : ``} <div class="grid grid-cols-2"> <div class="p-2"><button class="btn btn-xs btn-secondary w-full my-4">${validate_component(Icon, "Icon").$$render($$result, { icon: "material-symbols:add-circle" }, {}, {})} add address</button> ${data.addresses ? `${each(data.addresses, (address) => {
        return `<div class="flex justify-between items-center pr-4"><div class="text-lg font-semibold">${escape(address.label)}</div> <div class="flex gap-1 items-center"><form action="?/deleteAddress" method="post"><input type="hidden" name="addressId"${add_attribute("value", address.id, 0)}> <button>${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            class: "text-2xl text-primary",
            width: "20",
            icon: "mdi:trash"
          },
          {},
          {}
        )} </button></form>  <form><button type="button">${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            class: "text-2xl text-primary",
            width: "20",
            icon: "mdi:pencil"
          },
          {},
          {}
        )} </button></form> </div></div> <div class="pl-2 pr-4 pb-4">${address.po ? `<div>PO Box: ${escape(address.po)}</div>` : ``} <div>${escape(address.street)},</div> <span>${escape(address.city)},</span> <span>${escape(address.state)},</span> <span>${escape(address.country)},</span> <span>${escape(address.code)}</span> </div>`;
      })}` : ``}</div>  <div class="py-2"><button class="btn btn-xs btn-secondary w-full my-4">${validate_component(Icon, "Icon").$$render($$result, { icon: "material-symbols:add-circle" }, {}, {})} add contact</button> ${data.contacts ? `${each(data.contacts, (contact) => {
        return `<div class="pb-2"><div class="flex justify-between items-center pr-4"><div class="text-lg font-semibold">${escape(contact.label)}</div> <div class="flex gap-2 items-center"><form action="?/deleteContact" method="post"><input type="hidden" name="addressId"${add_attribute("value", contact.id, 0)}> <button>${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            class: "text-2xl text-primary",
            width: "20",
            icon: "mdi:trash"
          },
          {},
          {}
        )} </button></form>  <form><button type="button">${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            class: "text-2xl text-primary",
            width: "20",
            icon: "mdi:pencil"
          },
          {},
          {}
        )} </button></form> </div></div> <ul class="pl-2">${contact.email ? `<li><a href="${"mailto:" + escape(contact.email, true)}" class="flex gap-2 items-center">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:email" }, {}, {})} ${escape(contact.email)}</a> </li>` : ``} ${contact.phone ? `<li><a href="${"tel:" + escape(contact.phone, true)}" class="flex gap-2 items-center">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:phone" }, {}, {})} ${escape(contact.phone)}</a> </li>` : ``}</ul> </div>`;
      })}` : ``}</div></div>`;
    }
  })}`;
});
export {
  Page_1 as default
};
