<script lang="ts">
  import IconButton from './IconButton.svelte';
  import type { Icon } from '../types/extension';

  export let icon: Icon;
  export let value: string;
</script>

<div class="w-full h-full">
  <div
    class="w-[96%] flex items-center gap-2 cursor-pointer group/w rounded-md hover:bg-gray-700 py-1 px-2"
  >
    <slot name="icon" />

    <span class="w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">
      {value}
    </span>

    <IconButton
      icon="delete"
      title="Remove this window from session"
      class="invisible ml-auto text-2xl hover:text-red-600 group-hover/w:visible"
    />
  </div>

  <slot name="children" />
</div>
