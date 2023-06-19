<script>
  import { sendMessage } from '@utils/messages';

  let isPopupEnabled;

  sendMessage({ message: 'getIsPopupEnabled' }).then(async (result) => {
    isPopupEnabled = await result;
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
      console.log('changed');
      sendMessage({ message: 'setPopupEnabled', isPopupEnabled });
    }}
  />
  <label for="popup">Enable Popup view</label>
</div>

<h2 class="text-xl text-center my-auto">
  To be added, look out for future releases!
</h2>
