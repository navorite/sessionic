<script lang="ts">
  import IconButton from '@components/IconButton.svelte';
  import { tooltip } from '@utils/tooltip';

  export let value: string;

  let copied = false;

  let timeout: NodeJS.Timeout;
</script>

<button
  type="button"
  class="bg-overlay-black rounded-md p-1 hover:brightness-110"
  use:tooltip={{
    title: copied ? 'Copied' : 'Copy to clipboard',
  }}
  on:click={() => {
    if (timeout) return;

    navigator.clipboard.writeText(value);
    copied = true;

    timeout = setTimeout(() => {
      copied = false;
      timeout = null;
    }, 2000);
  }}
>
  <IconButton
    role="img"
    icon={copied ? 'check' : 'copy'}
    class="text-2xl {copied ? 'text-neutral-content-disabled' : ''}"
  />
</button>
