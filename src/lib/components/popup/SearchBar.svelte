<script lang="ts">
	import { tick } from 'svelte';
	import { IconButton } from '@/lib/components';
	import { isInputTarget } from '@/lib/utils';

	export let value: string;

	export { className as class };
	let className = '';

	let showInputBar = false;

	let inputEl: HTMLInputElement;

	async function handleInputBar(ev: FocusEvent) {
		if (ev?.type === 'focusin') {
			showInputBar = true;
			await tick();
			inputEl?.focus();
		} else if (
			ev?.type == 'focusout' &&
			!(ev?.currentTarget as Node).contains(ev?.relatedTarget as Node) &&
			value === ''
		)
			showInputBar = false;
	}

	function handleKeydown(ev: KeyboardEvent) {
		if (
			(ev.target instanceof HTMLElement && isInputTarget(ev.target)) ||
			ev.repeat ||
			ev.ctrlKey ||
			ev.shiftKey ||
			ev.altKey ||
			ev.metaKey
		)
			return;

		if (ev.code === 'KeyF') {
			handleInputBar({ type: 'focusin' } as FocusEvent);
			ev.preventDefault();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div
	class="flex items-center justify-center rounded-md text-sm {showInputBar
		? 'cursor-text bg-neutral-3 px-2 py-0.5'
		: 'cursor-pointer'} fade {className}"
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
			placeholder="Search session or tab name..."
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
		<IconButton icon="search" role="img" class="text-2xl" />
	{/if}
</div>
