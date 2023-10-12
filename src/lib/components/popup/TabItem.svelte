<script lang="ts">
	import browser from 'webextension-polyfill';
	import type { ETab } from '@/lib/types';
	import { createEventDispatcher } from 'svelte';
	import { IconButton } from '@/lib/components';
	import { decompress as decompressLZ } from 'lz-string';
	import { filterOptions } from '@/lib/stores';
	import { getTabType, markResult } from '@/lib/utils';
	import { runtimeURL } from '@/lib/constants';

	export let tab: ETab;
	export let current = false;

	const dispatch = createEventDispatcher<{ delete: ETab }>();

	$: active = tab.active ? 'text-link' : '';

	let favIconUrl: string;

	$: favIconUrl = tab.favIconUrl ? decompressLZ(tab.favIconUrl) : '';

	$: isBrowserTab =
		favIconUrl?.startsWith('chrome') && !favIconUrl.startsWith(runtimeURL);

	$: title =
		$filterOptions?.query.trim() && tab.title
			? markResult(tab.title, $filterOptions?.query, {
					case_sensitive: false
			  })
			: tab.title;
</script>

{#if tab?.url}
	<li class="tab-container group">
		<a class="link" href={tab.url} target="_blank">
			{#if favIconUrl && !isBrowserTab}
				<img
					style:width="1rem"
					style:height="1rem"
					style:max-width="1rem"
					style:max-height="1rem"
					src={favIconUrl}
					alt=""
					role="presentation"
				/>
			{:else}
				<IconButton
					icon={getTabType(tab.url)}
					class="max-h-[1rem] min-h-[1rem] min-w-[1rem] max-w-[1rem] rounded-md text-lg {active ||
						'text-neutral-content'}"
				/>
			{/if}
			<span class="title {active}">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html title}
			</span>
		</a>

		<IconButton
			icon={current ? 'close' : 'delete'}
			title={current ? 'Close' : 'Delete'}
			class="ml-auto hidden text-xl text-error hover:text-error-focus group-hover:block"
			on:click={() => {
				if (current && tab.id) browser.tabs.remove(tab.id);
				else dispatch('delete', tab);
			}}
		/>
	</li>
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
