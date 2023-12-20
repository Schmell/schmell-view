async function getToBeMergedConnects(toMergeId) {
  const toBeMerged = await prisma.venue.findUnique({
    where: { id: toMergeId },
    include: {
      Series: true,
      Events: true,
      Comments: true,
      Likes: true,
      Follows: true
    }
  });
  if (toBeMerged) {
    const seriesIds = toBeMerged?.Series.map((item) => {
      return { id: item.id };
    });
    const eventIds = toBeMerged?.Events.map((item) => {
      return { id: item.id };
    });
    const commentIds = toBeMerged?.Comments.map((item) => {
      console.log("item: ", item);
      return { id: item.id };
    });
    const likeIds = toBeMerged?.Likes.map((item) => {
      return { id: item.id };
    });
    const followIds = toBeMerged?.Follows.map((item) => {
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
  return {};
}
const GET = async ({ url, locals }) => {
  const allow = url.searchParams.get("allow");
  if (allow) {
    const venueId = url.searchParams.get("venueId") ?? "";
    const toMergeId = url.searchParams.get("toMergeId") ?? "";
    const connects = await getToBeMergedConnects(toMergeId);
    try {
      console.log("Merging");
      const merged = await prisma.venue.update({
        where: { id: venueId },
        data: connects
      });
      if (merged) {
        console.log("Deleteing");
        await prisma.venue.delete({
          where: { id: toMergeId }
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
  return new Response();
};
export {
  GET
};
