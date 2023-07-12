<script lang="ts">
  import Clipboard from './Clipboard.svelte';

  export let srcIcon: string;
  export let src: string;
  export let title: string;

  export let address: string;
</script>

<div class="flex flex-col bg-neutral-2 rounded-md p-4 gap-4 font-semibold">
  <h3 class="text-lg flex items-center gap-2">
    <img class="h-6 w-6" src={srcIcon} alt={title} />
    Donate using {title}
  </h3>

  <div class="w-full flex gap-4 items-center">
    <img
      class="p-2 bg-white rounded-md w-24 h-24"
      {src}
      alt="Donate using {title}"
    />

    <div class="overflow-hidden">
      <h4 class="font-normal">Address</h4>
      <div class="mt-1 flex items-center gap-4">
        <p class="break-all">{address}</p>

        <Clipboard value={address} />
      </div>
    </div>
  </div>
</div>
