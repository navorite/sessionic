<script lang="ts">
  import Header from '@components/Header.svelte';
  import Panel from '@components/Panel.svelte';

  let dark = false;
</script>

<div class="w-full h-full flex flex-col" class:dark>
  <div class="bg-gray-2 text-gray-12">Hehehe</div>
  <Header />
  <Panel />
  <input type="checkbox" name="dark" id="dark" bind:checked={dark} />
</div>
