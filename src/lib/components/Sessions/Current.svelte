<script lang="ts" context="module">
  export const session: Writable<Session> = writable();
</script>

<script lang="ts">
  import type { Session } from 'src/lib/types/extension';
  import IconButton from '../IconButton.svelte';
  import { createEventDispatcher, onMount } from 'svelte';
  import { getSession } from '@utils/browser';
  import browser from 'webextension-polyfill';
  import InputModal from '@components/Modals/InputModal.svelte';
  import sessions from '@stores/sessions';
  import { generateSession } from '@utils/generateSession';
  import { writable, type Writable } from 'svelte/store';

  export let selected = false;

  const dispatch = createEventDispatcher();

  let open = false;
  let timeout: string | number | NodeJS.Timeout;

  getSession().then((value) => {
    $session = value;
    dispatch('change', { selected });
  });

  function handleRemoval(
    tabId: number,
    removeInfo: browser.Tabs.OnRemovedRemoveInfoType
  ) {
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
    browser?.tabs?.onActivated.addListener(handleAcivated);
    browser?.tabs?.onUpdated.addListener(handleUpdate);
    browser?.tabs?.onRemoved.addListener(handleRemoval);

    return () => {
      browser?.tabs?.onActivated.removeListener(handleAcivated);
      browser?.tabs?.onUpdated.removeListener(handleUpdate);
      browser?.tabs?.onRemoved.removeListener(handleRemoval);
    };
  });

  async function handleAcivated() {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(async () => {
      $session = await getSession();

      dispatch('change', { selected });
    }, 200);
  }

  async function handleUpdate(
    tabId: number,
    updateInfo: browser.Tabs.OnUpdatedChangeInfoType
  ) {
    if (timeout) clearTimeout(timeout);

    if (updateInfo.status !== 'complete') return;

    $session = await getSession();

    dispatch('change', { selected });
  }
</script>

<InputModal
  bind:open
  type="Save"
  value={$session?.title}
  on:inputSubmit={async (event) => {
    $session.title = event.detail.value;

    await sessions.add(await generateSession($session));

    open = false;
  }}
/>

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
