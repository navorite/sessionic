<script lang="ts">
  import SearchBar from '@components/SearchBar.svelte';
  import Notification from './basic/Notification.svelte';
  import IconButton from '@components/IconButton.svelte';
  import { filterOptions } from '@stores/settings';
  import darkMode from '@stores/theme';
  import { isPopup } from '@constants/env';
  import { notification } from '@stores/notification';
  import { sendMessage } from '@utils/messages';
  import { filtered } from './Sessions/Sessions.svelte';
  import Modal from './basic/Modal.svelte';
  import Donate from '@components/Donate.svelte';

  let showDonateModal = false;
</script>

<div class="flex items-center w-full h-full max-h-8 gap-2">
  <h1>Tabify</h1>

  <div role="note" class="card bg-primary text-white">BETA</div>

  <div aria-label="Number of sessions" class="card bg-primary text-white">
    {$filtered?.length ?? 0} Session{$filtered?.length ?? 0 > 1 ? 's' : ''}
  </div>

  <Notification detail={$notification} />

  <div class="ml-auto flex items-center justify-end w-max h-full gap-2">
    <SearchBar bind:value={$filterOptions.query} />

    {#if isPopup}
      <IconButton
        icon="open"
        title="Full View"
        on:click={() => {
          sendMessage({ message: 'openFullView' });
        }}
      />
    {/if}

    <IconButton
      icon={$darkMode ? 'dark' : 'light'}
      title="{$darkMode ? 'Dark' : 'Light'} mode"
      on:click={darkMode.switch}
    />

    <IconButton
      icon="donate"
      title="Donate"
      class="text-2xl hover:text-error-focus"
      on:click={() => (showDonateModal = true)}
    />

    <IconButton
      icon="options"
      title="Settings"
      on:click={() => {
        sendMessage({ message: 'openOptions' });
      }}
    />
  </div>
</div>

<Modal bind:open={showDonateModal} height="100%" width="100%">
  <svelte:fragment slot="header">Consider Donating</svelte:fragment>
  <svelte:fragment slot="content">
    <Donate />
  </svelte:fragment>
</Modal>
