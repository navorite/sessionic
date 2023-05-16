<script lang="ts">
  import type { Window } from '../types/browser';
  import TabItem from './TabItem.svelte';

  export let window: Window;

  let className = '';
  export { className as class };
</script>

<ul class={className}>
  {#each window?.tabs as tab}
    <!-- {@const tabItem = tabsURL.push(tab.url)} -->
    <li>
      <TabItem {tab} />
    </li>
  {/each}
</ul>
