<script>
	export let title
</script>

<div class="sub-nav">
	<div class="h-full tooltip tooltip-bottom" data-tip={title}>
		<div class="text-3xl font-semibold select-none line-clamp-1">{title}</div>
	</div>
	<div class="mr-4"><slot name="trailing" /></div>
</div>

<style>
	.sub-nav {
		@apply border-base-300 bg-base-100 shadow-md;
		@apply text-primary;
		@apply flex items-center justify-between;
		@apply fixed z-10 pr-4;
		/* position: fixed;
		z-index: 10; */
		/* padding-right: 2em; */
		padding-top: 4.75em;
		padding-bottom: 0.7em;
		padding-left: 1em;
		width: 99%;
		border-width: 1px;
		border-bottom-right-radius: 4em;
	}
</style>
