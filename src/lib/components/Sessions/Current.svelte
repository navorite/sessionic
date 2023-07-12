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
  import { isExtensionViewed } from '@utils/extension';
  import { getSession } from '@utils/getSession';
  import { tooltip } from '@utils/tooltip';

  let timeout: number | NodeJS.Timeout;

  $: selection = sessions.selection;

  $: selected = $selection === $session;

  getSession().then((result) => {
    $session = result;

    if (!$selection) selection.select($session);
  });

  function handleRemoval(
    tabId: number,
    removeInfo: browser.Tabs.OnRemovedRemoveInfoType
  ) {
    if (!isExtensionViewed()) return;

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
    document.onvisibilitychange = handleUpdate;
    browser?.tabs?.onUpdated.addListener(handleUpdate);
    browser?.tabs?.onRemoved.addListener(handleRemoval);

    return () => {
      browser?.tabs?.onUpdated.removeListener(handleUpdate);
      browser?.tabs?.onRemoved.removeListener(handleRemoval);
    };
  });

  async function handleUpdate() {
    if (!isExtensionViewed() || timeout) return;

    //should fix inconsistency in update flags
    timeout = setTimeout(async () => {
      $session = await getSession();

      if ($selection.id === 'current') selection.select($session);

      timeout = null;
    }, 50);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  tabindex="0"
  role="button"
  class="w-full px-2 py-1 mb-2 rounded-md bg-neutral-2 text-neutral-content cursor-pointer flex gap-2 border-neutral-5 border-solid border-2 hover:bg-neutral-3 items-center {selected
    ? '!bg-neutral-4'
    : ''}"
  on:click={() => selection.select($session)}
>
  <p
    class="flex-1 max-w-max pl-1 overflow-hidden whitespace-nowrap text-ellipsis font-semibold"
  >
    Current Session
  </p>

  {#if $session?.windows.length}
    <div
      class="card"
      use:tooltip={{
        title: `${$session.windows.length} Window${
          $session.windows.length > 1 ? 's' : ''
        } and ${$session.tabsNumber} Tab${$session.tabsNumber > 1 ? 's' : ''}`,
      }}
    >
      <IconButton icon="window" class="text-base" />
      {$session.windows.length}

      <IconButton icon="tab" class="text-base ml-2" />
      {$session.tabsNumber}
    </div>
  {/if}

  <IconButton
    icon="save"
    title="Save session"
    class="ml-auto text-2xl hover:text-primary-focus"
    on:click
  />
</div>
