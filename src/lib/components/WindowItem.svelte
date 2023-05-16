<script lang="ts">
  import IconButton from './IconButton.svelte';
  import { openWindow } from '@utils/browser';
  import type { Window } from '../types/browser';
  import Tabs from './Tabs.svelte';

  export let window: Window;

  let showWindow = true;
  // let tabsURL = [];
</script>

<div
  class="flex items-center gap-2 group/w rounded-md bg-neutral-3 hover:bg-primary-4 p-2 mb-1"
>
  <IconButton
    icon={showWindow ? 'windowon' : 'windowoff'}
    title="Collapse Window"
    class="text-2xl hover:text-primary-pure-1"
    on:click={() => {
      showWindow = !showWindow;
    }}
  />

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span
    title="Open this Window in a New Window"
    class="w-max max-w-[60%] overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:underline"
    on:click={() => {
      //   if (tabsURL.length) openWindow(tabsURL);
      //   console.log(tabsURL);
    }}
  >
    Window
  </span>

  <span
    title="Number of Tabs"
    class="bg-overlay-black-8 py-0.5 px-2 rounded text-xs font-bold"
  >
    {window?.tabs.length} Tab{window?.tabs.length > 1 ? 's' : ''}
  </span>

  <IconButton
    icon="delete"
    title="Remove this window from session"
    class="invisible ml-auto text-2xl hover:text-warning-pure-1 group-hover/w:visible"
  />
</div>

{#if showWindow}
  <Tabs {window} class="pl-2 mb-1" />
{/if}
