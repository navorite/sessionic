<script>
  import { sendMessage } from '@utils/messages';
  import darkMode from '@stores/theme';
  import Switch from '@components/basic/Switch.svelte';

  let isPopupEnabled;

  sendMessage({ message: 'getIsPopupEnabled' }).then((result) => {
    isPopupEnabled = result;
  });
</script>

<h1 class="text-xl">Options</h1>

<div class="flex flex-col gap-2 p-2">
  <Switch
    id="popup"
    bind:checked={isPopupEnabled}
    on:change={() => {
      sendMessage({ message: 'setPopupEnabled', isPopupEnabled });
    }}>Enable Popup view</Switch
  >
  <Switch id="darkmode" checked={$darkMode} on:change={darkMode.switch}
    >Enable Dark Mode</Switch
  >
</div>

<h2 class="text-xl text-center my-auto">
  To be added, look out for future releases!
</h2>
