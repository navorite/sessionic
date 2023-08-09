<script lang="ts">
	import { EXT_NAME, isPopup } from '@constants/env';
	import Header from '@components/Header.svelte';
	import Sessions from '@components/Sessions/Sessions.svelte';
	import CommandPalette from '@components/basic/CommandPalette.svelte';
	import settings from '@stores/settings';
	import { openFullView } from '@utils/extension';

	shouldLoadPopup();

	async function shouldLoadPopup() {
		await settings.init();

		if (!isPopup) return;

		if (!$settings.popupView) {
			await openFullView();

			window.close();
		}
	}

	let open = false;
</script>

<svelte:head>
	<title>
		{EXT_NAME}
	</title>
</svelte:head>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'k' && event.ctrlKey) {
			event.preventDefault();
			if (!event.repeat) open = !open;
		}
	}}
/>

<Header />
<Sessions />
<CommandPalette bind:open />
