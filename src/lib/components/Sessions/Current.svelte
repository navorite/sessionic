<script lang="ts" context="module">
	export { session as currentSession };

	const session: Writable<ESession> = writable();
</script>

<script lang="ts">
	import IconButton from '../IconButton.svelte';
	import { onMount } from 'svelte';
	import browser from 'webextension-polyfill';
	import sessions from '@stores/sessions';
	import { writable, type Writable } from 'svelte/store';
	import { isExtensionReady, isExtensionViewed } from '@utils/extension';
	import { getSession } from '@utils/getSession';
	import { tooltip } from '@utils/tooltip';
	import settings from '@stores/settings';

	// to fix inconsistent behaviour with FF and Chrome - need to check
	settings.init().then(async () => {
		$session = await getSession($settings.urlFilterList);

		if ($settings.selectionId === 'current') selection.select($session);
	});

	let timeout: NodeJS.Timeout;

	$: selection = sessions.selection;

	$: selected = $selection === $session;

	function handleRemoval(tabId: number, removeInfo: browser.Tabs.OnRemovedRemoveInfoType) {
		if (!isExtensionViewed()) return;

		const window_index = $session.windows.findIndex((window) => window.id === removeInfo.windowId);

		let length = 1;

		if (window_index === -1) return;

		if (removeInfo.isWindowClosing) {
			length = $session.windows[window_index].tabs.length;

			$session.windows.splice(window_index, 1);
		} else {
			const tabs = $session.windows[window_index].tabs;

			const tab_index = tabs.findIndex((tab) => tab.id === tabId);

			if (tab_index === -1) return;

			tabs.splice(tab_index, 1);
		}

		$session.tabsNumber -= length;

		if (!$selection?.id || $selection?.id === 'current') selection?.select($session);
	}

	//TODO: optimize: updating on tab basis instead of getting whole session - use activated, updated and removed to get the effect
	onMount(() => {
		document.onvisibilitychange = handleUpdate;
		browser?.tabs?.onUpdated.addListener(handleUpdate);
		browser?.tabs?.onRemoved.addListener(handleRemoval);

		return () => {
			document.onvisibilitychange = null;
			browser?.tabs?.onUpdated.removeListener(handleUpdate);
			browser?.tabs?.onRemoved.removeListener(handleRemoval);
		};
	});

	async function handleUpdate() {
		if (!(isExtensionViewed() && isExtensionReady()) || timeout) return;

		//should fix inconsistency in update flags
		timeout = setTimeout(async () => {
			$session = await getSession($settings.urlFilterList);

			if (!$selection?.id || $selection?.id === 'current') selection.select($session);

			timeout = null;
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
	<p class="max-w-max flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold">
		Current Session
	</p>

	<div class="flex items-center gap-2 px-1">
		<div
			class="session-card"
			use:tooltip={{
				title: `${$session?.windows?.length} Window${$session?.windows?.length > 0 ? 's' : ''}`
			}}
		>
			<IconButton icon="window" class="text-base" role="img" />
			{$session?.windows?.length ?? 0}
		</div>

		<div
			class="session-card"
			use:tooltip={{
				title: `${$session?.tabsNumber} Tab${$session?.tabsNumber > 0 ? 's' : ''}`
			}}
		>
			<IconButton icon="tab" class="text-base" role="img" />
			{$session?.tabsNumber ?? 0}
		</div>
	</div>

	<IconButton icon="save" title="Save" class="ml-auto text-2xl hover:text-primary-focus" on:click />
</div>
