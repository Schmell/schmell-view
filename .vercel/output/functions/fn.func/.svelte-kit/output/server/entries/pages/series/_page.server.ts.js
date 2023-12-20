const load = async () => {
  function getSeries() {
    try {
      return prisma.series.findMany({
        include: {
          Organization: { select: { name: true, id: true } },
          Venues: { select: { name: true, id: true } }
        }
      });
    } catch (error) {
      console.log("error: ", error);
      throw error(404, { messgage: "not found" });
    }
  }
  return {
    series: getSeries()
  };
};
export {
  load
};
