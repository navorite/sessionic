<script lang="ts">
  import IconButton from '@components/IconButton.svelte';
  import { tooltip } from '@utils/tooltip';

  export let value: string;

  let copied = false;

  let timeout: NodeJS.Timeout;
</script>

<button
  type="button"
  class="bg-neutral-4 rounded-md p-1 hover:bg-neutral-5"
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
    class="text-2xl pointer-events-none {copied
      ? 'text-neutral-content-disabled'
      : ''}"
  />
</button>
