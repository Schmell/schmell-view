<script lang="ts">
	import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email'

	export let type = 'Item'
	export let publisherEmail = ''

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
	<Preview preview="Denied Request to merge {type}" />
	<Section style={main}>
		<Container style={container}>
			<Text style={paragraph}>DO NOT REPLY</Text>
			<Text style={paragraph}>We are sorry to report</Text>
			<Text style={paragraph}>
				Your request to merge a {type} has been denied by
				<a href="mailto:{publisherEmail}">{publisherEmail}</a>
			</Text>

			<Text style={paragraph}>Thank you!</Text>
			<Hr style={hr} />
			<Text style={footer}>Vite Sail</Text>
		</Container>
	</Section>
</Html>
