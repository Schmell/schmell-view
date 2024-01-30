import { sendClaimCompEmail } from '$lib/server/email'
import { prisma } from '$lib/server/prisma'
import type { RequestHandler } from '@sveltejs/kit'
import { redirect } from 'sveltekit-flash-message/server'

export const GET: RequestHandler = async (event) => {
	const { url, locals } = event

	const session = await locals.auth.validate()
	if (!session)
		throw redirect(
			307,
			`/auth/login?from=/comps/${url.pathname}`,
			{ type: 'error', message: 'Not Authorised' },
			event
		)

	const compId = url.searchParams.get('compId')
	const comp = await prisma.comp.findUnique({
		where: { id: compId ?? '' },
		include: {
			Publisher: true
		}
	})

	const email = await sendClaimCompEmail({
		publisherEmail: comp?.Publisher?.email,
		requesterEmail: session.user.email,
		toMergeId: comp?.id,
		userId: session.user.userId,
		compName: comp?.boat ?? comp?.skipper
	})

	if (email.status) {
		throw redirect(300, `/comps/comp/${comp?.id}`)
		// return new Response().ok
	}

	return new Response()
}
