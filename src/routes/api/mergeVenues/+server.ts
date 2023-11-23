import type { RequestHandler } from '@sveltejs/kit'

async function getToBeMergedConnects(toMergeId: string) {
	const toBeMerged = await prisma.venue.findUnique({
		where: { id: toMergeId },
		include: {
			Series: true,
			Events: true,
			Comments: true,
			Likes: true,
			Follows: true
		}
	})

	if (toBeMerged) {
		const seriesIds: any = toBeMerged?.Series.map((item) => {
			return { id: item.id }
		})
		const eventIds: any = toBeMerged?.Events.map((item) => {
			return { id: item.id }
		})
		const commentIds: any = toBeMerged?.Comments.map((item) => {
			console.log('item: ', item)
			return { id: item.id }
		})
		const likeIds: any = toBeMerged?.Likes.map((item) => {
			return { id: item.id }
		})
		const followIds: any = toBeMerged?.Follows.map((item) => {
			return { id: item.id }
		})

		return {
			Series: { connect: seriesIds },
			Events: { connect: eventIds },
			Comments: { connect: commentIds },
			Likes: { connect: likeIds },
			Follows: { connect: followIds }
		}
	}
	return {}
}

export const GET: RequestHandler = async ({ url, locals }) => {
	const allow = url.searchParams.get('allow')

	if (allow) {
		const venueId = url.searchParams.get('venueId') ?? ''
		// console.log('venueId: ', venueId)
		const toMergeId = url.searchParams.get('toMergeId') ?? ''
		// console.log('toMergeId: ', toMergeId)
		const connects = await getToBeMergedConnects(toMergeId)

		try {
			console.log('Merging')
			const merged = await prisma.venue.update({
				where: { id: venueId },
				data: connects
			})
			if (merged) {
				console.log('Deleteing')
				await prisma.venue.delete({
					where: { id: toMergeId }
				})
			}
		} catch (error) {
			console.log('error: ', error)
		}
	}

	return new Response()
}
