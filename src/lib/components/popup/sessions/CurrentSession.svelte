<script lang="ts">
  import browser from 'webextension-polyfill';
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { settings, sessions, currentSession as session } from '@/lib/stores';
  import { IconButton } from '@/lib/components';
  import { tooltip, getSession, isExtensionViewed } from '@/lib/utils';

  const dispatch = createEventDispatcher();

  let timeout: NodeJS.Timeout;

  $: selection = sessions.selection;

  $: selected = $selection === $session;

  document.addEventListener('visibilitychange', handleVisibility);

  settings.init().then(handleVisibility);

  onDestroy(() => {
    removeEvents();

    document.removeEventListener('visibilitychange', handleVisibility);
  });

  function handleVisibility() {
    if (isExtensionViewed()) {
      handleUpdate();
      addEvents();
      return;
    }

    removeEvents();
  }

  function addEvents() {
    //TODO: optimize: updating on tab basis instead of getting whole session - use activated, updated and removed to get the effect
    browser.windows.onFocusChanged.addListener(handleUpdate);
    browser.tabs.onCreated.addListener(handleUpdate);
    browser.tabs.onUpdated.addListener(handleUpdate);
    browser.tabs.onActivated.addListener(handleUpdate);
    browser.tabs.onMoved.addListener(handleUpdate);
    browser.tabs.onDetached.addListener(handleUpdate);
    browser.tabs.onRemoved.addListener(handleRemoval);
  }

  function removeEvents() {
    browser.windows.onFocusChanged.removeListener(handleUpdate);
    browser.tabs.onCreated.removeListener(handleUpdate);
    browser.tabs.onUpdated.removeListener(handleUpdate);
    browser.tabs.onActivated.removeListener(handleUpdate);
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

    if ($settings.selectionId === 'current') selection.selectById('current');
  }

  async function handleUpdate() {
    clearTimeout(timeout);

    //should fix inconsistency in update flags
    timeout = setTimeout(async () => {
      $session = await getSession({
        pinned: $settings.excludePinned ? false : undefined,
        url: $settings.urlFilterList
      });

      if ($settings.selectionId === 'current')
        selection.selectById($session.id);
    }, 50);
  }
</script>

<button
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
    on:click={() => dispatch('save')}
  />
</button>
