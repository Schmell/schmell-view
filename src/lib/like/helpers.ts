import type { Like } from '@prisma/client'

export type Item = {
	id: string
	Likes: Partial<Like>[]
	publisherId?: string | null
	_count: any
	[key: string]: any
}

/**
 * Find the Like id for the liked item
 * @param {Like[]} likes An array of likes
 * @param {string} userId a string id of the current user
 * @returns {string} Either empty string or id of a Like
 */
export function getUserLikeId(likes: Like[] | undefined, userId: string) {
	if (!likes) return ''
	const liked = likes.find((like) => like.userId === userId)
	if (liked) return liked.id
	return ''
}

/**
 * Check if current User likes this item
 * @param {Like[]} likes An array of likes
 * @param {string} userId a string id of the current user
 * @returns {boolean} returns true if item is Liked by the current User
 */
export function itemLikedByUser(likes: Like[] | undefined, userId: string) {
	if (!likes) return false
	return likes.some((like) => like.userId === userId)
}
