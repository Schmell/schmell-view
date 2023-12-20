import { c as sendDenialEmail, d as sendMergeRequest } from "../../../../../chunks/email.js";
import { r as redirect } from "../../../../../chunks/server.js";
const load = async (event) => {
  const { params, url, locals } = event;
  const session = await locals.auth.validate();
  if (!session)
    throw redirect("/auth/login", { type: "success", message: "Not Authorized" }, event);
  if (url.searchParams.get("allow") === "false") {
    await sendDenialEmail({
      type: "Venue",
      publisherEmail: url.searchParams.get("pe"),
      requesterEmail: url.searchParams.get("re")
    });
    throw redirect("/", { type: "success", message: "Your message was sent" }, event);
  }
  async function getVenueToMerge() {
    console.log("params.venueId: ", params.venueId);
    try {
      return prisma.venue.findUnique({
        where: { id: params.venueId },
        include: {
          Publisher: true,
          Events: { select: { id: true, name: true } },
          Series: { select: { id: true, name: true } },
          Comments: { select: { id: true } },
          Follows: { select: { id: true } },
          Likes: { select: { id: true } },
          _count: true
        }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }
  async function getVenue() {
    try {
      if (url.searchParams.get("name")) {
        const venue = await prisma.venue.findFirst({
          where: { name: url.searchParams.get("name") ?? "" },
          include: {
            Publisher: true,
            _count: true
          }
        });
        if (venue?.publisherId === session?.user.userId) {
          return { data: venue };
        } else {
          return { error: "This is not Your Venue to merge", errCode: "m-001", data: venue };
        }
      } else if (url.searchParams.get("toMergeId")) {
        const venue = await prisma.venue.findFirst({
          where: { id: url.searchParams.get("toMergeId") ?? "" },
          include: {
            Publisher: true,
            _count: true
          }
        });
        return { data: venue };
      }
      return { error: "No Venue found" };
    } catch (error) {
      console.log("error: ", error);
      return { error: "A Prisma Error Occured" };
    }
  }
  return {
    venueToMerge: getVenueToMerge(),
    venue: getVenue()
  };
};
const actions = {
  merge: async (event) => {
    const { locals, request, params, url } = event;
    const session = locals.auth.validate();
    if (!session)
      throw redirect("/auth/login", { type: "success", message: "Not Authorised" }, event);
    const formData = Object.fromEntries(await request.formData());
    async function getVenueToMerge() {
      return await prisma.venue.findUnique({
        where: { id: params.venueId },
        include: {
          Series: true,
          Events: true,
          Comments: true,
          Likes: true,
          Follows: true
        }
      });
    }
    async function buildConnects() {
      const ven = await getVenueToMerge();
      const seriesIds = ven?.Series.map((item) => {
        return { id: item.id };
      });
      const eventIds = ven?.Events.map((item) => {
        return { id: item.id };
      });
      const commentIds = ven?.Comments.map((item) => {
        console.log("item: ", item);
        return { id: item.id };
      });
      const likeIds = ven?.Likes.map((item) => {
        return { id: item.id };
      });
      const followIds = ven?.Follows.map((item) => {
        return { id: item.id };
      });
      return {
        Series: { connect: seriesIds },
        Events: { connect: eventIds },
        Comments: { connect: commentIds },
        Likes: { connect: likeIds },
        Follows: { connect: followIds }
      };
    }
    async function mergeItems() {
      const connects = await buildConnects();
      try {
        const merged = await prisma.venue.update({
          where: { id: formData.venueId },
          data: connects
        });
        if (merged)
          await prisma.venue.delete({
            where: { id: formData.toMergeId }
          });
        throw redirect("/events", { type: "success", message: "Merge was succesfull" }, event);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    mergeItems();
  },
  requestMerge: async ({ locals, request }) => {
    const session = locals.auth.validate();
    if (!session)
      throw redirect("/auth/login", { type: "success", message: "Not Authorised" });
    const formData = Object.fromEntries(await request.formData());
    console.log("formData: ", formData);
    return await sendMergeRequest({
      publisherEmail: formData.publisherEmail,
      requesterEmail: formData.requesterEmail,
      venueId: formData.venueId,
      toMergeId: formData.toMergeId,
      type: "Venue"
    });
  }
  //
};
export {
  actions,
  load
};
