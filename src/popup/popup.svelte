<script lang="ts">
  import Header from '@components/Header.svelte';
  import Window from '@components/Window.svelte';
  import { getAllWindows } from '@utils/browser';

  let windowItems = getAllWindows();
</script>

<div class="w-full h-full flex flex-col">
  <Header />
  <div class="w-full mt-1 flex overflow-y-auto flex-1">
    <div class="w-6/12 h-full overflow-y-auto">Sessions</div>
    <ul class="w-6/12 h-full overflow-y-auto">
      {#await windowItems}
        Loading windows...
      {:then resultItems}
        {#each resultItems as windowItem}
          <li>
            <Window windowInfo={windowItem} />
          </li>
        {/each}
      {/await}
    </ul>
  </div>
</div>

<style>
  :global(body) {
    @apply overflow-hidden;
  }
</style>
