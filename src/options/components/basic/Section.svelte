<script lang="ts">
  export let title: string | undefined | null = undefined;
</script>

<section class="rounded-md bg-neutral-2 border-solid p-4">
  {#if title}
    <h2 class="text-lg font-bold mb-2">{title}</h2>
  {/if}
  <div class="flex flex-col gap-4">
    <slot />
  </div>
</section>
