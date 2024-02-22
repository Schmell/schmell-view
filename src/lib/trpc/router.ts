import { t } from './t'
import { greeting } from '$lib/trpc/routes/greeting'
import { comments } from '$lib/trpc/routes/comments'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

export const router = t.router({
	greeting,
	comments
})

export type Router = typeof router

// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>
export type RouterOutputs = inferRouterOutputs<Router>
