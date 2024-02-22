// src/lib/trpc.ts
import type { QueryClient } from '@tanstack/svelte-query'
import type { Router } from './router'
import { createTRPCProxyClient, httpBatchLink, httpLink, loggerLink } from '@trpc/client'
import { svelteQueryWrapper } from 'trpc-svelte-query-adapter'

const client = createTRPCProxyClient<Router>({
	links: [
		loggerLink({
			enabled: (opts) =>
				(process.env.NODE_ENV === 'development' && typeof window !== 'undefined') ||
				(opts.direction === 'down' && opts.result instanceof Error)
		}),

		httpBatchLink({ url: 'http://localhost:5173/api' })
	]
})

export function trpc(queryClient?: QueryClient) {
	return svelteQueryWrapper<Router>({
		client,
		queryClient
	})
}
