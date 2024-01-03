<script lang="ts">
	import { enhance } from '$app/forms'
	import { Page } from '$components/layout'
	export let form
	// $: (const {url, pathname} = form)
</script>

<Page title="Upload">
	<form use:enhance action="?/upload" method="POST" enctype="multipart/form-data">
		<input
			type="file"
			name="file"
			required
			class="file-input file-input-bordered w-full max-w-xs"
		/>
		<button class="btn btn-primary">Upload</button>
	</form>

	{#if form?.uploaded.url}
		<div class="p-4">
			<h1 class="text-lg font-semibold mb-2">Uploaded FIle:</h1>
			<a href={form.uploaded.url}>{form.uploaded.pathname}</a>
		</div>
		{#if form.uploaded.contentType.includes('image')}
			<img src={form.uploaded.url} alt={form.uploaded.pathname} width="80" />
		{/if}
	{/if}
	<img
		src="https://irqzkhqniqf8lyhi.public.blob.vercel-storage.com/s-logo-pHyqAePgORQRHqr2cJjukrMUrvgEEM.png"
		alt="test"
		width="80"
	/>
</Page>
