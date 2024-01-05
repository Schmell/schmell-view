import { sendDenialEmail, sendMergeRequest } from '$lib/server/email'
import type { PageServerLoad } from './$types'
import { redirect } from 'sveltekit-flash-message/server'

export const load = (async (event) => {
	const { params, url, locals } = event
	const session = await locals.auth.validate()
	// @ts-ignore
	if (!session) throw redirect('/auth/login', { type: 'success', message: 'Not Authorized' }, event)
	if (url.searchParams.get('allow') === 'false') {
		//  send denial email
		await sendDenialEmail({
			type: 'Venue',
			publisherEmail: url.searchParams.get('pe'),
			requesterEmail: url.searchParams.get('re')
		})
		throw redirect('/', { type: 'success', message: 'Your message was sent' }, event)
	}
	// console.log(params.venueId)

	async function getVenueToMerge() {
		console.log('params.venueId: ', params.venueId)
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
			})
		} catch (error) {
			console.log('error: ', error)
		}
	}

	async function getVenue() {
		try {
			if (url.searchParams.get('name')) {
				const venue = await prisma.venue.findFirst({
					where: { name: url.searchParams.get('name') ?? '' },
					include: {
						Publisher: true,
						_count: true
					}
				})

				if (venue?.publisherId === session?.user.userId) {
					return { data: venue }
				} else {
					return { error: 'This is not Your Venue to merge', errCode: 'm-001', data: venue }
				}
			} else if (url.searchParams.get('toMergeId')) {
				const venue = await prisma.venue.findFirst({
					where: { id: url.searchParams.get('toMergeId') ?? '' },
					include: {
						Publisher: true,
						_count: true
					}
				})
				return { data: venue }
			}

			return { error: 'No Venue found' }
		} catch (error) {
			console.log('error: ', error)
			return { error: 'A Prisma Error Occured' }
		}
	}

	return {
		venueToMerge: getVenueToMerge(),
		venue: getVenue()
	}
	//
}) satisfies PageServerLoad

export const actions = {
	merge: async (event) => {
		const { locals, request, params, url } = event
		const session = locals.auth.validate()

		if (!session) throw redirect('/auth/login', { type: 'error', message: 'Not Authorised' }, event)

		const formData = Object.fromEntries(await request.formData()) as Record<string, string>

		// console.log('formData: ', formData)

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
			})
		}

		async function buildConnects() {
			const ven = await getVenueToMerge()

			const seriesIds: any = ven?.Series.map((item) => {
				return { id: item.id }
			})

			const eventIds: any = ven?.Events.map((item) => {
				return { id: item.id }
			})

			const commentIds: any = ven?.Comments.map((item) => {
				console.log('item: ', item)
				return { id: item.id }
			})

			const likeIds: any = ven?.Likes.map((item) => {
				return { id: item.id }
			})

			const followIds: any = ven?.Follows.map((item) => {
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

		async function mergeItems() {
			const connects = await buildConnects()
			// console.log('connects: ', connects)
			try {
				const merged = await prisma.venue.update({
					where: { id: formData.venueId },
					data: connects
				})
				if (merged)
					await prisma.venue.delete({
						where: { id: formData.toMergeId }
					})
				throw redirect('/events', { type: 'success', message: 'Merge was succesfull' }, event)
			} catch (error) {
				console.log('error: ', error)
			}
		}
		mergeItems()
	},

	requestMerge: async ({ locals, request }) => {
		const session = locals.auth.validate()
		// @ts-ignore
		if (!session) throw redirect('/auth/login', { type: 'error', message: 'Not Authorised' })

		const formData = Object.fromEntries(await request.formData())
		console.log('formData: ', formData)
		// Ok so now i need to send and email to the publisher
		// and the callback to either merge or send a denial email
		return await sendMergeRequest({
			publisherEmail: formData.publisherEmail,
			requesterEmail: formData.requesterEmail,
			venueId: formData.venueId,
			toMergeId: formData.toMergeId,
			type: 'Venue'
		})
	}
	//
} satisfies import('./$types').Actions
