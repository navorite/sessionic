<script lang="ts">
  import { tooltip } from '@utils/tooltip';

  export let icon: Icon = 'default';
  export let title: string = null;

  export { className as class };
  let className = 'text-2xl hover:text-primary-focus';

  $: src = `../../icons/${icon}.svg`;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  use:tooltip={{ title }}
  tabindex="0"
  role="button"
  aria-label={title}
  class="cursor-pointer bg-current w-[1em] h-[1em] {className}"
  style:mask-image="url({src})"
  style:mask-repeat="no-repeat"
  style:mask-position="center"
  style:mask-size="cover"
  style:-webkit-mask-image="url({src})"
  style:-webkit-mask-repeat="no-repeat"
  style:-webkit-mask-position="center"
  style:-webkit-mask-size="cover"
  on:click
/>
<slot />
