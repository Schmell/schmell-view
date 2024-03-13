import { fail } from '@sveltejs/kit'

export async function getUserOrganizationsCount({ userId }) {
	return prisma.organization.count({
		where: { ownerId: userId }
	})
}

type GetUserOrganizationsParams = {
	userId: string
	getOrgs: string | undefined
	orgsSkip?: string
	orgsTake?: string
}

export async function getUserOrganizations({
	userId,
	getOrgs,
	orgsSkip,
	orgsTake
}: GetUserOrganizationsParams) {
	if (getOrgs) {
		try {
			return prisma.organization.findMany({
				where: { ownerId: userId },
				include: {
					_count: { select: { Likes: true, Follows: true, Events: true, Series: true } },
					Likes: true,
					Follows: true
				},
				skip: Number(orgsSkip ?? 0),
				take: Number(orgsTake ?? 5)
			})
		} catch (error) {
			console.log('error: ', error)
			throw fail(400, { message: 'Fail query on User Orgs' })
		}
	}
	return []
}
