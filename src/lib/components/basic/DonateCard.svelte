<script lang="ts">
  import { Clipboard } from '@/lib/components';

  export let srcIcon: string;
  export let src: string;
  export let title: string;

  export let address: string;
</script>

<div
  class="flex max-w-xs flex-col gap-4 rounded-md bg-[hsla(0,0%,60%,0.2)] p-4 font-semibold"
>
  <h3 class="flex items-center gap-2">
    <img class="h-5 w-5" src={srcIcon} alt={title} />
    {title}
  </h3>

  <div class="grid grid-cols-[auto_1fr] w-full gap-4 max-w-58">
    <img class="rounded-md bg-white p-2" {src} alt="Donate using {title}" />

    <div>
      <h4 class="font-normal text-sm">Address</h4>

      <div class="mt-1 flex items-center gap-2">
        <p class="break-all text-xs">{address}</p>
        <Clipboard value={address} />
      </div>
    </div>
  </div>
</div>
