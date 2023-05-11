<script lang="ts">
  import { getCurrentTabName } from '@utils/tab_utils';

  let currentTabs = getCurrentTabName();
</script>

<h1>Tab Pocket</h1>

<div class="flex flex-col justify-center">
  <p>
    {#await currentTabs}
      Loading...
    {:then result}
      {result[0].title};
    {/await}
  </p>

  <button
    class="mt-2 bg-sky-500 text-gray-700 p-2 rounded"
    on:click="{() => {
      currentTabs = getCurrentTabName();
    }}">Get Tab Name</button
  >
</div>
