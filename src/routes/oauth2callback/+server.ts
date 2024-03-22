export const GET = async ({ url }) => {
	const queries = Object.fromEntries(url.searchParams)
	console.log(queries)

	return new Response()
}
