<script lang="ts">
  import { sendMessage } from '@utils/messages';
  import Tab from './components/basic/Tab.svelte';
  import General from './components/General.svelte';
  import KeyboardShortcuts from './components/KeyboardShortcuts.svelte';
  import About from './components/About.svelte';
  import { isExtensionViewed } from '@utils/extension';

  let group: string;

  let isPopupEnabled: boolean;

  const settingsPromise = sendMessage({ message: 'getIsPopupEnabled' }).then(
    (result) => {
      isPopupEnabled = result;
    }
  );
</script>

<div class="w-full max-w-4xl mx-auto">
  <div class="flex justify-center items-center gap-2">
    <Tab title="General" path="general" bind:group />
    <Tab title="Keyboard Shortcuts" path="keyboard-shortcuts" bind:group />
    <Tab title="About" path="about" bind:group />
  </div>

  <div class="flex flex-col gap-4 p-4">
    {#await settingsPromise then _}
      {#if isExtensionViewed()}
        {#if group === 'keyboard-shortcuts'}
          <KeyboardShortcuts />
        {:else if group === 'about'}
          <About />
        {:else}
          <General bind:isPopupEnabled />
        {/if}
      {/if}
    {/await}
  </div>
</div>
