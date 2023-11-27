import type { PageServerLoad } from './$types'

export const load = (async (event) => {
	const { params, url, locals } = event

	async function getComp() {
		try {
			return await prisma.comp.findUnique({
				where: { id: params.compId }
			})
		} catch (error) {
			console.log('error: ', error)
		}
	}
	return {
		comp: getComp()
	}
}) satisfies PageServerLoad

export const actions = {
	addCompToUser: async (event) => {
		const { locals, params, request, url } = event

		const formData = Object.fromEntries(await request.formData()) as Record<string, string>

		async function compToUser() {
			try {
				return await prisma.user.update({
					where: { id: formData.userId },
					data: {
						Comp: { connect: { id: formData.compId } }
					}
				})
			} catch (error) {
				console.log('error: ', error)
			}
		}
		return {
			updatedUser: await compToUser()
		}
	}
}
