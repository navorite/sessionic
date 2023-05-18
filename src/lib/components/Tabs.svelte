<script lang="ts">
  import type { Window } from '../types/browser';
  import TabItem from './TabItem.svelte';

  export let window: Window;

  let className = '';
  export { className as class };
</script>

<div class={className}>
  {#each window?.tabs as tab}
    <!-- {@const tabItem = tabsURL.push(tab.url)} -->
    <TabItem {tab} />
  {/each}
</div>
