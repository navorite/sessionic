<script lang="ts">
	import { settings } from '@/lib/stores';
	import { Tab, General, KeyboardShortcuts, About } from '@/lib/components';
	import { isExtensionViewed } from '@utils/extension';
	import { EXT_NAME } from '@constants/env';

	let group: string;
</script>

<div class="mx-auto w-full max-w-4xl">
	<div class="flex items-center justify-center gap-2">
		<Tab title="General" path="general" bind:group />
		<Tab title="Keyboard Shortcuts" path="keyboard-shortcuts" bind:group />
		<Tab title="About" path="about" bind:group />
	</div>

	<div class="flex flex-col gap-4 p-4">
		{#if isExtensionViewed()}
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#await settings.init() then _}
				{#if group === 'keyboard-shortcuts'}
					<KeyboardShortcuts />
				{:else if group === 'about'}
					<About />
				{:else}
					<General />
				{/if}
			{/await}
		{/if}
	</div>
</div>

<svelte:head>
	<title>{EXT_NAME} Settings</title>
</svelte:head>
