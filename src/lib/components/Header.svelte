<script lang="ts">
  import { dark, isTabPopup } from '@stores/settings';
  import { handleDarkMode, openOptions, openPopup } from '@utils/extension';
  import IconButton from '@components/IconButton.svelte';
  import SearchBar from '@components/SearchBar.svelte';

  let searchValue = '';
</script>

<div class="flex items-center w-full h-8">
  <h1>Tabify</h1>
  <div class="flex items-center justify-end w-full h-full gap-2">
    <SearchBar bind:value={searchValue} />

    {#if !$isTabPopup}
      <IconButton
        icon="open"
        class="text-2xl hover:text-primary-pure-1"
        title="View extension in a new tab"
        on:click={openPopup}
      />
    {/if}

    <IconButton
      icon={$dark ? 'dark' : 'light'}
      class="text-2xl hover:text-primary-pure-1"
      title="Switch to {$dark ? 'dark' : 'light'} mode"
      on:click={handleDarkMode}
    />

    <IconButton
      icon="options"
      class="text-2xl hover:text-primary-pure-1"
      title="Open extension Options in a new tab"
      on:click={openOptions}
    />
  </div>
</div>
