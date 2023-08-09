<script lang="ts">
	import browser from 'webextension-polyfill';
	import type { ETab, EWindow } from '@/lib/types';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { settings } from '@/lib/stores';
	import { ListItem, IconButton, TabItem } from '@/lib/components';
	import { tooltip, sendMessage } from '@/lib/utils';

	const dispatch = createEventDispatcher<{
		delete: ETab | undefined;
	}>();

	export let window: EWindow;

	export let current = false;

	let collapsed = false;
</script>

{#if window.tabs?.length}
	<ListItem let:hover class="rounded-md bg-neutral-2">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="group flex items-center gap-2 p-2 {collapsed
				? 'rounded-md'
				: 'rounded-t-md'} bg-neutral-3 hover:bg-neutral-4"
			on:click|self|stopPropagation={() => (collapsed = !collapsed)}
			role="button"
			tabindex="0"
			aria-expanded={!collapsed}
		>
			<IconButton
				role="img"
				icon={window?.incognito ? 'incognito' : 'window'}
				class="text-lg"
				on:click={() => (collapsed = !collapsed)}
			/>

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				use:tooltip={{ title: 'Open' }}
				tabindex="0"
				role="button"
				aria-label="Open in a New Window"
				class="w-max max-w-[60%] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium hover:underline"
				on:click={() => {
					sendMessage({
						message: 'openInNewWindow',
						window,
						discarded: $settings.discarded
					});
				}}
			>
				{window?.incognito ? 'Private' : ''} Window
			</span>

			<div
				class="card bg-info text-white hover:bg-info-focus"
				aria-label="Number of window tabs"
			>
				{window?.tabs?.length} Tab{window?.tabs?.length ?? 0 > 1 ? 's' : ''}
			</div>

			{#if hover}
				<IconButton
					icon={current ? 'close' : 'delete'}
					title={current ? 'Close' : 'Delete'}
					class="ml-auto hidden text-xl hover:text-error-focus group-hover:block"
					on:click={() => {
						if (current && window.id) browser.windows.remove(window.id);
						else dispatch('delete');
					}}
				/>
			{/if}

			<IconButton
				icon={collapsed ? 'expand' : 'collapse'}
				class="ml-auto text-xl hover:text-primary-focus group-hover:ml-0"
				title={collapsed ? 'Expand' : 'Collapse'}
				on:click={() => (collapsed = !collapsed)}
			/>
		</div>

		{#if !collapsed && window && window.tabs}
			<ul class="flex flex-col gap-1 p-2" transition:fade={{ duration: 250 }}>
				{#each window.tabs as tab}
					<TabItem {tab} on:delete {current} />
				{/each}
			</ul>
			<!-- <slot name="tabs" /> -->
		{/if}
	</ListItem>
{/if}
