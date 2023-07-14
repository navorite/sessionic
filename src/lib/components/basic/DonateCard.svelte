<script lang="ts">
  import Clipboard from './Clipboard.svelte';

  export let srcIcon: string;
  export let src: string;
  export let title: string;

  export let address: string;
</script>

<div
  class="flex flex-col bg-[hsla(0,0%,43%,0.5)] rounded-md p-4 gap-4 font-semibold max-w-xs"
>
  <h3 class="flex items-center gap-2">
    <img class="h-5 w-5" src={srcIcon} alt={title} />
    {title}
  </h3>

  <div class="w-full flex gap-4 items-center">
    <img
      class="p-2 bg-white rounded-md w-20 h-20"
      {src}
      alt="Donate using {title}"
    />

    <div class="overflow-hidden text-xs">
      <h4 class="font-normal">Address</h4>
      <div class="mt-1 flex items-center gap-2">
        <p class="break-all text-sm">{address}</p>

        <Clipboard value={address} />
      </div>
    </div>
  </div>
</div>
