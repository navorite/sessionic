<script lang="ts">
  import type { Window } from '../../types/browser';
  import Tab from './Tab.svelte';

  export let window: Window;

  export let className = '';
  export { className as class };
</script>

{#if window}
  <ul class={className}>
    {#each window?.tabs as tab}
      <!-- {@const tabItem = tabsURL.push(tab.url)} -->
      <Tab {tab} on:delete />
    {/each}
  </ul>
{/if}
