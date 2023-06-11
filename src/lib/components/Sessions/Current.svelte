<script lang="ts">
  import type { Session } from 'src/lib/types/extension';
  import IconButton from '../IconButton.svelte';
  import { createEventDispatcher, onMount } from 'svelte';
  import { getSession } from '@utils/browser';
  import browser from 'webextension-polyfill';

  export let selected = false;

  const dispatch = createEventDispatcher();

  let session: Session;

  updateSession();

  function handleRemoval(
    tabId: number,
    removeInfo: browser.Tabs.OnRemovedRemoveInfoType
  ) {
    const window_index = session.windows.findIndex(
      (window) => window.id === removeInfo.windowId
    );

    if (window_index === -1) return;

    const tabs = session.windows[window_index].tabs;

    const tab_index = tabs.findIndex((tab) => tab.id === tabId);

    if (tab_index === -1) return;

    tabs.splice(tab_index, 1);

    if (removeInfo.isWindowClosing) session.windows.splice(window_index, 1);

    dispatch('change', { session });
  }

  onMount(() => {
    browser?.tabs?.onUpdated.addListener(updateSession);
    browser?.tabs?.onRemoved.addListener(handleRemoval);

    return () => {
      browser?.tabs?.onUpdated.removeListener(updateSession);
      browser?.tabs?.onRemoved.removeListener(handleRemoval);
    };
  });

  function updateSession() {
    getSession().then((result) => {
      session = result;
      dispatch('change', { session });
    });
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="session-container {selected ? '!bg-primary-5' : ''}" on:click>
  <div class="session-info">
    <p title="Current Session" class="session-name" data-current>
      Current Session
    </p>

    <IconButton
      icon="save"
      title="Save session"
      class="ml-auto text-2xl hover:text-primary-9"
      on:click={() => {
        dispatch('saveModal');
      }}
    />
  </div>

  <p title="Session Details" class="session-card">
    {session?.windows.length} Window{session?.windows.length > 1 ? 's' : ''} -
    {session?.tabsNumber}
    Tab{session?.tabsNumber > 1 ? 's' : ''}
  </p>
</div>
