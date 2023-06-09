<script lang="ts">
  let hover = false;

  let className = '';
  export { className as class };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li
  class={className}
  on:click
  on:mouseenter={() => {
    hover = true;
  }}
  on:mouseleave={() => {
    hover = false;
  }}
>
  <slot {hover} />
</li>
