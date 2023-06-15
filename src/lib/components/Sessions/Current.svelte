<script lang="ts" context="module">
  export { session as currentSession };

  const session: Writable<ESession> = writable();
</script>

<script lang="ts">
  import IconButton from '../IconButton.svelte';
  import { onMount } from 'svelte';
  import { getSession } from '@utils/browser';
  import browser from 'webextension-polyfill';
  import InputModal from '@components/Modals/InputModal.svelte';
  import sessions from '@stores/sessions';
  import { writable, type Writable } from 'svelte/store';
  import { isExtensionReady } from '@utils/extension';
  import { selectedSession } from './Sessions.svelte';

  export let selected = false;

  let open = false;
  let timeout: string | number | NodeJS.Timeout;

  getSession().then((result) => {
    $session = result;

    selectedSession.select($session);
  });

  function handleRemoval(
    tabId: number,
    removeInfo: browser.Tabs.OnRemovedRemoveInfoType
  ) {
    if (!isExtensionReady) return;

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

    selectedSession.select($session);
  }

  //TODO: optimize: updating on tab basis instead of getting whole session - use activated, updated and removed to get the effect
  onMount(() => {
    browser?.tabs?.onActivated.addListener(handleUpdate);
    browser?.tabs?.onUpdated.addListener(handleUpdate);
    browser?.tabs?.onRemoved.addListener(handleRemoval);

    return () => {
      browser?.tabs?.onActivated.removeListener(handleUpdate);
      browser?.tabs?.onUpdated.removeListener(handleUpdate);
      browser?.tabs?.onRemoved.removeListener(handleRemoval);
    };
  });

  async function handleUpdate() {
    if (timeout) clearTimeout(timeout);

    if (!isExtensionReady()) return;

    //should fix inconsistency in update flags
    timeout = setTimeout(async () => {
      $session = await getSession();

      selectedSession.select($session);

      clearTimeout(timeout);
    }, 100);
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
        open = true;
      }}
    />
  </div>

  <p title="Session Details" class="session-card">
    {$session?.windows?.length} Window{$session?.windows?.length > 1 ? 's' : ''}
    -
    {$session?.tabsNumber}
    Tab{$session?.tabsNumber > 1 ? 's' : ''}
  </p>
</div>

<InputModal
  bind:open
  type="Save"
  on:inputSubmit={async (event) => {
    $session.title = event.detail.value;

    selectedSession.select(await sessions.add($session));

    open = false;
  }}
/>
