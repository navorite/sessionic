<script lang="ts">
  export let color: string;
</script>

<label class="flex max-w-max items-center gap-1">
  <slot />
  <span
    class="h-8 w-16 cursor-pointer rounded-md border-2 border-gray-600"
    style:background-color={color}
  >
    <input
      type="color"
      class="invisible h-full w-full"
      bind:value={color}
      on:change
    />
  </span>
</label>
