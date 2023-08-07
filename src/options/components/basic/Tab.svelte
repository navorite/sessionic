<script lang="ts">
  export let path: string;
  export let title: string;

  export let group: string = window?.location?.href.split('#')[1] ?? 'general';

  let selected = false;

  function getLocation() {
    if (window?.location?.href?.endsWith(`#${path}`)) group = path;
  }

  $: selected = group === path;
</script>

<svelte:window on:hashchange={getLocation} />

<a
  href="#{path}"
  class="{selected
    ? 'bg-primary text-white'
    : 'bg-neutral-3'} p-2 rounded-md {selected
    ? 'hover:bg-primary-focus'
    : 'hover:bg-neutral-4'} font-semibold">{title}</a
>
