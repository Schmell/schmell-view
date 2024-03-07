<script lang="ts">
	import { afterUpdate } from 'svelte'
	import Label from './label.svelte'
	import ErrorLabel from './errorLabel.svelte'
	import { cn } from '$lib/utils'

	export let formObj // superForm object
	export let name: string
	export let placeholder: string | undefined = undefined
	export let type: string | undefined = undefined
	export let label: string | undefined = undefined

	let className: string | undefined = undefined
	export { className as class }

	let isRequired: boolean

	const { form, errors, constraints } = formObj

	afterUpdate(async () => {
		//
		const itemConstraint = await $constraints[name]

		if (itemConstraint?.required) {
			isRequired = itemConstraint.required
		}
	})
</script>

<div class="flex flex-col my-1 w-full">
	<Label {label} {name} {formObj} />

	{#if type === 'password'}
		<input
			{name}
			bind:value={$form[name]}
			on:change
			type="password"
			placeholder={placeholder ?? ''}
			aria-invalid={$errors.password ? 'true' : undefined}
			class={cn('input input-bordered w-full max-w-lg', className)}
			class:input-error={$errors[name]}
			{...$$restProps}
		/>
	{:else if type === 'email'}
		<input
			{name}
			bind:value={$form[name]}
			on:change
			type="email"
			placeholder={placeholder ?? ''}
			aria-invalid={$errors.email ? 'true' : undefined}
			class={cn('input input-bordered w-full max-w-lg', className)}
			class:input-error={$errors[name]}
		/>
	{:else if type === 'address'}
		<input
			{name}
			bind:value={$form.address[name]}
			on:change
			type="text"
			placeholder={placeholder ?? ''}
			aria-invalid={$errors[name] ? 'true' : undefined}
			class={cn('input input-bordered w-full max-w-lg', className)}
			class:input-error={$errors[name]}
		/>
	{:else}
		<input
			{name}
			bind:value={$form[name]}
			on:change
			placeholder={placeholder ?? ''}
			aria-invalid={$errors[name] ? 'true' : undefined}
			class={cn('input input-bordered w-full max-w-lg', className)}
			class:input-error={$errors[name]}
		/>
	{/if}

	<ErrorLabel {name} {formObj} />
</div>
