<script lang="ts">
	import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email'

	export let type = 'Venue'
	export let requesterEmail = ''
	export let allowUrl = ''
	export let cancelUrl = ''

	const fontFamily =
		'Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
	const main = {
		backgroundColor: '#ffffff'
	}
	const container = {
		margin: '0 auto',
		padding: '20px 0 48px'
	}
	const logo = {
		margin: '0 auto'
	}
	const paragraph = {
		fontFamily,
		fontSize: '16px',
		lineHeight: '26px'
	}
	const btnContainer = {
		textAlign: 'center' as const,
		margin: '0 auto'
	}
	const button = {
		fontFamily,
		backgroundColor: '#5F51E8',
		borderRadius: '3px',
		color: '#fff',
		fontSize: '16px',
		textDecoration: 'none',
		textAlign: 'center' as const,
		display: 'block',
		margin: '0 4px'
	}
	const hr = {
		borderColor: '#cccccc',
		margin: '20px 0'
	}
	const footer = {
		fontFamily,
		color: '#8898aa',
		fontSize: '12px'
	}
</script>

<Html lang="en">
	<Head />
	<Preview preview="A request to merge {type}" />
	<Section style={main}>
		<Container style={container}>
			<Img
				src="https://svelte.dev/svelte-logo-horizontal.svg"
				alt="Svelte logo"
				style={logo}
				width="200"
				height="50"
			/>
			<Text style={paragraph}>DO NOT REPLY</Text>
			<Text style={paragraph}>
				A request from <a href="mailto:{requesterEmail}">{requesterEmail}</a>
			</Text>
			<Text style={paragraph}>
				This is a request to merge a {type} with a {type} that you have published
			</Text>
			<Text style={paragraph}>
				This operation will simply connect any Series, Events, Comments, Likes and or Follows from
				their {type}
				and will not effect any of the details you have provided
			</Text>
			<Text style={paragraph}>
				You should contact <a href="mailto:{requesterEmail}">{requesterEmail}</a> directly if you have
				any questions about this request
			</Text>
			<Button pX={12} pY={12} style={button} href={allowUrl}>Allow</Button>
			<Button pX={12} pY={12} style={button} href={cancelUrl}>Deny</Button>

			<Text style={paragraph}>Thank you!</Text>
			<Hr style={hr} />
			<Text style={footer}>Vite Sail</Text>
		</Container>
	</Section>
</Html>
