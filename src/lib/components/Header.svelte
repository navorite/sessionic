<script lang="ts">
  import { filterOptions, isTabPopup } from '@stores/settings';
  import { openOptions, openPopup } from '@utils/extension';
  import IconButton from '@components/IconButton.svelte';
  import SearchBar from '@components/SearchBar.svelte';
  import darkMode from '@stores/darkMode';
</script>

<div class="flex items-center w-full h-8">
  <h1>Tabify</h1>
  <div class="flex items-center justify-end w-full h-full gap-2">
    <SearchBar bind:value={$filterOptions.query} />

    {#if !$isTabPopup}
      <IconButton
        icon="open"
        title="View extension in a new tab"
        on:click={openPopup}
      />
    {/if}

    <IconButton
      icon={$darkMode ? 'dark' : 'light'}
      title="Switch to {$darkMode ? 'dark' : 'light'} mode"
      on:click={darkMode.switch}
    />

    <IconButton
      icon="options"
      title="Open extension Options in a new tab"
      on:click={openOptions}
    />
  </div>
</div>
