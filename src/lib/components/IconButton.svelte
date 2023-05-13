<script lang="ts">
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
  style:mask-image="url({src})"
  style:mask-repeat="no-repeat"
  style:mask-position="center"
  style:mask-size="cover"
  style:-webkit-mask-image="url({src})"
  style:-webkit-mask-repeat="no-repeat"
  style:-webkit-mask-position="center"
  style:-webkit-mask-size="cover"
  style:background-color="currentColor"
  style:width="1em"
  style:height="1em"
  on:click
/>
