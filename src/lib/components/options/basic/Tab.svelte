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
    ? 'bg-primary text-white hover:bg-primary-focus'
    : 'bg-neutral-3 hover:bg-neutral-4'} rounded-md p-2 font-semibold"
  >{title}</a
>
