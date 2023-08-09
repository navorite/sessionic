<script lang="ts">
	import Modal from '@components/basic/Modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import { tick } from 'svelte';

	export let type: 'Save' | 'Rename';

	export let value = '';

	export let minlength = 3;
	export let maxlength = 40;

	let isSubmit = false;
	let disabled = true;
	let errMsg = '';

	export let open = false;

	$: if (value?.length < minlength || value?.length > maxlength) {
		disabled = true;
		errMsg = `Session name must be between ${minlength} and ${maxlength} characters.`;
	} else if (/[<>]/.test(value)) {
		disabled = true;
		errMsg = "Session name must not contain '<' or '>' characters.";
	} else disabled = false;

	let inputEl: HTMLInputElement;

	$: if (open)
		tick().then(() => {
			isSubmit = false;
			inputEl?.focus();
		});

	const dispatch = createEventDispatcher<{ inputSubmit: string }>();

	async function submit() {
		dispatch('inputSubmit', value);

		isSubmit = true;
		value = '';
	}
</script>

<Modal bind:open height="12rem">
	<svelte:fragment slot="header">{type} session</svelte:fragment>
	<svelte:fragment slot="content">
		<input
			bind:this={inputEl}
			class="w-[24rem] rounded-md border-2 border-solid border-neutral-4 bg-transparent px-2 py-1 font-semibold outline-none placeholder:font-normal placeholder:text-gray-200"
			type="text"
			name={type}
			id={type}
			placeholder="Enter session name..."
			title="Session name"
			spellcheck={false}
			{minlength}
			{maxlength}
			bind:value
			on:keydown={(event) => {
				event.key === 'Enter' && submit();
			}}
		/>

		{#if disabled && !isSubmit}
			<p class="mx-auto w-max rounded-md bg-error p-1 px-2 text-sm font-semibold">
				{errMsg}
			</p>
		{/if}
	</svelte:fragment>

	<button
		{disabled}
		title="{type} session"
		slot="footer"
		type="button"
		class="{type === 'Rename'
			? 'px-4'
			: 'px-6'} disabled:text-neutral-content-disabled rounded-md bg-primary py-1 text-center text-neutral-1 hover:bg-primary-focus disabled:cursor-not-allowed disabled:bg-neutral-2"
		on:click={submit}>{type}</button
	>
</Modal>
