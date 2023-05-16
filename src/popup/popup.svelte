<script lang="ts">
  import Header from '@components/Header.svelte';
  import Panel from '@components/Panel.svelte';
  import { initSessions } from '@utils/actions';
  import { getDarkMode } from '@utils/extension';

  getDarkMode();
  initSessions();
</script>

<Header />
<Panel />
