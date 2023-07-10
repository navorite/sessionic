<script lang="ts">
  export let icon: Icon = 'default';
  export let title: string = null;

  $: src = `../../icons/${icon}.svg`;

  let className = 'text-2xl hover:text-primary-focus';
  export { className as class };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  {title}
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
