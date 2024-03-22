<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from 'svelte-sonner'
	import { mode } from 'mode-watcher'
</script>

<Sonner
	theme="dark"
	toastOptions={{
		unstyled: true,
		classes: {
			toast: 'flex items-center gap-2 bg-base-300 p-4 rounded-lg',
			success: 'bg-success text-success-content',
			error: 'bg-error text-error-content',
			warning: 'bg-warning text-warning-content',
			info: 'bg-info text-info-content',
			description: 'text-base-content',
			actionButton: 'text-xs',
			cancelButton: 'bg-success',
			closeButton: 'text-error'
		}
	}}
	{...$$restProps}
/>
