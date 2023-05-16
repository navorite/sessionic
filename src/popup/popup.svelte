<script lang="ts">
  import Header from '@components/Header.svelte';
  import Panel from '@components/Panel.svelte';
  import { dark } from '@stores/settings';
  import { initSessions } from '@utils/actions';

  initSessions();

  $: {
    document?.body?.classList.toggle('dark', $dark);
    document.documentElement.style.colorScheme = $dark ? 'dark' : 'normal';
  }
</script>

<Header />
<Panel />
