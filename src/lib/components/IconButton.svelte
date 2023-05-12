<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { Icon } from '../types/navigation';

  export let icon: Icon = 'default';
  export let title: string;

  let className = '';
  export { className as class };

  $: src = `../../icons/${icon}.svg`;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  {title}
  class="cursor-pointer {className}"
  style:mask="url({src}) no-repeat center"
  style:-webkit-mask="url({src}) no-repeat center"
  style:mask-size="cover"
  style:-webkit-mask-size="cover"
  style:background-color="currentColor"
  style:width="1em"
  style:height="1em"
  on:click
/>
<!-- transition:fade -->
