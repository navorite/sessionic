<script lang="ts">
  import SearchBar from '@components/SearchBar.svelte';
  import Notification from './basic/Notification.svelte';
  import IconButton from '@components/IconButton.svelte';
  import { filterOptions } from '@stores/settings';
  import darkMode from '@stores/theme';
  import { isPopup } from '@constants/env';
  import { notification } from '@stores/notification';
  import { sendMessage } from '@utils/messages';
  import Card from './basic/Card.svelte';
  import { filtered } from './Sessions/Sessions.svelte';
</script>

<div class="flex items-center w-full h-full max-h-8 gap-2">
  <h1>Tabify</h1>
  <Card class="text-xs bg-primary text-white" title="Number of saved sessions"
    >{$filtered?.length ?? 0} Session{$filtered?.length ?? 0 > 1
      ? 's'
      : ''}</Card
  >

  <Notification detail={$notification} />

  <div class="ml-auto flex items-center justify-end w-max h-full gap-2">
    <SearchBar bind:value={$filterOptions.query} />

    {#if isPopup}
      <IconButton
        icon="open"
        title="View extension in a new tab"
        on:click={() => {
          sendMessage({ message: 'openFullView' });
        }}
      />
    {/if}

    <IconButton
      icon={$darkMode ? 'light' : 'dark'}
      title="Switch to {$darkMode ? 'light' : 'dark'} mode"
      on:click={darkMode.switch}
    />

    <IconButton
      icon="options"
      title="Open extension Options in a new tab"
      on:click={() => {
        sendMessage({ message: 'openOptions' });
      }}
    />
  </div>
</div>
