<script lang="ts">
  import Header from '@components/Header.svelte';
  import Sessions from '@components/Sessions/Sessions.svelte';
  import { initSettings } from '@utils/extension';

  initSettings();
</script>

<Header />
<Sessions />
