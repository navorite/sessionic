<script lang="ts">
  import Window from './Window.svelte';
  import sessions from '@stores/sessions';
  import { currentSession } from '@components/Sessions/Current.svelte';
  import { isExtensionReady } from '@utils/extension';
  import { isFirefox } from '@constants/env';
  import { afterUpdate } from 'svelte/internal';

  export { className as class };
  let className = '';

  let ulEl: HTMLUListElement;

  let scrollBarPadding = '0';

  afterUpdate(() => {
    if (isFirefox) {
      scrollBarPadding = ulEl?.scrollHeight > ulEl?.clientHeight ? '1rem' : '0';
      return;
    }

    scrollBarPadding = ulEl?.scrollHeight > ulEl?.clientHeight ? '0.5rem' : '0';
  });

  $: session = sessions.selection;

  $: current = $session === $currentSession;

  function deleteTab(window: EWindow, tab: Tab, windowIndex: number) {
    if ($session || !window) return;

    if (tab) {
      const tabIndex = window.tabs.indexOf(tab);

      if (tabIndex === -1) return;

      window.tabs.splice(tabIndex, 1);

      if (!window.tabs.length) $session.windows.splice(windowIndex, 1);

      $session.tabsNumber--;
    } else {
      $session.windows.splice(windowIndex, 1);
      $session.tabsNumber -= window.tabs.length;
    }

    return sessions.put($session);
  }
</script>

{#if $session && isExtensionReady()}
  <ul
    bind:this={ulEl}
    class="overflow-y-auto {className}"
    style:padding-right={scrollBarPadding}
  >
    {#each $session.windows as window, i}
      <Window
        {window}
        {current}
        on:delete={(event) => {
          deleteTab(window, event.detail?.tab, i);
        }}
      />
    {/each}
  </ul>
{:else}
  <h2 class="text-lg font-bold mb-1 text-center mx-auto">Select a session!</h2>
{/if}
