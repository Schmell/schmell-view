import { loadFlash, redirect } from 'sveltekit-flash-message/server'
import type { PageServerLoad } from './$types'

import {
	getUser,
	getUserEvents,
	getUserEventsCount,
	getUserFollowing,
	getUserFollowingCount,
	getUserLikes,
	getUserLikesCount,
	getUserOrganizations,
	getUserOrganizationsCount,
	getUserSeries,
	getUserSeriesCount
} from './pagedata'

export const load: PageServerLoad = loadFlash(async ({ locals, url, cookies }) => {
	//
	const session = await locals.auth.validate()
	if (!session)
		throw redirect(
			`/auth/login?from=${url.pathname}`,
			{ type: 'error', message: 'Not User found' },
			cookies
		)
	const userId = session.user.userId

	const {
		eventSkip,
		eventTake,
		followSkip,
		followTake,
		seriesSkip,
		seriesTake,
		orgs,
		orgsSkip,
		orgsTake,
		likes,
		likeCursor,
		filterLikes
	} = Object.fromEntries(url.searchParams)

	return {
		series: await getUserSeries({ userId, seriesSkip, seriesTake }),
		seriesCount: await getUserSeriesCount({ userId }),
		events: await getUserEvents({ userId, eventSkip, eventTake }),
		eventsCount: await getUserEventsCount({ userId }),
		following: await getUserFollowing({ userId, followSkip, followTake }),
		followCount: await getUserFollowingCount({ userId }),
		likesCount: await getUserLikesCount({ userId }),
		organizationsCount: await getUserOrganizationsCount({ userId }),
		awaited: {
			organizations: getUserOrganizations({ userId, getOrgs: orgs, orgsSkip, orgsTake }),
			likes: await getUserLikes({ userId, likeCursor, filterLikes, getLikes: likes })
		},
		userStats: await getUser({ userId })
	}
})
