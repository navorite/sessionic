<script lang="ts" context="module">
  export const session: Writable<ESession> = writable();
</script>

<script lang="ts">
  import IconButton from '../IconButton.svelte';
  import { createEventDispatcher, onMount } from 'svelte';
  import { getSession } from '@utils/browser';
  import browser from 'webextension-polyfill';
  import InputModal from '@components/Modals/InputModal.svelte';
  import sessions from '@stores/sessions';
  import { generateSession } from '@utils/generateSession';
  import { writable, type Writable } from 'svelte/store';
  import { isExtensionReady } from '@utils/extension';

  export let selected = false;

  const dispatch = createEventDispatcher();

  let open = false;
  let timeout: string | number | NodeJS.Timeout;

  getSession().then((result) => {
    $session = result;

    dispatch('change', { selected });
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

    dispatch('change', { selected });
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

      dispatch('change', { selected });

      clearTimeout(timeout);
    }, 200);
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

    const newSession = await generateSession($session);

    await sessions.add(newSession);

    dispatch('save', { session: newSession });

    open = false;
  }}
/>
