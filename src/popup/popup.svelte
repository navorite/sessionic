<script lang="ts">
  import Header from '@components/Header.svelte';
  import Panel from '@components/Panel.svelte';
  import { dark } from '@stores/settings';

  $: document?.body?.classList.toggle('dark', $dark);
</script>

<div class="flex flex-col w-full h-full">
  <Header />
  <Panel />
</div>
