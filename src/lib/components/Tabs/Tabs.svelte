<script lang="ts">
  import Tab from './Tab.svelte';

  export let window: EWindow;
  export let current = false;

  export let className = '';
  export { className as class };
</script>

{#if window}
  <ul class={className}>
    {#each window?.tabs as tab}
      <!-- {@const tabItem = tabsURL.push(tab.url)} -->
      <Tab {tab} on:delete {current} />
    {/each}
  </ul>
{/if}
