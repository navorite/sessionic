<script lang="ts">
  import type { Icon } from '../types/extension';

  export let icon: Icon = 'default';
  export let title: string;

  $: src = `../../icons/${icon}.svg`;

  let className = '';
  export { className as class };
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
