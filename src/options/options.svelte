<script lang="ts">
	import Tab from './components/basic/Tab.svelte';
	import General from './components/General.svelte';
	import KeyboardShortcuts from './components/KeyboardShortcuts.svelte';
	import About from './components/About.svelte';
	import { isExtensionViewed } from '@utils/extension';
	import { EXT_NAME } from '@constants/env';
	import settings from '@stores/settings';

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
