const load = async (event) => {
  const { params, url, locals } = event;
  async function getComp() {
    try {
      return await prisma.comp.findUnique({
        where: { id: params.compId }
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }
  return {
    comp: getComp()
  };
};
const actions = {
  addCompToUser: async (event) => {
    const { locals, params, request, url } = event;
    const formData = Object.fromEntries(await request.formData());
    async function compToUser() {
      try {
        return await prisma.user.update({
          where: { id: formData.userId },
          data: {
            Comp: { connect: { id: formData.compId } }
          }
        });
      } catch (error) {
        console.log("error: ", error);
      }
    }
    return {
      updatedUser: await compToUser()
    };
  }
};
export {
  actions,
  load
};
