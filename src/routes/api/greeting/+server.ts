export async function GET({ url, locals, request }) {
	// console.log(request)
	// return { request }
	return new Response(JSON.stringify({ message: 'hello' }))
	// return new Response()
}
