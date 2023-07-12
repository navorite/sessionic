<script lang="ts">
  import IconButton from '@components/IconButton.svelte';
  import { tooltip } from '@utils/tooltip';

  export let value: string;

  let copied = false;

  let timeout: NodeJS.Timeout;
</script>

<div
  class="bg-neutral-4 rounded-md p-1"
  use:tooltip={{
    title: copied ? 'Copied' : 'Copy to clipboard',
  }}
>
  <IconButton
    icon={copied ? 'check' : 'copy'}
    class="text-2xl  {copied
      ? 'text-neutral-content-disabled hover:text-neutral-content-disabled'
      : 'hover:text-primary-focus'}"
    on:click={() => {
      if (timeout) return;

      navigator.clipboard.writeText(value);
      copied = true;

      timeout = setTimeout(() => {
        copied = false;
        timeout = null;
      }, 2000);
    }}
  />
</div>
