<script lang="ts">
	import { tick } from 'svelte';
	import IconButton from './IconButton.svelte';

	export let value: string;

	export { className as class };
	let className = '';

	let showInputBar = false;

	let inputEl: HTMLInputElement;

	async function handleInputBar(event: FocusEvent) {
		if (event?.type === 'focusin') {
			showInputBar = true;
			await tick();
			inputEl?.focus();
		} else if (
			event?.type == 'focusout' &&
			!(event?.currentTarget as Node).contains(event?.relatedTarget as Node) &&
			value === ''
		)
			showInputBar = false;
	}
</script>

<div
	class="flex cursor-text items-center justify-center rounded-md text-sm {showInputBar
		? 'bg-neutral-3 px-2 py-0.5'
		: ''} fade {className}"
	on:focusin={handleInputBar}
	on:focusout={handleInputBar}
	tabindex="-1"
>
	{#if showInputBar}
		<input
			bind:this={inputEl}
			on:keydown={(event) => {
				if (event.key === 'Escape') showInputBar = false;
			}}
			spellcheck={false}
			type="text"
			placeholder="Search session..."
			bind:value
			class="bg-transparent font-semibold text-neutral-content outline-none"
		/>
		<IconButton
			icon="close"
			title="Clear"
			class="text-2xl hover:text-error-focus"
			on:click={() => {
				if (value === '') showInputBar = false;
				value = '';
			}}
		/>
	{:else}
		<IconButton icon="search" title="Search" />
	{/if}
</div>
