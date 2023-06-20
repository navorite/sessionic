<script>
  import { sendMessage } from '@utils/messages';
  import darkMode from '@stores/theme';

  let isPopupEnabled;

  sendMessage({ message: 'getIsPopupEnabled' }).then((result) => {
    isPopupEnabled = result;
  });
</script>

<h1 class="text-xl">Options</h1>

<div class="flex gap-2">
  <input
    type="checkbox"
    name="popup"
    id="popup"
    title="Enable Popup view"
    bind:checked={isPopupEnabled}
    on:change={() => {
      sendMessage({ message: 'setPopupEnabled', isPopupEnabled });
    }}
  />
  <label for="popup">Enable Popup view</label>

  <input
    type="checkbox"
    name="darkmode"
    id="darkmode"
    title="Enable Dark Mode"
    bind:checked={$darkMode}
    on:change={darkMode.switch}
  />
  <label for="darkmode">Enable Dark Mode</label>
</div>

<h2 class="text-xl text-center my-auto">
  To be added, look out for future releases!
</h2>
