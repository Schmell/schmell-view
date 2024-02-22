import { z } from 'zod'
import { t } from '../t'

export const greeting = t.router({
	greet: t.procedure.input(z.string()).query(async ({ input }) => {
		return { message: `Hello ${input}` }
	})
})

export type Router = typeof greeting
