<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms/client';
	import ErrorLabel from './errorLabel.svelte';
	import Label from './label.svelte';
	import type { AnyZodObject } from 'zod';
	import { cn } from '$lib/utils';
	import { afterUpdate } from 'svelte';

	export let formObj: SuperForm<AnyZodObject, any>;
	export let name: string;
	export let group: string | undefined = undefined;
	export let label: string | undefined = undefined;
	export let checked: boolean | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };
	let isRequired;

	const { form, errors, constraints } = formObj;
	// $: console.log('form: ', $form);

	afterUpdate(async () => {
		//
		const itemConstraint = await $constraints[name];

		if (itemConstraint?.required) {
			isRequired = itemConstraint.required;
		}
	});
</script>

<div class="flex flex-col my-1 w-full">
	<Label class="text-xs" {label} {name} {formObj} />
	<div class="form-control">
		<input
			type="checkbox"
			size="2"
			class={cn('checkbox', className)}
			class:input-error={$errors[name]}
			bind:group
			bind:checked
			{...$$restProps}
		/>
	</div>
	<ErrorLabel {name} {formObj} />
	<!-- {(console.log($form[name]), '')} -->
</div>
