<script lang="ts">
	import browser from 'webextension-polyfill';
	import { onMount } from 'svelte';
	import { settings, sessions, currentSession as session } from '@/lib/stores';
	import { IconButton } from '@/lib/components';
	import { tooltip, getSession, isExtensionViewed } from '@/lib/utils';

	async function getSelection() {
		await settings.init();

		$session = await getSession($settings.urlFilterList);

		if ($settings.selectionId === 'current') selection.select($session);
	}

	getSelection();

	let timeout: NodeJS.Timeout;

	$: selection = sessions.selection;

	$: selected = $selection === $session;

	//TODO: optimize: updating on tab basis instead of getting whole session - use activated, updated and removed to get the effect
	onMount(() => {
		handleVisibility();

		document.addEventListener('visibilitychange', handleVisibility);

		return () => {
			removeEvents();

			document.removeEventListener('visibilitychange', handleVisibility);
		};
	});

	function handleVisibility() {
		if (isExtensionViewed()) {
			handleUpdate();
			addEvents();
		} else {
			removeEvents();
		}
	}

	function addEvents() {
		browser.tabs.onUpdated.addListener(handleUpdate);
		browser.tabs.onMoved.addListener(handleUpdate);
		browser.tabs.onDetached.addListener(handleUpdate);
		browser.tabs.onRemoved.addListener(handleRemoval);
	}

	function removeEvents() {
		browser.tabs.onUpdated.removeListener(handleUpdate);
		browser.tabs.onMoved.removeListener(handleUpdate);
		browser.tabs.onDetached.removeListener(handleUpdate);
		browser.tabs.onRemoved.removeListener(handleRemoval);
	}

	function handleRemoval(
		tabId: number,
		removeInfo: browser.Tabs.OnRemovedRemoveInfoType
	) {
		const window_index = $session.windows.findIndex(
			(window) => window.id === removeInfo.windowId
		);

		if (window_index === -1) return;

		const window = $session.windows[window_index]!;

		let length = 1;

		if (!removeInfo.isWindowClosing && window.tabs?.length) {
			const tab_index = window.tabs.findIndex((tab) => tab.id === tabId);

			if (tab_index === -1) return;

			window.tabs.splice(tab_index, 1);
		}

		if (removeInfo.isWindowClosing || !window.tabs?.length) {
			length = window.tabs?.length || length;

			$session.windows.splice(window_index, 1);
		}

		$session.tabsNumber -= length;

		if (!$selection?.id || $selection?.id === 'current')
			selection?.select($session);
	}

	async function handleUpdate() {
		clearTimeout(timeout);

		//should fix inconsistency in update flags
		timeout = setTimeout(async () => {
			$session = await getSession($settings.urlFilterList);

			if (!$selection?.id || $selection?.id === 'current')
				selection.select($session);
		}, 50);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	tabindex="0"
	role="button"
	class="mb-2 flex w-full cursor-pointer items-center gap-2 rounded-md bg-neutral-2 p-2 text-neutral-content hover:bg-neutral-3 {selected
		? '!bg-primary/30'
		: ''}"
	on:click={() => selection.select($session)}
>
	<p
		class="max-w-max flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold"
	>
		Current Session
	</p>

	<div class="flex items-center gap-2 px-1">
		<div
			class="session-card"
			use:tooltip={{
				title: `${$session?.windows?.length} Window${
					$session?.windows?.length > 0 ? 's' : ''
				}`
			}}
		>
			<IconButton icon="window" class="text-base" role="img" />
			{$session?.windows?.length ?? 0}
		</div>

		<div
			class="session-card"
			use:tooltip={{
				title: `${$session?.tabsNumber} Tab${
					$session?.tabsNumber > 0 ? 's' : ''
				}`
			}}
		>
			<IconButton icon="tab" class="text-base" role="img" />
			{$session?.tabsNumber ?? 0}
		</div>
	</div>

	<IconButton
		icon="save"
		title="Save"
		class="ml-auto text-2xl hover:text-primary-focus"
		on:click
	/>
</div>
