<script lang="ts">
  import Header from '@components/Header.svelte';
  import Panel from '@components/Panel.svelte';

  let dark = true;
  $: document?.body?.classList.toggle('dark', dark);
</script>

<div class="w-full h-full flex flex-col">
  <Header />
  <Panel />
  <input type="checkbox" name="dark" id="dark" bind:checked={dark} />
</div>
