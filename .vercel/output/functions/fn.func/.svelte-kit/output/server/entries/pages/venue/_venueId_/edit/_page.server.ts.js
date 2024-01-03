import { r as redirect, f as fail } from "../../../../../chunks/index.js";
import { s as superValidate, a as setError } from "../../../../../chunks/superValidate.js";
import { a as addressSchema, c as contactSchema, v as venueSchema } from "../../../../../chunks/schemas.js";
import { Prisma } from "@prisma/client";
const load = async ({ locals, params, url }) => {
  const session = locals.auth.validate();
  if (!session)
    throw redirect(301, `${url.searchParams.get("from")}`);
  async function getVenue() {
    try {
      return await prisma.venue.findUniqueOrThrow({
        where: { id: params.venueId },
        include: { Addresses: true }
      });
    } catch (error) {
      throw fail(404, { message: `edit event error: ${error}` });
    }
  }
  async function getAddresses() {
    try {
      return await prisma.address.findMany({
        where: { venueId: params.venueId },
        orderBy: { label: "asc" }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }
  async function getAddress(id) {
    if (!id)
      return null;
    try {
      return await prisma.address.findUnique({
        where: { id }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }
  async function getContacts() {
    try {
      return await prisma.contact.findMany({
        where: { venueId: params.venueId },
        orderBy: { label: "asc" }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }
  async function getContact(id) {
    if (!id)
      return null;
    try {
      return await prisma.contact.findUnique({
        where: { id }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }
  async function getAddressForm() {
    if (url.searchParams.get("editAddress")) {
      return await superValidate(
        await getAddress(url.searchParams.get("editAddress")),
        addressSchema
      );
    } else {
      return await superValidate(addressSchema);
    }
  }
  async function getConactForm() {
    if (url.searchParams.get("editContact")) {
      return await superValidate(
        await getContact(url.searchParams.get("editContact")),
        contactSchema
      );
    } else {
      return await superValidate(contactSchema);
    }
  }
  async function getVenueForm() {
    if (params.venueId === "new") {
      return superValidate({ name: "new venue" }, venueSchema);
    } else {
      return superValidate(await getVenue(), venueSchema);
    }
  }
  return {
    venueForm: getVenueForm(),
    addressForm: getAddressForm(),
    contactForm: getConactForm(),
    addresses: await getAddresses(),
    contacts: await getContacts()
  };
};
const actions = {
  details: async ({ locals, request, params, url }) => {
    const session = await locals.auth.validate();
    if (!session)
      throw redirect(307, url.searchParams.get("from") ?? "/");
    const form = await superValidate(request, venueSchema);
    if (!form.valid)
      return { form };
    form.data;
    try {
      await prisma.venue.upsert({
        where: { id: params.venueId },
        create: { ...form.data, Publisher: { connect: { id: session.user.userId } } },
        update: { ...form.data }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        let duplicateId;
        if (error.code === "P2002") {
          if (error.meta?.target.includes("name")) {
            setError(form, "name", "Duplicate name");
            duplicateId = await prisma.venue.findFirst({
              where: { name: form.data.name },
              select: { id: true }
            });
          }
        }
        console.log("duplicateId: ", duplicateId);
        return {
          duplicateId,
          form
        };
      } else {
        console.log("error: ", error);
      }
      return { form };
    }
    return { form };
  },
  address: async ({ locals, request, params, url }) => {
    const session = await locals.auth.validate();
    if (!session)
      throw redirect(307, url.searchParams.get("from") ?? "/");
    const form = await superValidate(request, addressSchema);
    if (!form.valid)
      return { form };
    const { id, ...rest } = form.data;
    try {
      await prisma.address.upsert({
        where: { id: form.data.id || "" },
        update: { ...rest },
        create: { ...rest, Venue: { connect: { id: params.venueId } } }
      });
    } catch (error) {
      console.log("error: ", error);
      return { form };
    }
  },
  deleteAddress: async ({ locals, request }) => {
    const formObj = Object.fromEntries(await request.formData());
    try {
      await prisma.address.delete({
        where: { id: formObj.addressId }
      });
    } catch (error) {
      console.log("error: ", error);
      return fail(500, { messgae: "Failed to delete address" });
    }
  },
  contact: async ({ locals, request, params, url }) => {
    const session = await locals.auth.validate();
    if (!session)
      throw redirect(307, url.searchParams.get("from") ?? "/");
    const form = await superValidate(request, contactSchema);
    if (!form.valid)
      return { form };
    try {
      await prisma.contact.upsert({
        where: { id: form.data.id || "" },
        update: { ...form.data },
        create: {
          ...form.data,
          Venue: { connect: { id: params.venueId } }
        }
      });
      return { form };
    } catch (error) {
      return { form };
    }
  },
  deleteContact: async ({ locals, request }) => {
    const formObj = Object.fromEntries(await request.formData());
    try {
      await prisma.contact.delete({
        where: { id: formObj.addressId }
      });
    } catch (error) {
      console.log("error: ", error);
      return fail(500, { messgae: "Failed to delete address" });
    }
  }
};
export {
  actions,
  load
};
