import { fail } from '@sveltejs/kit'
import { prismaError } from '$lib/error-handling'
import { prisma } from '$lib/server/prisma'
// import { invalidateAll } from '$app/navigation'

export const actions = {
	comment: async ({ locals, request }) => {
		// //
		const session = await locals.auth.validate()
		// if (!session) throw fail(401, { message: 'Not authorised to comment' })

		const formObj = Object.fromEntries(await request.formData()) as Record<string, string>
		const { id, type, itemId, comment } = formObj

		createComment()
		async function createComment() {
			const data = generateUpsert()
			try {
				return await prisma.comment.upsert({ ...data })
			} catch (error) {
				prismaError(error)
				console.log('error: ', error)
			}
		}

		function generateUpsert(): any {
			let commentType: { type: string; [key: string]: any } = { type: '' }

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
