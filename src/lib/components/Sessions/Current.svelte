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
  import { sendMessage } from '@utils/messages';
  import { isExtensionReady } from '@utils/extension';

  let timeout: number | NodeJS.Timeout;

  $: selection = sessions.selection;

  sendMessage({ message: 'getSession' }).then(async (result) => {
    $session = await result;

    if (!$selection) selection.select($session);
  });

  function handleRemoval(
    tabId: number,
    removeInfo: browser.Tabs.OnRemovedRemoveInfoType
  ) {
    if (!isExtensionReady()) return;

    const window_index = $session.windows.findIndex(
      (window) => window.id === removeInfo.windowId
    );

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

    if ($selection.id === 'current') selection.select($session);
  }

  //TODO: optimize: updating on tab basis instead of getting whole session - use activated, updated and removed to get the effect
  onMount(() => {
    browser?.tabs?.onActivated.addListener(handleUpdate);
    browser?.tabs?.onUpdated.addListener(handleUpdate);
    browser?.windows?.onFocusChanged.addListener(handleUpdate);
    browser?.tabs?.onRemoved.addListener(handleRemoval);

    return () => {
      browser?.tabs?.onActivated.removeListener(handleUpdate);
      browser?.windows?.onFocusChanged.removeListener(handleUpdate);
      browser?.tabs?.onUpdated.removeListener(handleUpdate);
      browser?.tabs?.onRemoved.removeListener(handleRemoval);
    };
  });

  async function handleUpdate() {
    if (timeout) clearTimeout(timeout);

    if (!isExtensionReady()) return;

    //should fix inconsistency in update flags
    timeout = setTimeout(async () => {
      $session = await sendMessage({ message: 'getSession' }); //remove on fouc

      if ($selection.id === 'current') selection.select($session);
    }, 200);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="session-container {$selection === $session ? '!bg-primary-5' : ''}"
  on:click={() => selection.select($session)}
>
  <div class="session-info">
    <p title="Current Session" class="session-name" data-current>
      Current Session
    </p>

    <IconButton
      icon="save"
      title="Save session"
      class="ml-auto text-2xl hover:text-primary-9"
      on:click
    />
  </div>

  <p title="Session Details" class="session-card">
    {$session?.windows?.length ?? 0} Window{$session?.windows?.length > 1
      ? 's'
      : ''}
    -
    {$session?.tabsNumber ?? 0}
    Tab{$session?.tabsNumber > 1 ? 's' : ''}
  </p>
</div>
