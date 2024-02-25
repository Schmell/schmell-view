import { prismaError } from '$lib/error-handling'
import { fail, json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async (event) => {
	const { request, url, params, locals } = event

	return json({})
}

export const POST: RequestHandler = async (event) => {
	const { request, url, params, locals } = event
	const session = await locals.auth.validate()

	const { id, type, itemId, comment } = await request.json()
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

	const newComment = await createComment()
	return json(newComment)
}

export const PUT: RequestHandler = async (event) => {
	const { request, url, params, locals } = event

	const { id, comment, type } = await request.json()

	console.log(comment, id, type)

	await prisma.comment.update({ where: { id }, data: { comment } })

	return json({ id, comment })
}

export const DELETE: RequestHandler = async (event) => {
	const { request, url, params, locals } = event
	// console.log(await request.json())
	const { item } = await request.json()
	// console.log(item.id)
	const session = await locals.auth.validate()
	if (!session) throw fail(500, { message: 'Un-authorized to delete' })

	// const { id } = Object.fromEntries(await request.formData()) as Record<string, string>

	await prisma.comment.delete({
		where: { id: item.id }
	})

	return json({})
}
