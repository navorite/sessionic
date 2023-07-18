<script lang="ts">
  export let title: string | undefined | null = undefined;
</script>

<section class="rounded-md bg-neutral-2 border-solid py-2 px-4">
  {#if title}
    <h2 class="text-lg font-bold">{title}</h2>
  {/if}
  <div class="flex flex-col gap-2 p-2">
    <slot />
  </div>
</section>
