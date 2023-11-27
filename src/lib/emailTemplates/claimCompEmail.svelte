<script lang="ts">
	import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email'

	// export let type = 'Item'
	// export let publisherEmail = ''
	export let requesterEmail = ''
	export let compName = ''
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
	<Preview preview="A request to claim a Competitor" />
	<Section style={main}>
		<Container style={container}>
			<Text style={paragraph}>DO NOT REPLY</Text>
			<Text style={paragraph}>
				The User <a href="mailto:{requesterEmail}">{requesterEmail}</a> would like to lay claim to
				the competitor named {compName}
			</Text>
			<Button pX={12} pY={12} style={button} href={allowUrl}>Allow</Button>
			<Button pX={12} pY={12} style={button} href={cancelUrl}>Deny</Button>
			<Text style={paragraph}>Thank you!</Text>
			<Hr style={hr} />
			<Text style={footer}>Vite Sail</Text>
		</Container>
	</Section>
</Html>
