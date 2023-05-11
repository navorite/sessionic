<script lang="ts">
  import { getExtensionRuntimeURL } from '@utils/extension';

  function openOptionsPage() {
    let optionsURL = getExtensionRuntimeURL('options');
    window.open(optionsURL, 'svelte-web-extension-template');
  }
</script>

<button
  class="mt-5 bg-sky-500 text-black py-2 px-4 rounded font-bold hover:bg-green-700 hover:text-white"
  on:click="{openOptionsPage}">Open Options</button
>
