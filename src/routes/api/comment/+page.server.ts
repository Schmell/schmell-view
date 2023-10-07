import { fail } from '@sveltejs/kit'
import { prismaError } from '$lib/error-handling'
import { prisma } from '$lib/server/prisma'

export const actions = {
	comment: async (req) => {
		const { locals, request } = req
		const session = await locals.auth.validate()
		if (!session) throw fail(400, { message: 'Not authorised to comment' })
		
		const formObj = Object.fromEntries(await request.formData()) as Record<string, string>
		const { id, type, itemId, comment } = formObj

		await createComment()

		async function createComment() {
			const data = generateUpsert(id)
			try {
				return await prisma.comment.upsert({ ...data })
			} catch (error) {
				prismaError(error)
				console.log('error: ', error)
			}
		}

		function generateUpsert(id: string | null): any {
			let commentType

			switch (type) {
				case 'event':
					commentType = {
						type: 'event',
						Event: { connect: { id: itemId } }
					}
					break
				case 'race':
					commentType = {
						type: 'race',
						Race: { connect: { id: itemId } }
					}
					break
				case 'comp':
					commentType = {
						type: 'comp',
						Comp: { connect: { id: itemId } }
					}
					break
				case 'series':
					commentType = {
						type: 'series',
						Series: { connect: { id: itemId } }
					}
					break
				case 'organization':
					commentType = {
						type: 'organization',
						Organization: { connect: { id: itemId } }
					}
					break
				case 'venue':
					commentType = {
						type: 'venue',
						Venue: { connect: { id: itemId } }
					}
					break
			}

			return {
				where: { id: id ?? '' },
				update: {
					comment,
					...commentType
				},
				create: {
					comment,
					...commentType,
					User: { connect: { id: session?.user.userId } }
				}
			}
		}
	},

	delete: async ({ request, locals }) => {
		const session = await locals.auth.validate()
		if (!session) throw fail(500, { message: 'Unauthorized' })

		const { id } = Object.fromEntries(await request.formData()) as Record<string, string>
		if (!id) return

		try {
			await prisma.comment.delete({
				where: { id: id }
			})
		} catch (error) {
			console.log('error: ', error)
		}
	}
}
