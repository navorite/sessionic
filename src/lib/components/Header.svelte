<script lang="ts">
  import SearchBar from '@components/SearchBar.svelte';
  import Notification from './basic/Notification.svelte';
  import IconButton from '@components/IconButton.svelte';
  import { filterOptions } from '@stores/settings';
  import darkMode from '@stores/theme';
  import { isPopup } from '@constants/env';
  import { openOptions, openPopup } from '@utils/extension';
  import { notification } from '@stores/notification';
</script>

<div class="flex items-center w-full h-full max-h-8 gap-2">
  <h1>Tabify</h1>

  <Notification detail={$notification} />

  <div class="ml-auto flex items-center justify-end w-max h-full gap-2">
    <SearchBar bind:value={$filterOptions.query} />

    {#if isPopup}
      <IconButton
        icon="open"
        title="View extension in a new tab"
        on:click={openPopup}
      />
    {/if}

    <IconButton
      icon={$darkMode ? 'dark' : 'light'}
      title="Switch to {$darkMode ? 'light' : 'dark'} mode"
      on:click={darkMode.switch}
    />

    <IconButton
      icon="options"
      title="Open extension Options in a new tab"
      on:click={openOptions}
    />
  </div>
</div>
