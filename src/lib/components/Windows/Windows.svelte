<script lang="ts">
  import Window from './Window.svelte';
  import sessions from '@stores/sessions';
  import { currentSession } from '@components/Sessions/Current.svelte';
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

  function deleteTab(windowIndex: number, tab: ETab) {
    if (!$session || !$session.windows) return;

    const window = $session.windows[windowIndex];

    if (!window) return;

    if (tab) {
      const tabIndex = window.tabs.indexOf(tab);

      if (tabIndex === -1) return;

      window.tabs.splice(tabIndex, 1);

      $session.tabsNumber--;
    }

    if (!tab && (window || !window.tabs.length)) {
      $session.windows.splice(windowIndex, 1);

      $session.tabsNumber -= window.tabs.length;
    }

    if (!$session.windows.length || !$session.tabsNumber)
      session.select($currentSession);
  }
</script>

{#if $session?.windows && $session?.tabsNumber}
  <ul
    bind:this={ulEl}
    class="overflow-y-auto {className}"
    style:padding-right={scrollBarPadding}
  >
    {#each $session.windows as window, windowIndex (window)}
      <Window
        {window}
        {current}
        on:delete={(event) => {
          deleteTab(windowIndex, event.detail);
        }}
      />
    {/each}
  </ul>
{:else}
  <h2 class="text-lg font-bold mb-1 text-center mx-auto">
    Select a session or open some tabs!
  </h2>
{/if}
