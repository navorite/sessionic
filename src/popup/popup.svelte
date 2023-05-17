<script lang="ts">
  import Header from '@components/Header.svelte';
  import Panel from '@components/Panel.svelte';
  import { initSettings } from '@utils/extension';

  initSettings();
</script>

<Header />
<Panel />
