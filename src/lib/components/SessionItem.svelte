<script lang="ts">
  import IconButton from './IconButton.svelte';
  import type { Session } from '../types/extension';

  export let session: Session;
</script>

<div
  class="w-full flex items-center gap-2 cursor-pointer group/w rounded-md hover:bg-gray-700 py-1 px-2"
>
  <IconButton
    icon="session"
    title="Session: {session?.title}"
    class="text-2xl"
  />

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span
    title="Open Session"
    class="w-[90%] overflow-hidden whitespace-nowrap text-ellipsis hover:underline"
    on:click={() => {}}
  >
    {session?.title}
  </span>

  <IconButton
    icon="delete"
    title="Remove this window from session"
    class="invisible ml-auto text-2xl hover:text-red-600 group-hover/w:visible"
  />
</div>
