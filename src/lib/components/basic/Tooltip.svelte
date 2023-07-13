<script lang="ts">
  import { fade } from 'svelte/transition';

  export let title: string;

  export let x: number;
  export let y: number;

  export let delay = 400;
  export let duration = 200;

  export let translate: { X: number; Y: number };
</script>

<div
  inert
  role="tooltip"
  style="position:absolute;top:{y}px;left:{x}px;translate:{translate.X}% {translate.Y}%"
  in:fade|global={{ delay, duration }}
>
  {title}
</div>

<style>
  div {
    @apply whitespace-nowrap bg-tooltip text-tooltip-content font-medium text-sm rounded-md py-1 px-2 pointer-events-none select-none;
  }
</style>
