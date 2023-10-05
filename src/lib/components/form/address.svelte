<script lang="ts">
	export let formObj
	const { form, errors, constraints } = formObj
	$: console.log('form: ', $form)
</script>

<div class="collapse collapse-arrow bg-base-200">
	<input type="checkbox" />
	<div class="collapse-title">Address</div>
	<div class="collapse-content">
		<div class="pl-4">
			<input
				name="street"
				class={cn('input input-bordered w-full max-w-lg', className)}
				class:input-error={$errors[name]}
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.address.street}
				on:change
			/>
			<Input name="city" {formObj} />
			<Input name="state" label="State/Province" {formObj} />
			<Input name="country" {formObj} />
			<Input name="code" label="Zip/Postal" {formObj} />
		</div>
	</div>
</div>
