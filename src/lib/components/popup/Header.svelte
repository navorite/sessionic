<script lang="ts">
	import { EXT_MODE, EXT_NAME, isPopup } from '@/lib/constants';
	import {
		settings,
		filterOptions,
		notification,
		filtered
	} from '@/lib/stores';
	import {
		SearchBar,
		Notification,
		IconButton,
		Modal,
		Donate
	} from '@/lib/components';
	import { openFullView, openOptions } from '@utils/extension';

	let showDonateModal = false;
</script>

<div class="flex h-full max-h-8 w-full items-center gap-2">
	<h1 class="relative">
		{EXT_NAME}
		{#if EXT_MODE}
			<span
				class="absolute -bottom-[14px] left-1/2 inline-block -translate-x-1/2 text-[10px]"
				>{EXT_MODE}</span
			>
		{/if}
	</h1>

	{#await $filtered then filtered}
		{#if filtered?.length}
			<div
				aria-label="Number of sessions"
				class="card bg-info text-white hover:bg-info-focus"
			>
				{filtered.length} Session{filtered.length > 1 ? 's' : ''}
			</div>
		{/if}
	{/await}

	<Notification detail={$notification} />

	<div class="ml-auto flex h-full w-max items-center justify-end gap-2">
		<SearchBar bind:value={$filterOptions.query} />

		{#if isPopup}
			<IconButton icon="open" title="Full View" on:click={openFullView} />
		{/if}

		<IconButton
			icon={$settings.darkMode ? 'dark' : 'light'}
			title="{$settings.darkMode ? 'Dark' : 'Light'} mode"
			on:click={() => {
				settings.changeSetting('darkMode', !$settings.darkMode);
			}}
		/>

		<IconButton
			icon="donate"
			title="Donate"
			class="text-2xl hover:text-error-focus"
			on:click={() => (showDonateModal = true)}
		/>

		<IconButton icon="settings" title="Settings" on:click={openOptions} />
	</div>
</div>

<Modal bind:open={showDonateModal} height="100%" width="100%">
	<svelte:fragment slot="header">Support the project</svelte:fragment>
	<svelte:fragment slot="content">
		<Donate />
	</svelte:fragment>
</Modal>
