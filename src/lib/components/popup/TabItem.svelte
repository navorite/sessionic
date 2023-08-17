<script lang="ts">
	import browser from 'webextension-polyfill';
	import type { ETab } from '@/lib/types';
	import { createEventDispatcher } from 'svelte';
	import { IconButton, ListItem } from '@/lib/components';
	import { decompress as decompressLZ } from 'lz-string';

	export let tab: ETab;
	export let current = false;

	const dispatch = createEventDispatcher<{ delete: ETab }>();
</script>

{#if tab?.url}
	<ListItem class="tab-container" let:hover>
		<a class="link" href={tab.url} target="_blank">
			{#if tab.favIconUrl && !tab.url.startsWith('chrome-extension://')}
				<img
					style:width="1rem"
					style:height="1rem"
					style:max-width="1rem"
					style:max-height="1rem"
					class="rounded-md"
					src={decompressLZ(tab.favIconUrl)}
					alt=""
				/>
			{:else}
				<IconButton
					icon="tab"
					class="max-h-[1rem] min-h-[1rem] min-w-[1rem] max-w-[1rem] rounded-md text-base text-neutral-content"
				/>
			{/if}
			<span class="title">
				{tab.title}
			</span>
		</a>

		{#if hover}
			<IconButton
				icon={current ? 'close' : 'delete'}
				title={current ? 'Close' : 'Delete'}
				class="ml-auto text-xl hover:text-error-focus"
				on:click={() => {
					if (current && tab.id) browser.tabs.remove(tab.id);
					else dispatch('delete', tab);
				}}
			/>
		{/if}
	</ListItem>
{/if}

<style lang="postcss">
	.link {
		@apply flex w-max max-w-[90%] items-center gap-2;
	}

	.link:hover {
		@apply underline;
	}

	.title {
		@apply overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium;
	}
</style>
