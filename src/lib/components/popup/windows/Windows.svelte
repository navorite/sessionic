<script lang="ts">
  import type { ETab } from '@/lib/types';
  import { afterUpdate } from 'svelte';
  import { isFirefox } from '@/lib/constants';
  import { sessions, currentSession } from '@/lib/stores';
  import { Window } from '@/lib/components';

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

    if (window.tabs?.length) {
      if (tab) {
        const tabIndex = window.tabs.indexOf(tab);

        if (tabIndex === -1) return;

        window.tabs.splice(tabIndex, 1);

        $session.tabsNumber--;
      } else $session.tabsNumber -= window.tabs?.length;
    }

    if (!window.tabs?.length || (!tab && window))
      $session.windows.splice(windowIndex, 1);

    sessions.put($session);

    if (!$session.windows.length || !$session.tabsNumber)
      session.select($currentSession);
  }
</script>

{#if $session?.windows && $session?.tabsNumber}
  <ul
    bind:this={ulEl}
    class="flex flex-col gap-2 overflow-y-auto {className}"
    style:padding-right={scrollBarPadding}
  >
    {#each $session.windows as window, windowIndex}
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
  <h2 class="mx-auto mb-1 text-center text-lg font-bold">
    Select a session or open some tabs!
  </h2>
{/if}
