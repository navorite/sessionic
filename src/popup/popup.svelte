<script lang="ts">
	import { EXT_NAME, isPopup } from '@/lib/constants';
	import { settings } from '@/lib/stores/';
	import { openFullView } from '@utils/extension';
	import { CommandPalette, Header, Sessions } from '@/lib/components';
	import { isInputTarget } from '@/lib/utils';

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
	on:keydown={(ev) => {
		if (
			(ev.target instanceof HTMLElement && isInputTarget(ev.target)) ||
			ev.repeat ||
			ev.shiftKey ||
			ev.altKey ||
			ev.metaKey
		)
			return;

		if (ev.code === 'KeyK' && ev.ctrlKey) {
			open = !open;
			ev.preventDefault();
		}
	}}
/>

<Header />
<Sessions />
<CommandPalette bind:open />
