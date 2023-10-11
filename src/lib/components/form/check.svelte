<script lang="ts">
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client'
	import ErrorLabel from './errorLabel.svelte'
	import Label from './label.svelte'
	import type { AnyZodObject } from 'zod'
	import { cn } from '$lib/utils'
	import { afterUpdate } from 'svelte'

	export let formObj: SuperForm<AnyZodObject, any>
	export let name: string
	export let group: string | undefined = undefined
	export let label: string | undefined = undefined
	let className: string | undefined = undefined
	export { className as class }
	let isRequired

	const { value, errors, constraints } = formFieldProxy(formObj, name)

	afterUpdate(async () => {
		//
		const itemConstraint = await $constraints?.[name]

		if (itemConstraint?.required) {
			isRequired = itemConstraint.required
		}
	})
</script>

<span>
	<div class="flex flex-col justify-center items-center my-1 w-full">
		<Label class="text-sm pb-1" {label} {name} {formObj} />
		<div class="form-control">
			<input
				type="checkbox"
				size="2"
				class={cn('checkbox checkbox-sm checkbox-primary', className)}
				class:input-error={$errors?.[name]}
				bind:group
				bind:checked={$value}
				{...$$restProps}
			/>
		</div>
		<ErrorLabel {name} {formObj} />
	</div>
</span>
