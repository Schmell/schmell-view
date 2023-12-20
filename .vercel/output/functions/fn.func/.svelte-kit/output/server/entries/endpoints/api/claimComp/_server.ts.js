import { s as sendClaimCompEmail } from "../../../../chunks/email.js";
import { r as redirect } from "../../../../chunks/server.js";
const GET = async (event) => {
  const { url, locals } = event;
  const session = await locals.auth.validate();
  if (!session)
    throw redirect(
      307,
      `/auth/login?from=/comps/${url.pathname}`,
      { type: "error", message: "Not Authorised" },
      event
    );
  const compId = url.searchParams.get("compId");
  const comp = await prisma.comp.findUnique({
    where: { id: compId ?? "" },
    include: {
      Publisher: true
    }
  });
  sendClaimCompEmail({
    publisherEmail: comp?.Publisher?.email,
    requesterEmail: session.user.email,
    toMergeId: comp?.id,
    userId: session.user.userId,
    compName: comp?.boat ?? comp?.skipper
  });
  return new Response();
};
export {
  GET
};
