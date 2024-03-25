import { prisma } from '$lib/server/prisma'

export async function getUser({ userId }) {
	try {
		return await prisma.user.findUnique({
			where: { id: userId },
			include: {
				_count: { select: { Follows: true, Likes: true } }
			}
		})
	} catch (error) {}
}
