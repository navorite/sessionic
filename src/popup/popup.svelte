<script lang="ts">
	import { EXT_NAME, isPopup } from '@constants/env';
	import { settings } from '@/lib/stores/';
	import { openFullView } from '@utils/extension';
	import { CommandPalette, Header, Sessions } from '@/lib/components';

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
