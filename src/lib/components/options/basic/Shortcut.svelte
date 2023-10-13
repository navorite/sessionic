<script lang="ts">
  export let keybind: string[];
  export let action: string;
</script>

<p class="flex items-center gap-1">
  {#each keybind as key, i}
    <kbd
      class="min-w-[2rem] rounded-md border-2 border-neutral-6 px-2 py-0.5 text-center last:mr-2"
      >{key}</kbd
    >
    {#if i + 1 !== keybind.length}
      +
    {/if}
  {/each}
  {action}
</p>
