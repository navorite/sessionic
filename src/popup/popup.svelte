<script lang="ts" context="module">
  import { sendMessage } from '@utils/messages';
  import { EXT_NAME, isPopup } from '@constants/env';

  if (isPopup)
    sendMessage({ message: 'openPopup' }).then((result) => {
      if (!result) window.close();
    });
</script>

<script lang="ts">
  import Header from '@components/Header.svelte';
  import Sessions from '@components/Sessions/Sessions.svelte';
  import CommandPalette from '@components/basic/CommandPalette.svelte';

  let open = false;
</script>

<Header />
<Sessions />
<CommandPalette bind:open />

<svelte:head>
  <title>
    {EXT_NAME}
  </title>
</svelte:head>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'k' && event.ctrlKey) {
      event.preventDefault();
      if (!event.repeat) open = !open;
    }
  }}
/>
